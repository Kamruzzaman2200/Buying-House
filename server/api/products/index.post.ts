import { sql } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const {
      title,
      category,
      vibe,
      season,
      description,
      image_url,
      fabric_details,
      cut_silhouette,
      moq,
      lead_time,
      fob_price,
      featured,
    } = body

    if (!title || !category || !image_url) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: title, category, and image_url are required.',
      })
    }

    const cleanId = 'prod-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7)

    const inserted = await sql`
      INSERT INTO products (
        id, title, category, vibe, season, description,
        image_url, fabric_details, cut_silhouette, moq,
        lead_time, fob_price, featured
      ) VALUES (
        ${cleanId},
        ${title.trim()},
        ${category.trim()},
        ${vibe ? vibe.trim() : 'Contemporary'},
        ${season ? season.trim() : 'Current Drop'},
        ${description ? description.trim() : ''},
        ${image_url.trim()},
        ${fabric_details ? fabric_details.trim() : 'Standard Mill Fabric'},
        ${cut_silhouette ? cut_silhouette.trim() : 'Regular Fit'},
        ${moq ? parseInt(moq) : 100},
        ${lead_time ? lead_time.trim() : '30-45 Days'},
        ${fob_price ? fob_price.trim() : '৳3,000 - ৳5,500'},
        ${Boolean(featured)}
      )
      RETURNING *;
    `

    try {
      await sql`
        INSERT INTO audit_logs (action, performed_by, details)
        VALUES ('PRODUCT_CREATED', 'admin@gmail.com', ${`Created product ${title} (ID: ${cleanId})`});
      `
    } catch {
      // audit log optional
    }

    return {
      success: true,
      message: 'Product successfully uploaded and saved to Neon PostgreSQL!',
      data: inserted[0],
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    })
  }
})
