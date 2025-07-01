import { google } from 'googleapis';
import { prisma } from '../lib/prisma';

export class GoogleWorkspaceService {
  private static getAuthClient(userId: string) {
    return new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL + '/api/auth/callback/google'
    );
  }

  private static async getAccessToken(userId: string): Promise<string | null> {
    const account = await prisma.account.findFirst({
      where: {
        userId,
        provider: 'google'
      }
    });

    if (!account?.access_token) {
      return null;
    }

    // Vérifier si le token a expiré et le rafraîchir si nécessaire
    if (account.expires_at && account.expires_at * 1000 < Date.now()) {
      if (!account.refresh_token) {
        return null;
      }

      const auth = this.getAuthClient(userId);
      auth.setCredentials({
        refresh_token: account.refresh_token
      });

      try {
        const { credentials } = await auth.refreshAccessToken();
        
        // Mettre à jour le token dans la base de données
        await prisma.account.update({
          where: { id: account.id },
          data: {
            access_token: credentials.access_token,
            expires_at: credentials.expiry_date ? Math.floor(credentials.expiry_date / 1000) : null
          }
        });

        return credentials.access_token;
      } catch (error) {
        console.error('Erreur lors du rafraîchissement du token:', error);
        return null;
      }
    }

    return account.access_token;
  }

  // Google Drive Services
  static async createCorporateHub(userId: string, companyName: string): Promise<string> {
    const accessToken = await this.getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Token d\'accès Google non disponible');
    }

    const drive = google.drive({ version: 'v3', headers: { Authorization: `Bearer ${accessToken}` } });

    try {
      // Créer le dossier principal de l'entreprise
      const hubFolder = await drive.files.create({
        requestBody: {
          name: `ProsperaLink - ${companyName}`,
          mimeType: 'application/vnd.google-apps.folder',
          parents: ['root']
        }
      });

      const hubId = hubFolder.data.id!;

      // Créer les sous-dossiers
      const subfolders = [
        'Documents Légaux',
        'Compliance',
        'Factures & Paiements',
        'Correspondance',
        'Rapports Annuels'
      ];

      for (const folderName of subfolders) {
        await drive.files.create({
          requestBody: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [hubId]
          }
        });
      }

      // Mettre à jour la base de données
      await prisma.company.updateMany({
        where: { userId },
        data: { googleDriveHubId: hubId }
      });

      return hubId;
    } catch (error) {
      console.error('Erreur lors de la création du hub corporate:', error);
      throw new Error('Impossible de créer le hub corporate sur Google Drive');
    }
  }

  static async uploadDocument(userId: string, fileName: string, fileContent: Buffer, mimeType: string, folderId?: string): Promise<string> {
    const accessToken = await this.getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Token d\'accès Google non disponible');
    }

    const drive = google.drive({ version: 'v3', headers: { Authorization: `Bearer ${accessToken}` } });

    try {
      const file = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: folderId ? [folderId] : undefined
        },
        media: {
          mimeType,
          body: fileContent
        }
      });

      return file.data.id!;
    } catch (error) {
      console.error('Erreur lors de l\'upload du document:', error);
      throw new Error('Impossible d\'uploader le document sur Google Drive');
    }
  }

  static async createGoogleDoc(userId: string, title: string, content: string, folderId?: string): Promise<string> {
    const accessToken = await this.getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Token d\'accès Google non disponible');
    }

    const docs = google.docs({ version: 'v1', headers: { Authorization: `Bearer ${accessToken}` } });
    const drive = google.drive({ version: 'v3', headers: { Authorization: `Bearer ${accessToken}` } });

    try {
      // Créer le document Google Docs
      const doc = await docs.documents.create({
        requestBody: {
          title
        }
      });

      const documentId = doc.data.documentId!;

      // Ajouter le contenu au document
      await docs.documents.batchUpdate({
        documentId,
        requestBody: {
          requests: [
            {
              insertText: {
                location: {
                  index: 1
                },
                text: content
              }
            }
          ]
        }
      });

      // Déplacer le document dans le dossier spécifié
      if (folderId) {
        await drive.files.update({
          fileId: documentId,
          requestBody: {
            parents: [folderId]
          }
        });
      }

      return documentId;
    } catch (error) {
      console.error('Erreur lors de la création du document Google Docs:', error);
      throw new Error('Impossible de créer le document Google Docs');
    }
  }

  // Google Calendar Services
  static async syncComplianceCalendar(userId: string, companyId: string): Promise<void> {
    const accessToken = await this.getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Token d\'accès Google non disponible');
    }

    const calendar = google.calendar({ version: 'v3', headers: { Authorization: `Bearer ${accessToken}` } });

    try {
      // Récupérer les tâches de compliance
      const complianceTasks = await prisma.complianceTask.findMany({
        where: { companyId }
      });

      // Créer ou mettre à jour les événements dans Google Calendar
      for (const task of complianceTasks) {
        if (task.dueDate) {
          const event = {
            summary: `Compliance: ${task.title}`,
            description: task.description || '',
            start: {
              dateTime: task.dueDate.toISOString(),
              timeZone: 'America/New_York'
            },
            end: {
              dateTime: new Date(task.dueDate.getTime() + 60 * 60 * 1000).toISOString(), // 1 heure
              timeZone: 'America/New_York'
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 }, // 1 jour avant
                { method: 'popup', minutes: 60 } // 1 heure avant
              ]
            }
          };

          await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la synchronisation du calendrier:', error);
      throw new Error('Impossible de synchroniser le calendrier de compliance');
    }
  }

  static async createConsultationEvent(userId: string, title: string, startTime: Date, endTime: Date, attendeeEmail?: string): Promise<string> {
    const accessToken = await this.getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Token d\'accès Google non disponible');
    }

    const calendar = google.calendar({ version: 'v3', headers: { Authorization: `Bearer ${accessToken}` } });

    try {
      const event = {
        summary: title,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'America/New_York'
        },
        attendees: attendeeEmail ? [{ email: attendeeEmail }] : undefined,
        conferenceData: {
          createRequest: {
            requestId: `consultation-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        }
      };

      const result = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1
      });

      return result.data.id!;
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement de consultation:', error);
      throw new Error('Impossible de créer l\'événement de consultation');
    }
  }

  // Méthodes utilitaires
  static async getUserInfo(userId: string) {
    const accessToken = await this.getAccessToken(userId);
    if (!accessToken) {
      return null;
    }

    const oauth2 = google.oauth2({ version: 'v2', headers: { Authorization: `Bearer ${accessToken}` } });

    try {
      const userInfo = await oauth2.userinfo.get();
      return userInfo.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      return null;
    }
  }

  static async checkPermissions(userId: string): Promise<boolean> {
    const accessToken = await this.getAccessToken(userId);
    return !!accessToken;
  }
} 