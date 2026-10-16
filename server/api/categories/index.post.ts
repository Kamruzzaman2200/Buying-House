import { sql } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, description } = body

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Category name must be at least 2 characters long.',
      })
    }

    const trimmedName = name.trim()
    const slug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if category already exists
    const existing = await sql`
      SELECT id, name FROM categories WHERE LOWER(name) = LOWER(${trimmedName});
    `

    if (existing && existing.length > 0) {
      return {
        success: true,
        category: existing[0],
        message: 'Category already exists in Neon DB.',
        isExisting: true,
      }
    }

    const inserted = await sql`
      INSERT INTO categories (name, slug, description)
      VALUES (${trimmedName}, ${slug}, ${description ? description.trim() : null})
      RETURNING *;
    `

    try {
      await sql`
        INSERT INTO audit_logs (action, performed_by, details)
        VALUES ('CATEGORY_CREATED', 'admin@gmail.com', ${`Created new category: ${trimmedName}`});
      `
    } catch {
      // audit log optional
    }

    return {
      success: true,
      category: inserted[0],
      message: `Category "${trimmedName}" successfully added.`,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create category in Neon DB.',
    })
  }
})
