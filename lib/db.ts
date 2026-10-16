/**
 * ==============================================================================
 * NEON POSTGRESQL DATABASE CLIENT
 * High-performance serverless connection using @neondatabase/serverless
 * ==============================================================================
 */

import { neon } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is required. Set it in your environment before starting the app.'
  )
}

// Create a tagged template SQL executor with serverless pooling
export const sql = neon(connectionString)

export interface ProductRecord {
  id: string
  title: string
  category: string
  vibe?: string
  season?: string
  description?: string
  image_url: string
  fabric_details?: string
  cut_silhouette?: string
  moq?: number
  lead_time?: string
  fob_price?: string
  featured?: boolean
  created_at?: string
}

export interface InquiryRecord {
  id?: number
  client_name: string
  email: string
  company?: string
  product_interest?: string
  target_quantity?: number
  message?: string
  status?: string
  created_at?: string
}
