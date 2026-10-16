import { sql } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing category ID.',
      })
    }

    const deleted = await sql`
      DELETE FROM categories 
      WHERE id = ${id} 
      RETURNING *;
    `

    if (deleted.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `Category #${id} not found in Neon database.`,
      })
    }

    try {
      await sql`
        INSERT INTO audit_logs (action, performed_by, details)
        VALUES ('CATEGORY_DELETED', 'admin@gmail.com', ${`Deleted category ${deleted[0].name} (ID: ${id})`});
      `
    } catch {
      // audit log optional
    }

    return {
      success: true,
      message: `Category "${deleted[0].name}" successfully deleted.`,
      category: deleted[0],
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to delete category.',
    })
  }
})
