import { neon } from '@neondatabase/serverless'

const connectionString = 'postgresql://neondb_owner:npg_5ZEP4IpkOHqw@ep-lucky-voice-b477yecu-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

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
