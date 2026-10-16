import { neon } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error(
    'DATABASE_URL is required. Set it in your environment and rerun this script.'
  )
  process.exit(1)
}

async function main() {
  try {
    console.log('Connecting to Neon PostgreSQL...')
    const sql = neon(connectionString)
    const result = await sql`SELECT version(), current_database(), current_user;`
    console.log('SUCCESS! Connected to Neon Database:')
    console.log(result)
  } catch (err) {
    console.error('Connection failed:', err)
  }
}

main()
