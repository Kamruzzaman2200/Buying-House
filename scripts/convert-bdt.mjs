import { neon } from '@neondatabase/serverless'

const connectionString = 'postgresql://neondb_owner:npg_5ZEP4IpkOHqw@ep-lucky-voice-b477yecu-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

async function updateToBDT() {
  const sql = neon(connectionString)
  console.log('Fetching products from Neon...')
  const products = await sql`SELECT id, title, fob_price FROM products;`
  console.log(`Found ${products.length} products.`)

  // Conversion rate: 1 USD ≈ 120 BDT
  for (const prod of products) {
    const oldPrice = prod.fob_price || ''
    if (oldPrice.includes('$')) {
      // e.g. "$110 - $145" or "$25 - $45" or "$85 - $115"
      const newPrice = oldPrice.replace(/\$(\d+)/g, (_, val) => {
        const bdtVal = Math.round(parseInt(val, 10) * 120)
        return `৳${bdtVal.toLocaleString()}`
      })
      console.log(`Updating ${prod.id}: "${oldPrice}" -> "${newPrice}"`)
      await sql`UPDATE products SET fob_price = ${newPrice} WHERE id = ${prod.id};`
    }
  }

  const updated = await sql`SELECT id, title, fob_price FROM products LIMIT 5;`
  console.log('Sample updated products:', updated)
}

updateToBDT().catch(console.error)
