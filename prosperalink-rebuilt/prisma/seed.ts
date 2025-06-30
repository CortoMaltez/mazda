import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  // Supprimer les données existantes
  await prisma.consultantPermission.deleteMany()
  await prisma.user.deleteMany()

  // Créer un utilisateur admin
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.create({
    data: {
      name: 'Administrateur Principal',
      email: 'admin@prosperalink.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Créer un consultant
  const consultantPassword = await bcrypt.hash('consultant123', 12)
  const consultant = await prisma.user.create({
    data: {
      name: 'Jean Consultant',
      email: 'consultant@prosperalink.com',
      password: consultantPassword,
      role: 'CONSULTANT',
    },
  })

  // Créer un client
  const clientPassword = await bcrypt.hash('client123', 12)
  const client = await prisma.user.create({
    data: {
      name: 'Marie Client',
      email: 'client@prosperalink.com',
      password: clientPassword,
      role: 'CLIENT',
    },
  })

  // Attribuer des permissions au consultant
  await prisma.consultantPermission.createMany({
    data: [
      {
        consultantId: consultant.id,
        grantedBy: admin.id,
        permission: 'dashboard',
        canRead: true,
        canWrite: false,
        canDelete: false,
      },
      {
        consultantId: consultant.id,
        grantedBy: admin.id,
        permission: 'users',
        canRead: true,
        canWrite: false,
        canDelete: false,
      },
      {
        consultantId: consultant.id,
        grantedBy: admin.id,
        permission: 'companies',
        canRead: true,
        canWrite: true,
        canDelete: false,
      },
      {
        consultantId: consultant.id,
        grantedBy: admin.id,
        permission: 'analytics',
        canRead: true,
        canWrite: false,
        canDelete: false,
      },
    ],
  })

  console.log('✅ Seeding terminé!')
  console.log('📧 Comptes de test créés:')
  console.log(`   Admin: admin@prosperalink.com / admin123`)
  console.log(`   Consultant: consultant@prosperalink.com / consultant123`)
  console.log(`   Client: client@prosperalink.com / client123`)
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 