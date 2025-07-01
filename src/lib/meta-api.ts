// Configuration de l'API Meta (Facebook)
export const META_CONFIG = {
  appId: process.env.FACEBOOK_APP_ID || '736683922139398',
  appSecret: process.env.FACEBOOK_APP_SECRET || 'd75a56bd78e799375b370240394f0dfe',
  namespace: process.env.FACEBOOK_NAMESPACE || 'prosperalink',
  displayName: 'Prosperalink',
  contactEmail: 'hafsaoui.hassen@gmail.com',
  privacyPolicyUrl: process.env.PRIVACY_POLICY_URL || 'https://prosperalink.com/privacy',
  termsOfServiceUrl: process.env.TERMS_OF_SERVICE_URL || 'https://prosperalink.com/terms',
  dataDeletionUrl: process.env.DATA_DELETION_URL || 'https://prosperalink.com/data-deletion',
  redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/auth/facebook/callback',
  scope: ['email', 'public_profile', 'pages_manage_posts', 'pages_read_engagement', 'business_management']
};

// Types pour l'API Meta
export interface FacebookUser {
  id: string;
  name: string;
  email: string;
  picture?: {
    data: {
      url: string;
      width: number;
      height: number;
    };
  };
  access_token?: string;
}

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
  tasks: string[];
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  reactions?: {
    summary: {
      total_count: number;
    };
  };
  comments?: {
    summary: {
      total_count: number;
    };
  };
}

export interface FacebookInsights {
  page_impressions: number;
  page_engaged_users: number;
  page_post_engagements: number;
  page_followers: number;
}

// Classe principale pour l'API Meta
export class MetaAPI {
  private appId: string;
  private appSecret: string;
  private baseUrl = 'https://graph.facebook.com/v19.0';

  constructor() {
    this.appId = META_CONFIG.appId;
    this.appSecret = META_CONFIG.appSecret;
  }

  // Générer l'URL d'autorisation Facebook
  getAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.appId,
      redirect_uri: META_CONFIG.redirectUri,
      scope: META_CONFIG.scope.join(','),
      response_type: 'code',
      state: state || 'prosperalink_auth'
    });

    return `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
  }

  // Échanger le code d'autorisation contre un token d'accès
  async exchangeCodeForToken(code: string): Promise<{ access_token: string; user_id: string }> {
    const params = new URLSearchParams({
      client_id: this.appId,
      client_secret: this.appSecret,
      redirect_uri: META_CONFIG.redirectUri,
      code
    });

    const response = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de l'échange du code: ${response.statusText}`);
    }

    return await response.json();
  }

  // Obtenir les informations de l'utilisateur
  async getUserInfo(accessToken: string): Promise<FacebookUser> {
    const params = new URLSearchParams({
      access_token: accessToken,
      fields: 'id,name,email,picture'
    });

    const response = await fetch(`${this.baseUrl}/me?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des informations utilisateur: ${response.statusText}`);
    }

    return await response.json();
  }

  // Obtenir les pages gérées par l'utilisateur
  async getUserPages(accessToken: string): Promise<FacebookPage[]> {
    const params = new URLSearchParams({
      access_token: accessToken,
      fields: 'id,name,access_token,category,tasks'
    });

    const response = await fetch(`${this.baseUrl}/me/accounts?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des pages: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  // Publier sur une page Facebook
  async publishToPage(pageId: string, pageAccessToken: string, message: string, link?: string): Promise<{ id: string; post_id: string }> {
    const postData: any = {
      message,
      access_token: pageAccessToken
    };

    if (link) {
      postData.link = link;
    }

    const response = await fetch(`${this.baseUrl}/${pageId}/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la publication: ${response.statusText}`);
    }

    return await response.json();
  }

  // Obtenir les posts d'une page
  async getPagePosts(pageId: string, pageAccessToken: string, limit: number = 10): Promise<FacebookPost[]> {
    const params = new URLSearchParams({
      access_token: pageAccessToken,
      fields: 'id,message,created_time,permalink_url,reactions.summary(total_count),comments.summary(total_count)',
      limit: limit.toString()
    });

    const response = await fetch(`${this.baseUrl}/${pageId}/posts?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des posts: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  // Obtenir les insights d'une page
  async getPageInsights(pageId: string, pageAccessToken: string, period: 'day' | 'week' | 'month' = 'day'): Promise<FacebookInsights> {
    const params = new URLSearchParams({
      access_token: pageAccessToken,
      metric: 'page_impressions,page_engaged_users,page_post_engagements,page_followers',
      period: period
    });

    const response = await fetch(`${this.baseUrl}/${pageId}/insights?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des insights: ${response.statusText}`);
    }

    const data = await response.json();
    const insights: any = {};
    
    data.data?.forEach((metric: any) => {
      insights[metric.name] = metric.values?.[0]?.value || 0;
    });

    return insights;
  }

  // Programmer une publication
  async schedulePost(pageId: string, pageAccessToken: string, message: string, scheduledPublishTime: Date, link?: string): Promise<{ id: string; post_id: string }> {
    const postData: any = {
      message,
      access_token: pageAccessToken,
      scheduled_publish_time: Math.floor(scheduledPublishTime.getTime() / 1000)
    };

    if (link) {
      postData.link = link;
    }

    const response = await fetch(`${this.baseUrl}/${pageId}/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la programmation de la publication: ${response.statusText}`);
    }

    return await response.json();
  }

  // Supprimer un post
  async deletePost(postId: string, pageAccessToken: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: pageAccessToken
      })
    });

    return response.ok;
  }

  // Obtenir les commentaires d'un post
  async getPostComments(postId: string, pageAccessToken: string, limit: number = 25): Promise<any[]> {
    const params = new URLSearchParams({
      access_token: pageAccessToken,
      fields: 'id,message,created_time,from',
      limit: limit.toString()
    });

    const response = await fetch(`${this.baseUrl}/${postId}/comments?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des commentaires: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  // Répondre à un commentaire
  async replyToComment(commentId: string, pageAccessToken: string, message: string): Promise<{ id: string }> {
    const response = await fetch(`${this.baseUrl}/${commentId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        access_token: pageAccessToken
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la réponse au commentaire: ${response.statusText}`);
    }

    return await response.json();
  }

  // Valider un token d'accès
  async validateToken(accessToken: string): Promise<{ valid: boolean; user_id?: string; expires_at?: number }> {
    const params = new URLSearchParams({
      access_token: accessToken
    });

    const response = await fetch(`${this.baseUrl}/debug_token?${params.toString()}`);
    
    if (!response.ok) {
      return { valid: false };
    }

    const data = await response.json();
    return {
      valid: data.data?.is_valid || false,
      user_id: data.data?.user_id,
      expires_at: data.data?.expires_at
    };
  }
}

// Instance singleton
export const metaAPI = new MetaAPI();

// Fonctions utilitaires
export const formatFacebookDate = (dateString: string): Date => {
  return new Date(dateString.replace('+0000', 'Z'));
};

export const formatEngagementRate = (engagements: number, reach: number): number => {
  return reach > 0 ? (engagements / reach) * 100 : 0;
};

export const getBestPostingTime = (insights: FacebookInsights[]): { day: string; hour: number } => {
  // Logique pour déterminer le meilleur moment de publication
  // Basé sur les insights historiques
  return { day: 'monday', hour: 9 };
}; 