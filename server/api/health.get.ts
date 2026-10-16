import { sql } from '~/lib/db'

export default defineEventHandler(async () => {
  try {
    const startTime = Date.now()
    const dbInfo = await sql`
      SELECT current_database() as db, current_user as user, version();
    `
    const countInfo = await sql`SELECT count(*) as total_products FROM products;`
    const latency = Date.now() - startTime

    return {
      status: 'healthy',
      database: 'Neon PostgreSQL Serverless',
      latency: `${latency}ms`,
      details: dbInfo[0],
      product_count: parseInt(countInfo[0].total_products),
      timestamp: new Date().toISOString(),
    }
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
