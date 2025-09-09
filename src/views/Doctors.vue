<template>
  <div :class="[theme, 'min-vh-100 py-4']">
    <div class="container">
      <!-- Hero Section -->
      <div
        class="hero-section text-center py-5 mb-4"
        :class="theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'"
      >
        <h1 class="display-5 fw-bold mb-3">Find Your Trusted Doctor</h1>
        <p
          class="lead mb-0"
          :class="theme === 'dark' ? 'text-light-50' : 'text-muted'"
        >
          Browse our expert medical team and book your appointment with ease.
        </p>
      </div>

      <!-- Filters -->
      <div class="row g-3 align-items-end mb-4">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">Search</label>
          <input
            v-model="q"
            type="text"
            class="form-control"
            placeholder="Name, specialty or location..."
          />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">Specialty</label>
          <select v-model="specialty" class="form-select">
            <option v-for="s in SPECIALTIES" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div class="col-12 col-md-2 d-grid">
          <button
            class="btn btn-outline-secondary"
            @click="q = ''; specialty = 'All'; page = 1"
          >
            <i class="bi bi-x-circle me-1"></i> Clear
          </button>
        </div>
      </div>

      <!-- Doctors Grid -->
      <div class="row g-4">
        <transition-group name="fade" tag="div" class="row g-4">
          <div
            v-for="d in paged"
            :key="d.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <div class="card h-100 doctor-card shadow-sm">
              <div class="card-img-wrapper">
                <img :src="d.photo" class="card-img-top" alt="doc" />
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title mb-1 fw-bold">{{ d.name }}</h5>
                <span class="badge bg-primary-subtle text-primary mb-2">
                  <i class="bi bi-heart-pulse me-1"></i>{{ d.specialty }}
                </span>
                <p class="text-muted mb-2">
                  <i class="bi bi-geo-alt me-1"></i>{{ d.location }}
                </p>
                <div class="small text-muted mb-2">
                  <i class="bi bi-clock-history me-1"></i> Available:
                  <span class="fw-semibold">{{ d.slots.slice(0, 3).join(', ') }}</span>
                  <span v-if="d.slots.length > 3">…</span>
                </div>
                <router-link
                  :to="`/booking/${d.id}`"
                  class="btn btn-success mt-auto"
                >
                  <i class="bi bi-calendar-check me-1"></i> Book Appointment
                </router-link>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Pagination -->
      <nav class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: page === 1 }">
            <button class="page-link" @click="go(page - 1)">Prev</button>
          </li>
          <li
            v-for="p in pageCount"
            :key="p"
            class="page-item"
            :class="{ active: p === page }"
          >
            <button class="page-link" @click="go(p)">{{ p }}</button>
          </li>
          <li class="page-item" :class="{ disabled: page === pageCount }">
            <button class="page-link" @click="go(page + 1)">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { doctors, SPECIALTIES } from "../data/doctors"
import store from "../store/appointments"

const q = ref("")
const specialty = ref("All")
const page = ref(1)
const pageSize = 6

const theme = computed(() => store.theme.value)

// Helper: normalize string (remove spaces, dots, lowercase)
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "") // remove spaces
    .replace(/\./g, "") // remove dots
}

const filtered = computed(() => {
  let list = doctors

  if (specialty.value !== "All") {
    list = list.filter((d) => d.specialty === specialty.value)
  }

  if (q.value.trim()) {
    const t = normalize(q.value)
    list = list.filter((d) => {
      return (
        normalize(d.name).includes(t) ||
        normalize(d.specialty).includes(t) ||
        normalize(d.location).includes(t)
      )
    })
  }

  return list
})

const pageCount = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / pageSize))
)
const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})
const go = (p) => {
  if (p >= 1 && p <= pageCount.value) page.value = p
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background-image: linear-gradient(to right, #e0f7fa, #e0f2f1);
  border-radius: 16px;
}
.dark .hero-section {
  background-image: linear-gradient(to right, #0f172a, #1e293b);
}

/* Doctor Card Enhancements */
.doctor-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
}
.doctor-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
}
.dark .doctor-card {
  background-color: #1e293b !important;
  box-shadow: 0 16px 30px rgba(255, 255, 255, 0.05);
}

/* Image Styling */
.card-img-wrapper {
  height: 240px;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}
.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.doctor-card:hover .card-img-top {
  transform: scale(1.08);
}

/* Text & Badge */
.card-title {
  font-size: 1.1rem;
  color: #222;
}
.dark .card-title {
  color: #f1f5f9 !important;
}
.badge {
  font-size: 0.85rem;
  padding: 0.4em 0.6em;
  border-radius: 8px;
}
.text-muted,
.small {
  color: #6c757d;
}
.dark .text-muted,
.dark .small {
  color: #cbd5e1 !important;
}

/* Form Controls */
.form-control,
.form-select {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  color: #212529;
}
.dark .form-control,
.dark .form-select {
  background-color: #334155 !important;
  border: 1px solid #475569 !important;
  color: #f1f5f9 !important;
}
.dark .form-control::placeholder {
  color: #94a3b8 !important;
}

/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
