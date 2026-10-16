import { sql } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const category = query.category as string | undefined

    let products
    if (category && category !== 'All') {
      products = await sql`
        SELECT * FROM products 
        WHERE category = ${category} 
        ORDER BY created_at DESC;
      `
    } else {
      products = await sql`
        SELECT * FROM products 
        ORDER BY created_at DESC;
      `
    }

    return {
      success: true,
      count: products.length,
      data: products,
      products: products,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
})
