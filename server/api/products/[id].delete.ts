import { sql } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Product ID required' })
    }

    const deleted = await sql`
      DELETE FROM products 
      WHERE id = ${id} 
      RETURNING id, title;
    `

    if (deleted.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }

    try {
      await sql`
        INSERT INTO audit_logs (action, performed_by, details)
        VALUES ('PRODUCT_DELETED', 'admin@gmail.com', ${`Deleted product ID ${id}`});
      `
    } catch {
      // audit log optional
    }

    return {
      success: true,
      message: 'Product deleted from Neon database successfully',
      data: deleted[0],
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    })
  }
})
