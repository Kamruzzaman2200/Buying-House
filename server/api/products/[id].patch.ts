import { sql } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing product ID.',
      })
    }

    const body = await readBody(event)
    const { fob_price, title, category, moq, fabric_details, lead_time, featured, vibe } = body

    // Check if product exists first
    const existing = await sql`
      SELECT * FROM products WHERE id = ${id} LIMIT 1;
    `

    if (existing.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `Product "${id}" not found in Neon database.`,
      })
    }

    const current = existing[0]

    const updatedPrice = fob_price !== undefined ? String(fob_price).trim() : current.fob_price
    const updatedTitle = title !== undefined ? String(title).trim() : current.title
    const updatedCategory = category !== undefined ? String(category).trim() : current.category
    const updatedMoq = moq !== undefined ? parseInt(moq) : current.moq
    const updatedFabric = fabric_details !== undefined ? String(fabric_details).trim() : current.fabric_details
    const updatedLead = lead_time !== undefined ? String(lead_time).trim() : current.lead_time
    const updatedFeatured = featured !== undefined ? Boolean(featured) : current.featured
    const updatedVibe = vibe !== undefined ? String(vibe).trim() : current.vibe

    const updated = await sql`
      UPDATE products
      SET
        fob_price = ${updatedPrice},
        title = ${updatedTitle},
        category = ${updatedCategory},
        moq = ${updatedMoq},
        fabric_details = ${updatedFabric},
        lead_time = ${updatedLead},
        featured = ${updatedFeatured},
        vibe = ${updatedVibe}
      WHERE id = ${id}
      RETURNING *;
    `

    try {
      await sql`
        INSERT INTO audit_logs (action, performed_by, details)
        VALUES ('PRODUCT_UPDATED', 'admin@gmail.com', ${`Updated product ${updatedTitle} (ID: ${id}) - New Price: ${updatedPrice}`});
      `
    } catch {
      // audit log optional
    }

    return {
      success: true,
      message: `Product "${updatedTitle}" price benchmark successfully updated to "${updatedPrice}".`,
      product: updated[0],
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to update product in Neon DB.',
    })
  }
})
