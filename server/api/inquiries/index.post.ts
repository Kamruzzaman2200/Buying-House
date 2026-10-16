import { sql } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { client_name, email, company, product_interest, target_quantity, message } = body

    if (!client_name || !email) {
      throw createError({ statusCode: 400, statusMessage: 'Name and email are required fields.' })
    }

    const inserted = await sql`
      INSERT INTO inquiries (
        client_name, email, company, product_interest, target_quantity, message
      ) VALUES (
        ${client_name.trim()},
        ${email.trim()},
        ${company ? company.trim() : 'Independent Brand'},
        ${product_interest ? product_interest.trim() : 'General Sourcing Inquiry'},
        ${target_quantity ? parseInt(target_quantity) : 100},
        ${message ? message.trim() : ''}
      )
      RETURNING *;
    `

    return {
      success: true,
      message: 'Inquiry received and logged to Neon PostgreSQL! Our sourcing director will contact you.',
      data: inserted[0],
    }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 500, statusMessage: error.message })
  }
})
