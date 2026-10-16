import { sql } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const rawId = getRouterParam(event, 'id')
    const numericId = parseInt(String(rawId), 10)
    if (isNaN(numericId)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid inquiry ID.' })
    }

    const deleted = await sql`
      DELETE FROM inquiries
      WHERE id = ${numericId}
      RETURNING id, client_name, email;
    `

    if (deleted.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Inquiry not found.' })
    }

    try {
      await sql`
        INSERT INTO audit_logs (action, performed_by, details)
        VALUES ('INQUIRY_DELETED', 'admin@gmail.com', ${`Deleted inquiry ID #${numericId} from ${deleted[0].client_name}`});
      `
    } catch {
      // audit log optional
    }

    return {
      success: true,
      message: `Inquiry #${numericId} deleted from Neon database successfully`,
      data: deleted[0],
    }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 500, statusMessage: error.message })
  }
})
