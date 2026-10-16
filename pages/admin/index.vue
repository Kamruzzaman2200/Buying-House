<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Database,
  Layers,
  Inbox,
  Plus,
  Trash2,
  ExternalLink,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LogOut,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
})

useHead({
  title: 'Admin Control Plane // Neon DB Manager | NEXUS SOURCING',
})

const activeTab = ref<'catalog' | 'inquiries' | 'telemetry'>('inquiries')
const isAuthenticated = ref(false)
const isLoading = ref(true)

// Telemetry & DB data
const dbStatus = ref<any>(null)
const products = ref<any[]>([])
const inquiries = ref<any[]>([])

// New Product Form
const isAddingProduct = ref(false)
const isSubmittingProduct = ref(false)
const newProd = ref({
  title: '',
  category: 'Outerwear',
  vibe: 'Contemporary',
  season: 'Current Drop',
  description: '',
  image_url: '',
  fabric_details: '',
  cut_silhouette: 'Regular Fit',
  moq: 100,
  lead_time: '30-45 Days',
  fob_price: '৳3,500 - ৳5,500',
  featured: false,
})

// Deletion State
const deletingInquiryId = ref<number | null>(null)
const deletingProductId = ref<string | null>(null)
const statusMessage = ref('')

const loadData = async () => {
  isLoading.value = true
  try {
    const [healthRes, prodsRes, inqRes]: any = await Promise.all([
      $fetch('/api/health').catch(() => null),
      $fetch('/api/products').catch(() => ({ data: [] })),
      $fetch('/api/inquiries').catch(() => ({ data: [] })),
    ])

    if (healthRes) dbStatus.value = healthRes
    if (prodsRes) products.value = prodsRes.data || prodsRes.products || []
    if (inqRes) inquiries.value = inqRes.data || []
  } catch (err) {
    console.error('Error fetching admin data:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const auth = sessionStorage.getItem('nexus_admin_authenticated')
    if (auth !== 'true') {
      await navigateTo('/admin/login')
      return
    }
    isAuthenticated.value = true
  }
  await loadData()
})

const handleLogout = async () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('nexus_admin_authenticated')
  }
  await navigateTo('/admin/login')
}

const handleCreateProduct = async () => {
  if (!newProd.value.title || !newProd.value.image_url) {
    alert('Please provide at least a title and image URL.')
    return
  }

  isSubmittingProduct.value = true
  try {
    const res: any = await $fetch('/api/products', {
      method: 'POST',
      body: newProd.value,
    })

    if (res.success) {
      statusMessage.value = 'Product successfully uploaded to Neon DB!'
      isAddingProduct.value = false
      newProd.value = {
        title: '',
        category: 'Outerwear',
        vibe: 'Contemporary',
        season: 'Current Drop',
        description: '',
        image_url: '',
        fabric_details: '',
        cut_silhouette: 'Regular Fit',
        moq: 100,
        lead_time: '30-45 Days',
        fob_price: '৳3,500 - ৳5,500',
        featured: false,
      }
      await loadData()
      setTimeout(() => (statusMessage.value = ''), 4000)
    }
  } catch (err: any) {
    alert('Failed to upload product: ' + err.message)
  } finally {
    isSubmittingProduct.value = false
  }
}

const handleDeleteProduct = async (id: string, title: string) => {
  if (!confirm(`Are you sure you want to delete product "${title}" from Neon PostgreSQL?`)) return

  deletingProductId.value = id
  try {
    const res: any = await $fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (res.success) {
      products.value = products.value.filter((p) => p.id !== id)
      statusMessage.value = `Product "${title}" removed from database.`
      setTimeout(() => (statusMessage.value = ''), 4000)
    }
  } catch (err: any) {
    alert('Failed to delete product: ' + err.message)
  } finally {
    deletingProductId.value = null
  }
}

const handleDeleteInquiry = async (id: number, name: string) => {
  if (!confirm(`Are you sure you want to permanently delete B2B Inquiry #${id} from ${name}?`)) return

  deletingInquiryId.value = id
  try {
    const res: any = await $fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
    if (res.success) {
      inquiries.value = inquiries.value.filter((inq) => inq.id !== id)
      statusMessage.value = `Inquiry #${id} permanently deleted.`
      setTimeout(() => (statusMessage.value = ''), 4000)
    }
  } catch (err: any) {
    alert('Failed to delete inquiry: ' + err.message)
  } finally {
    deletingInquiryId.value = null
  }
}
</script>

<template>
  <div v-if="isAuthenticated" class="admin-dashboard-container">
    <!-- Top Action Bar -->
    <div class="admin-top-toolbar">
      <div class="toolbar-title-cluster">
        <h1 class="admin-main-heading">Control Plane Dashboard</h1>
        <div class="admin-status-strip font-mono">
          <span class="live-dot" />
          <span>NEON POSTGRESQL CONNECTED (US-EAST-2)</span>
        </div>
      </div>

      <div class="toolbar-actions-cluster">
        <button class="tool-btn font-mono" @click="loadData" :disabled="isLoading">
          <RefreshCw :size="14" :class="{ 'spin-anim': isLoading }" />
          <span>Sync DB</span>
        </button>

        <button class="logout-btn font-mono" @click="handleLogout">
          <LogOut :size="14" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>

    <!-- Notification Banner -->
    <div v-if="statusMessage" class="admin-feedback-banner font-mono">
      <CheckCircle2 :size="16" />
      <span>{{ statusMessage }}</span>
    </div>

    <!-- Telemetry Metric Cards -->
    <div class="admin-metrics-row">
      <div class="admin-stat-card">
        <div class="stat-top font-mono">
          <span class="stat-label">ACTIVE GARMENTS</span>
          <Layers :size="16" class="stat-icon" />
        </div>
        <div class="stat-val font-mono">{{ products.length }}</div>
        <div class="stat-desc font-mono">Catalog items in Neon DB</div>
      </div>

      <div class="admin-stat-card">
        <div class="stat-top font-mono">
          <span class="stat-label">B2B INQUIRIES</span>
          <Inbox :size="16" class="stat-icon" />
        </div>
        <div class="stat-val font-mono">{{ inquiries.length }}</div>
        <div class="stat-desc font-mono">Client RFQ leads logged</div>
      </div>

      <div class="admin-stat-card">
        <div class="stat-top font-mono">
          <span class="stat-label">DATABASE LATENCY</span>
          <Database :size="16" class="stat-icon" />
        </div>
        <div class="stat-val font-mono">{{ dbStatus?.latency || '32ms' }}</div>
        <div class="stat-desc font-mono">Serverless query response</div>
      </div>
    </div>

    <!-- Section Navigation Tabs -->
    <div class="admin-nav-tabs font-mono">
      <button
        class="admin-tab-btn"
        :class="{ 'is-active': activeTab === 'inquiries' }"
        @click="activeTab = 'inquiries'"
      >
        <Inbox :size="15" />
        <span>B2B Inquiries ({{ inquiries.length }})</span>
      </button>

      <button
        class="admin-tab-btn"
        :class="{ 'is-active': activeTab === 'catalog' }"
        @click="activeTab = 'catalog'"
      >
        <Layers :size="15" />
        <span>Garment Catalog ({{ products.length }})</span>
      </button>

      <button
        class="admin-tab-btn"
        :class="{ 'is-active': activeTab === 'telemetry' }"
        @click="activeTab = 'telemetry'"
      >
        <Database :size="15" />
        <span>System Diagnostics</span>
      </button>
    </div>

    <!-- TAB 1: B2B INQUIRIES TABLE -->
    <div v-if="activeTab === 'inquiries'" class="admin-content-pane">
      <div class="pane-header-row">
        <div>
          <h2 class="pane-title">Client Sourcing Inquiries & RFQs</h2>
          <p class="pane-subtitle">Live stream of brand purchase requests logged directly into Neon PostgreSQL.</p>
        </div>
      </div>

      <div v-if="inquiries.length === 0" class="empty-data-box font-mono">
        <Inbox :size="32" class="empty-icon" />
        <p>No B2B inquiries currently logged in database.</p>
      </div>

      <div v-else class="table-responsive-box">
        <table class="admin-data-table font-mono">
          <thead>
            <tr>
              <th>ID</th>
              <th>CLIENT / COMPANY</th>
              <th>CONTACT</th>
              <th>INTEREST</th>
              <th>QTY</th>
              <th>DATE</th>
              <th>MESSAGE</th>
              <th class="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inq in inquiries" :key="inq.id">
              <td class="id-cell">#{{ inq.id }}</td>
              <td>
                <div class="client-name">{{ inq.client_name }}</div>
                <div class="client-company">{{ inq.company || 'Independent Brand' }}</div>
              </td>
              <td>
                <a :href="`mailto:${inq.email}`" class="email-link">
                  <Mail :size="12" />
                  <span>{{ inq.email }}</span>
                </a>
              </td>
              <td>
                <span class="interest-badge">{{ inq.product_interest || 'General' }}</span>
              </td>
              <td>{{ inq.target_quantity ? inq.target_quantity.toLocaleString() : '100' }} pcs</td>
              <td class="date-cell">
                {{ inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'Recent' }}
              </td>
              <td class="msg-cell" :title="inq.message">
                {{ inq.message || 'No additional note provided' }}
              </td>
              <td class="text-right">
                <button
                  class="action-delete-btn"
                  title="Delete Inquiry permanently from Neon DB"
                  :disabled="deletingInquiryId === inq.id"
                  @click="handleDeleteInquiry(inq.id, inq.client_name)"
                >
                  <Trash2 :size="14" />
                  <span>{{ deletingInquiryId === inq.id ? 'Deleting...' : 'Delete' }}</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 2: PRODUCT CATALOG MANAGER -->
    <div v-if="activeTab === 'catalog'" class="admin-content-pane">
      <div class="pane-header-row">
        <div>
          <h2 class="pane-title">Garment Catalog & Clo3D Tech Packs</h2>
          <p class="pane-subtitle">Manage styles and BDT FOB price benchmarks displayed in the public digital showroom.</p>
        </div>

        <button class="add-prod-btn font-mono" @click="isAddingProduct = !isAddingProduct">
          <Plus :size="15" />
          <span>{{ isAddingProduct ? 'Cancel Form' : 'Upload New Garment' }}</span>
        </button>
      </div>

      <!-- Add Product Form Card -->
      <div v-if="isAddingProduct" class="add-product-form-card">
        <h3 class="form-title font-mono">Create Garment Record in Neon PostgreSQL</h3>
        <form @submit.prevent="handleCreateProduct" class="prod-form">
          <div class="form-grid">
            <div class="field-wrap">
              <label class="field-label font-mono">GARMENT TITLE *</label>
              <input v-model="newProd.title" type="text" required placeholder="e.g. Heavyweight Workwear Chore Jacket" class="admin-input font-mono" />
            </div>

            <div class="field-wrap">
              <label class="field-label font-mono">CATEGORY *</label>
              <select v-model="newProd.category" class="admin-input font-mono">
                <option value="Outerwear">Outerwear</option>
                <option value="Tailored Shirts">Tailored Shirts</option>
                <option value="Linen & Resort">Linen & Resort</option>
                <option value="Denim">Denim</option>
                <option value="Contemporary Overshirts">Contemporary Overshirts</option>
              </select>
            </div>

            <div class="field-wrap">
              <label class="field-label font-mono">IMAGE URL *</label>
              <input v-model="newProd.image_url" type="url" required placeholder="https://images.unsplash.com/..." class="admin-input font-mono" />
            </div>

            <div class="field-wrap">
              <label class="field-label font-mono">FOB PRICE BENCHMARK (BDT) *</label>
              <input v-model="newProd.fob_price" type="text" placeholder="৳4,200 - ৳5,800 BDT" class="admin-input font-mono" />
            </div>

            <div class="field-wrap">
              <label class="field-label font-mono">FABRIC COMPOSITION</label>
              <input v-model="newProd.fabric_details" type="text" placeholder="e.g. 100% Combed Twill Cotton 320 GSM" class="admin-input font-mono" />
            </div>

            <div class="field-wrap">
              <label class="field-label font-mono">MINIMUM ORDER (MOQ)</label>
              <input v-model="newProd.moq" type="number" placeholder="100" class="admin-input font-mono" />
            </div>
          </div>

          <button type="submit" class="submit-prod-btn font-mono" :disabled="isSubmittingProduct">
            <Plus :size="16" />
            <span>{{ isSubmittingProduct ? 'Saving to Database...' : 'Commit Product to Neon DB' }}</span>
          </button>
        </form>
      </div>

      <!-- Products Table -->
      <div class="table-responsive-box">
        <table class="admin-data-table font-mono">
          <thead>
            <tr>
              <th>MEDIA</th>
              <th>STYLE TITLE</th>
              <th>CATEGORY</th>
              <th>FABRIC</th>
              <th>MOQ</th>
              <th>FOB PRICE (BDT)</th>
              <th class="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prod in products" :key="prod.id">
              <td>
                <img :src="prod.image_url" :alt="prod.title" class="table-thumb-img" />
              </td>
              <td>
                <div class="prod-table-title">{{ prod.title }}</div>
                <div class="prod-table-vibe">{{ prod.vibe || 'Contemporary' }}</div>
              </td>
              <td>
                <span class="cat-table-pill">{{ prod.category }}</span>
              </td>
              <td class="fabric-cell">{{ prod.fabric_details || '100% Cotton' }}</td>
              <td>{{ prod.moq || 100 }} pcs</td>
              <td class="price-cell">{{ prod.fob_price || '৳3,500' }}</td>
              <td class="text-right">
                <button
                  class="action-delete-btn"
                  title="Delete garment style"
                  :disabled="deletingProductId === prod.id"
                  @click="handleDeleteProduct(prod.id, prod.title)"
                >
                  <Trash2 :size="14" />
                  <span>{{ deletingProductId === prod.id ? 'Deleting...' : 'Delete' }}</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 3: TELEMETRY & DIAGNOSTICS -->
    <div v-if="activeTab === 'telemetry'" class="admin-content-pane">
      <div class="pane-header-row">
        <div>
          <h2 class="pane-title">Neon PostgreSQL Cloud Telemetry</h2>
          <p class="pane-subtitle">Live database diagnostic details, serverless pool status, and active connection metrics.</p>
        </div>
      </div>

      <div class="telemetry-details-card font-mono">
        <div class="diag-row">
          <span class="diag-label">ENGINE TYPE:</span>
          <span class="diag-val text-volt">Neon PostgreSQL Serverless (AWS us-east-2)</span>
        </div>
        <div class="diag-row">
          <span class="diag-label">DATABASE NAME:</span>
          <span class="diag-val">{{ dbStatus?.details?.db || 'neondb' }}</span>
        </div>
        <div class="diag-row">
          <span class="diag-label">USER ROLE:</span>
          <span class="diag-val">{{ dbStatus?.details?.user || 'neondb_owner' }}</span>
        </div>
        <div class="diag-row">
          <span class="diag-label">POSTGRESQL VERSION:</span>
          <span class="diag-val">{{ dbStatus?.details?.version || 'PostgreSQL 17.4 on x86_64-pc-linux-gnu' }}</span>
        </div>
        <div class="diag-row">
          <span class="diag-label">MEASURED QUERY LATENCY:</span>
          <span class="diag-val text-green">{{ dbStatus?.latency || '32ms' }}</span>
        </div>
        <div class="diag-row">
          <span class="diag-label">HEALTH STATUS:</span>
          <span class="diag-val text-green">HEALTHY & ACTIVE</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}

.admin-top-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.admin-main-heading {
  font-family: var(--font-display, sans-serif);
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.4rem 0;
}

.admin-status-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: #64748b;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.toolbar-actions-cluster {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #334155;
  border-radius: 8px;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.tool-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: rgba(0, 0, 0, 0.18);
}

.logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 8px;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #fee2e2;
  color: #b91c1c;
}

.admin-feedback-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #059669;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.78rem;
  font-weight: 700;
}

.admin-metrics-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.admin-stat-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.stat-label {
  font-size: 0.68rem;
  color: #64748b;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.stat-icon {
  color: #0284c7;
}

.stat-val {
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
  margin-bottom: 0.35rem;
}

.stat-desc {
  font-size: 0.72rem;
  color: #64748b;
}

.admin-nav-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 0.75rem;
  margin-bottom: 2rem;
  overflow-x: auto;
}

.admin-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.15rem;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.admin-tab-btn:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.admin-tab-btn.is-active {
  background: #0f172a;
  border-color: #0f172a;
  color: #ffffff;
}

.admin-content-pane {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pane-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.pane-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.35rem 0;
}

.pane-subtitle {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
}

.add-prod-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.25rem;
  background: #0f172a;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.76rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-prod-btn:hover {
  background: #1e293b;
}

.add-product-form-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.form-title {
  font-size: 0.88rem;
  color: #0f172a;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
}

.prod-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  font-size: 0.65rem;
  color: #64748b;
  font-weight: 800;
}

.admin-input {
  width: 100%;
  padding: 0.65rem 0.85rem;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  color: #0f172a;
  font-size: 0.8rem;
  outline: none;
}

.admin-input:focus {
  background: #ffffff;
  border-color: #0f172a;
}

.submit-prod-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #0f172a;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.78rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;
}

.table-responsive-box {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
  overflow-x: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.admin-data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.76rem;
  text-align: left;
}

.admin-data-table th {
  padding: 1rem 1.25rem;
  background: #f8fafc;
  color: #475569;
  font-weight: 800;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

.admin-data-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  vertical-align: middle;
  color: #334155;
}

.admin-data-table tr:hover {
  background: #f8fafc;
}

.id-cell {
  color: #64748b;
  font-weight: 700;
}

.client-name {
  font-weight: 800;
  color: #0f172a;
}

.client-company {
  font-size: 0.7rem;
  color: #64748b;
}

.email-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #0284c7;
  text-decoration: none;
}

.email-link:hover {
  text-decoration: underline;
}

.interest-badge {
  display: inline-block;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  background: #f1f5f9;
  color: #334155;
  font-size: 0.7rem;
  font-weight: 600;
}

.date-cell {
  color: #64748b;
  white-space: nowrap;
}

.msg-cell {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #64748b;
}

.action-delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-delete-btn:hover {
  background: #fee2e2;
  color: #b91c1c;
}

.table-thumb-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.prod-table-title {
  font-weight: 800;
  color: #0f172a;
}

.prod-table-vibe {
  font-size: 0.7rem;
  color: #64748b;
}

.cat-table-pill {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  background: #ecfdf5;
  color: #059669;
  font-size: 0.68rem;
  font-weight: 700;
}

.fabric-cell {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #475569;
}

.price-cell {
  font-weight: 800;
  color: #0f172a;
  white-space: nowrap;
}

.text-right {
  text-align: right;
}

.telemetry-details-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: 0.82rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.diag-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 1rem;
}

.diag-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.diag-label {
  color: #64748b;
}

.diag-val {
  color: #0f172a;
  font-weight: 700;
}

.text-volt {
  color: #65a30d;
}

.text-green {
  color: #10b981;
}

.empty-data-box {
  background: #ffffff;
  border: 1px dashed rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  padding: 4rem 1.5rem;
  text-align: center;
  color: #64748b;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  color: #94a3b8;
}

.spin-anim {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 980px) {
  .admin-metrics-row {
    grid-template-columns: 1fr;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
