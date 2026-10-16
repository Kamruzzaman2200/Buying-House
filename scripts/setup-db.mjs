import { neon } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error(
    'DATABASE_URL is required. Set it in your environment and rerun this script.'
  )
  process.exit(1)
}

async function setupDatabase() {
  const sql = neon(connectionString)

  console.log('1. Creating products table in Neon PostgreSQL...')
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      vibe VARCHAR(100),
      season VARCHAR(100),
      description TEXT,
      image_url TEXT NOT NULL,
      fabric_details TEXT,
      cut_silhouette VARCHAR(100),
      moq INT DEFAULT 100,
      lead_time VARCHAR(50) DEFAULT '30-45 Days',
      fob_price VARCHAR(50) DEFAULT '$24 - $48',
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `

  console.log('2. Creating inquiries table in Neon PostgreSQL...')
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      product_interest VARCHAR(255),
      target_quantity INT,
      message TEXT,
      status VARCHAR(50) DEFAULT 'New',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `

  console.log('3. Creating audit_logs table for hacker-proof security logging...')
  await sql`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      action VARCHAR(100) NOT NULL,
      performed_by VARCHAR(255) NOT NULL,
      ip_address VARCHAR(100),
      details TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `

  console.log('4. Checking existing count of products in Neon...')
  const existing = await sql`SELECT count(*) FROM products;`
  console.log('Current product count in Neon:', existing[0].count)

  if (parseInt(existing[0].count) === 0) {
    console.log('5. Seeding initial 14 buying house capsule products into Neon...')
    const seedProducts = [
      {
        id: 'nexus-espresso-leather',
        title: 'Calfskin Executive Blouson',
        category: 'Outerwear',
        vibe: 'Executive Heritage',
        season: 'AW 26/27 Drop',
        description: 'Full-grain Italian calfskin with silk-satin lining, spread collar, and custom antique nickel zips.',
        image_url: '/products/99e5fdfa67a7723cd5301e9f2479f206.webp',
        fabric_details: '100% Full-Grain Italian Calf Leather (1.1mm) • OEKO-TEX Certified Lining',
        cut_silhouette: 'Tailored Boxy Silhouette',
        moq: 150,
        lead_time: '35 Days',
        fob_price: '$110 - $145',
        featured: true
      },
      {
        id: 'nexus-cognac-suede',
        title: 'Split Suede Western Trucker',
        category: 'Outerwear',
        vibe: 'Modern Western Minimalist',
        season: 'Autumn Capsule',
        description: 'Velvety Italian split suede featuring subtle western yoke detailing and custom cast brass hardware.',
        image_url: '/products/a2eb0cd9b45708406fbcbc4dc2661be5.webp',
        fabric_details: 'Premium Heavyweight Split Suede • Water-Resistant Nanotech Finish',
        cut_silhouette: 'Cropped Boxy Fit',
        moq: 200,
        lead_time: '30 Days',
        fob_price: '$85 - $115',
        featured: true
      },
      {
        id: 'nexus-olive-linen',
        title: 'Silk-Linen Riviera Overshirt',
        category: 'Linen & Resort',
        vibe: 'Quiet Luxury Resort',
        season: 'SS 26 Collection',
        description: 'Enzyme-softened French Normandy linen and mulberry silk blend for unmatched fluidity and temperature regulation.',
        image_url: '/products/7f0f0913b5df26a118f4c55421544c50.webp',
        fabric_details: '70% Normandy Flax Linen, 30% Mulberry Silk (220 GSM)',
        cut_silhouette: 'Camp Collar Relaxed Drop',
        moq: 300,
        lead_time: '25 Days',
        fob_price: '$28 - $38',
        featured: true
      },
      {
        id: 'nexus-monochrome-boucle',
        title: 'Monochrome Bouclé Grid Overshirt',
        category: 'Contemporary Overshirts',
        vibe: 'Architectural Noir',
        season: 'Autumn / Winter',
        description: 'Complex textural bouclé grid weave engineered on circular Jacquard looms for premier fashion retail lines.',
        image_url: '/products/68f272a18c62b2b26e4fe50013db405f.webp',
        fabric_details: 'Textured Wool-Cotton Blend (340 GSM)',
        cut_silhouette: 'Structured Straight Fit',
        moq: 250,
        lead_time: '30 Days',
        fob_price: '$34 - $46',
        featured: true
      },
      {
        id: 'nexus-mulberry-linen',
        title: 'Mulberry Wine Relaxed Linen Shirt',
        category: 'Linen & Resort',
        vibe: 'Artisan Sartorial',
        season: 'Resort & Evening',
        description: 'Deep mulberry yarn-dyed European linen crafted with mother-of-pearl buttons and single-needle tailoring.',
        image_url: '/products/93ae61e735b94b7f66eefa7ed4b1501b.webp',
        fabric_details: '100% Normandy Linen with Enzyme Pre-Wash',
        cut_silhouette: 'Relaxed Drop Shoulder',
        moq: 250,
        lead_time: '25 Days',
        fob_price: '$26 - $36',
        featured: false
      },
      {
        id: 'nexus-tan-harrington',
        title: 'Bonded Twill Urban Harrington',
        category: 'Outerwear',
        vibe: 'Minimalist Utility',
        season: 'Fall / Winter Core',
        description: 'Clean zip front utility jacket in bonded compact twill, engineered for corporate uniforming and private label capsules.',
        image_url: '/products/038771cebe203f828240f76e3f336ffa.webp',
        fabric_details: 'Bonded 2-Layer Cotton-Poly Twill • PFC-Free DWR',
        cut_silhouette: 'Tailored Point Collar Fit',
        moq: 300,
        lead_time: '30 Days',
        fob_price: '$42 - $58',
        featured: false
      },
      {
        id: 'nexus-terracotta-trucker',
        title: 'Garment-Dyed Canvas Trucker',
        category: 'Outerwear',
        vibe: 'Heritage Workwear Refined',
        season: 'All-Season Core',
        description: '14oz Japanese-style ring-spun duck canvas dyed with mineral pigments for deep earthy luster.',
        image_url: '/products/3573d29096f7571c4ea3f7952b6348a8.webp',
        fabric_details: '14oz Ring-Spun Heavyweight 100% Cotton Duck Canvas',
        cut_silhouette: 'Boxy Vintage Crop',
        moq: 200,
        lead_time: '28 Days',
        fob_price: '$45 - $62',
        featured: false
      },
      {
        id: 'nexus-sartorial-stripe',
        title: 'Bold Stripe Sartorial Oxford',
        category: 'Tailored Shirts',
        vibe: 'Executive Modern',
        season: 'Spring / Summer',
        description: 'Two-ply 120s Egyptian cotton poplin with high-density vertical block stripe and semi-spread collar.',
        image_url: '/products/357cd5ca569b0ceefc4987c9760dc790.webp',
        fabric_details: '100% Two-Ply Compact Giza Cotton',
        cut_silhouette: 'Contemporary Oversized Tailored',
        moq: 500,
        lead_time: '20 Days',
        fob_price: '$22 - $32',
        featured: false
      },
      {
        id: 'nexus-nautical-stripe',
        title: 'Nautical Navy Banker Poplin',
        category: 'Tailored Shirts',
        vibe: 'Sartorial Riviera',
        season: 'Spring / Resort',
        description: 'Classic navy banker stripe shirt designed for high-turnover premium retail collections.',
        image_url: '/products/4c0c6bf0a48caa8f8804c9b54c024046.webp',
        fabric_details: '100% Long-Staple Combed Cotton Poplin (130 GSM)',
        cut_silhouette: 'Classic Tailored Cut',
        moq: 500,
        lead_time: '20 Days',
        fob_price: '$21 - $29',
        featured: false
      },
      {
        id: 'nexus-desert-utility',
        title: 'Dual-Pocket Heavy Twill Overshirt',
        category: 'Contemporary Overshirts',
        vibe: 'Editorial Street Minimal',
        season: 'Spring / Summer',
        description: 'Military-grade compact cotton twill with dual box-pleated chest pockets and reinforced elbow patches.',
        image_url: '/products/6e0b639717453f089200258e1e5aa8da.webp',
        fabric_details: '100% Compact Twill Cotton (290 GSM)',
        cut_silhouette: 'Boxy Utility Fit',
        moq: 300,
        lead_time: '25 Days',
        fob_price: '$29 - $39',
        featured: false
      },
      {
        id: 'nexus-shadow-tartan',
        title: 'Brushed Midnight Flannel Overshirt',
        category: 'Contemporary Overshirts',
        vibe: 'Nocturnal Grunge Refined',
        season: 'Autumn / Winter',
        description: 'Double-faced brushed cotton flannel in deep navy and noir plaid with soft-touch sueded finish.',
        image_url: '/products/8215d85a54227c71cf38b8d8a70950d7.webp',
        fabric_details: '100% Double-Brushed Cotton Flannel (310 GSM)',
        cut_silhouette: 'Relaxed Layering Cut',
        moq: 400,
        lead_time: '25 Days',
        fob_price: '$27 - $37',
        featured: false
      },
      {
        id: 'nexus-shearling-plaid',
        title: 'Alpine Wool Shearling Jacket',
        category: 'Outerwear',
        vibe: 'Winter Lodge Luxe',
        season: 'Winter Capsule',
        description: 'Heavyweight recycled wool tartan featuring plush faux-shearling collar and quilted thermal insulation.',
        image_url: '/products/a569bff2c294c4ad3eb3a5688fe83c67.webp',
        fabric_details: '65% Recycled Wool, 35% Synthetic Blend • Eco-Sherpa Collar',
        cut_silhouette: 'Heavyweight Insulated Boxy Cut',
        moq: 200,
        lead_time: '35 Days',
        fob_price: '$58 - $78',
        featured: false
      },
      {
        id: 'nexus-pitch-denim',
        title: 'Rigid Selvedge Black Denim Trucker',
        category: 'Outerwear',
        vibe: 'High Contrast Minimalist',
        season: 'All-Season Core',
        description: '13.5oz rigid black warp/black weft selvedge denim woven on shuttle looms with custom cast shank buttons.',
        image_url: '/products/efcefb3061c890399a24c9a680f93fa1.webp',
        fabric_details: '13.5oz Japanese Selvedge Cotton Denim with Red ID',
        cut_silhouette: 'Classic Type III Boxy Fit',
        moq: 250,
        lead_time: '30 Days',
        fob_price: '$48 - $65',
        featured: false
      },
      {
        id: 'nexus-indigo-pinstripe',
        title: 'Navy Fine Pinstripe Casual Shirt',
        category: 'Contemporary Overshirts',
        vibe: 'Smart Streetwear',
        season: 'Fall Capsule',
        description: 'Subtle sartorial pinstripe translated to casual oversized poplin for streetwear capsule drops.',
        image_url: '/products/3bf05236e4bfda2de55d638cc3cfe50a.webp',
        fabric_details: '100% Combed Cotton Poplin (140 GSM)',
        cut_silhouette: 'Relaxed Drop Shoulder',
        moq: 350,
        lead_time: '22 Days',
        fob_price: '$23 - $33',
        featured: false
      }
    ]

    for (const p of seedProducts) {
      await sql`
        INSERT INTO products (
          id, title, category, vibe, season, description,
          image_url, fabric_details, cut_silhouette, moq, lead_time, fob_price, featured
        ) VALUES (
          ${p.id}, ${p.title}, ${p.category}, ${p.vibe}, ${p.season}, ${p.description},
          ${p.image_url}, ${p.fabric_details}, ${p.cut_silhouette}, ${p.moq}, ${p.lead_time}, ${p.fob_price}, ${p.featured}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    }
    console.log('✓ Successfully seeded 14 capsule products into Neon PostgreSQL!')
  }

  const finalCount = await sql`SELECT count(*) FROM products;`
  console.log('✓ Verified total products in Neon PostgreSQL:', finalCount[0].count)
}

setupDatabase()
  .then(() => console.log('✓ Neon database initialization finished!'))
  .catch((err) => console.error('x Error in setupDatabase:', err))
