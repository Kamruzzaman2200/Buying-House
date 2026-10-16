import { sql } from '~/lib/db'

export default defineEventHandler(async () => {
  try {
    const inquiries = await sql`
      SELECT * FROM inquiries 
      ORDER BY created_at DESC;
    `
    return { success: true, count: inquiries.length, data: inquiries }
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
