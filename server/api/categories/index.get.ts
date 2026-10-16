import { sql } from '~/lib/db'

export default defineEventHandler(async () => {
  try {
    // Attempt to query from categories table
    const rows = await sql`
      SELECT id, name, slug, description, created_at 
      FROM categories 
      ORDER BY id ASC;
    `

    if (rows && rows.length > 0) {
      return {
        success: true,
        count: rows.length,
        categories: rows,
        names: rows.map((r: any) => r.name),
      }
    }

    // Fallback: distinct categories from products table
    const distinctProds = await sql`
      SELECT DISTINCT category FROM products WHERE category IS NOT NULL;
    `
    const names = distinctProds.map((p: any) => p.category)

    return {
      success: true,
      count: names.length,
      categories: names.map((name: string, i: number) => ({ id: i + 1, name })),
      names,
    }
  } catch (error: any) {
    // Graceful fallback to default categories if table error occurs
    const defaultCategories = [
      'Outerwear',
      'Tailored Shirts',
      'Linen & Resort',
      'Contemporary Overshirts',
      'Denim',
      'Knitwear & Heavy Fleece',
      'Activewear & Technical',
    ]
    return {
      success: true,
      count: defaultCategories.length,
      categories: defaultCategories.map((name, i) => ({ id: i + 1, name })),
      names: defaultCategories,
      fallback: true,
      error: error.message,
    }
  }
})
