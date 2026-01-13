import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.DATABASE_URL?.startsWith('file:')) {
    const dbPath = process.env.DATABASE_URL.replace('file:', '')
    const absolutePath = path.resolve(process.cwd(), dbPath)
    console.log('[Prisma Diagnostic] DATABASE_URL detected as file path')
    console.log('[Prisma Diagnostic] CWD:', process.cwd())
    console.log('[Prisma Diagnostic] Absolute DB path:', absolutePath)
    console.log('[Prisma Diagnostic] File exists at absolute path:', fs.existsSync(absolutePath))

    // Check common Vercel locations if not found
    if (!fs.existsSync(absolutePath)) {
        const vercelPath = path.resolve('/var/task', dbPath)
        console.log('[Prisma Diagnostic] Checking Vercel /var/task path:', vercelPath)
        console.log('[Prisma Diagnostic] File exists at /var/task:', fs.existsSync(vercelPath))
    }
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
