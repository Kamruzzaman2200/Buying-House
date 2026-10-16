import { neon } from '@neondatabase/serverless'

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_5ZEP4IpkOHqw@ep-lucky-voice-b477yecu-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const sql = neon(connectionString)

async function setupCategories() {
  console.log('1. Creating categories table in Neon PostgreSQL if not exists...')
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `

  console.log('2. Seeding default garment categories...')
  const defaults = [
    'Outerwear',
    'Tailored Shirts',
    'Linen & Resort',
    'Contemporary Overshirts',
    'Denim',
    'Knitwear & Heavy Fleece',
    'Activewear & Technical',
  ]

  for (const name of defaults) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    await sql`
      INSERT INTO categories (name, slug)
      VALUES (${name}, ${slug})
      ON CONFLICT (name) DO NOTHING;
    `
  }

  const rows = await sql`SELECT * FROM categories ORDER BY id ASC;`
  console.log('Categories count in Neon:', rows.length)
  console.log('Current categories:', rows.map((r) => r.name))
}

setupCategories()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Failed to setup categories:', err)
    process.exit(1)
  })
