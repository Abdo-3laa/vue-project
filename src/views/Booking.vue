<template>
  <div :class="[theme, 'min-vh-100 py-4']">
    <div v-if="doc" class="container">
      <!-- Doctor Card -->
      <div class="card doctor-card shadow-lg border-0 mb-4 p-3">
        <div class="d-flex gap-3 align-items-center">
          <img :src="doc.photo" alt="doctor"
               class="rounded-3 border shadow-sm"
               style="width:100px; height:100px; object-fit:cover;">
          <div>
            <h4 class="mb-1 fw-bold text-primary">
              <i class="bi bi-person-badge-fill me-2 text-warning"></i>{{ doc.name }}
            </h4>
            <div class="text-muted">
              <i class="bi bi-heart-pulse me-1 text-danger"></i>{{ doc.specialty }}
            </div>
            <div class="small text-muted">
              <i class="bi bi-geo-alt me-1 text-secondary"></i>{{ doc.location }}
            </div>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="success" class="alert alert-success d-flex align-items-center" role="alert">
        <i class="bi bi-check-circle-fill me-2"></i>
        Appointment booked successfully!
      </div>

      <!-- Booking Form -->
      <div class="card booking-card shadow-sm border-0">
        <div class="card-body">
          <h5 class="mb-3 fw-bold">
            <i class="bi bi-calendar2-check me-1 text-success"></i> Book Appointment
          </h5>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold">👤 Patient Name</label>
              <input v-model.trim="name" class="form-control" placeholder="Your full name" required>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">📞 Phone</label>
              <input v-model.trim="phone" class="form-control" placeholder="+20 1X XXX XXXX" required>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">📧 Email</label>
              <input v-model.trim="email" type="email" class="form-control" placeholder="you@email.com" required>
            </div>
            <div class="col-md-3">
              <label class="form-label fw-semibold">📅 Date</label>
              <input v-model="date" type="date" class="form-control" required>
            </div>
            <div class="col-md-3">
              <label class="form-label fw-semibold">⏰ Time</label>
              <select v-model="time" class="form-select" required>
                <option disabled value="">Select time</option>
                <option v-for="t in doc.slots" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
          </div>

          <!-- Buttons -->
          <div class="mt-4 d-flex gap-2 flex-wrap">
            <button class="btn btn-success px-4" @click="submit">
              <i class="bi bi-check2-circle me-1"></i> Confirm Booking
            </button>
            <router-link class="btn btn-outline-secondary" :to="{ name: 'doctors' }">
              <i class="bi bi-arrow-left me-1"></i> Back to Doctors
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-danger mt-5 container">
      <i class="bi bi-exclamation-triangle-fill me-1"></i> Doctor not found.
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { doctors } from '../data/doctors'
import store from '../store/appointments'

const route = useRoute()
const router = useRouter()

const doc = computed(() => doctors.find(d => d.id === Number(route.params.id)))
const theme = computed(() => store.theme.value)

const name = ref('')
const phone = ref('')
const email = ref('')
const date = ref('')
const time = ref('')
const success = ref(false)

const getAppointments = () => JSON.parse(localStorage.getItem('appointments') || '[]')
const saveAppointments = (appointments) => localStorage.setItem('appointments', JSON.stringify(appointments))

const submit = () => {
  if (!doc.value) return
  if (!name.value || !phone.value || !email.value || !date.value || !time.value) {
    success.value = false
    alert('⚠️ Please fill all fields!')
    return
  }

  const newAppointment = {
    id: Date.now(),
    doctorId: doc.value.id,
    doctorName: doc.value.name,
    specialty: doc.value.specialty,
    location: doc.value.location,
    doctorPhoto: doc.value.photo,
    patientName: name.value,
    phone: phone.value,
    email: email.value,
    date: date.value,
    time: time.value,
    confirmed: false
  }

  const appointments = getAppointments()
  appointments.push(newAppointment)
  saveAppointments(appointments)

  success.value = true

  name.value = ''
  phone.value = ''
  email.value = ''
  date.value = ''
  time.value = ''
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
.form-label {
  font-size: 0.9rem;
}

/* Dark Mode */
.dark .card {
  background-color: #1e293b !important;
  color: #f8f9fa !important;
}
.dark .form-control,
.dark .form-select {
  background-color: #334155 !important;
  border: 1px solid #475569;
  color: #f1f5f9 !important;
}
.dark .form-control::placeholder {
  color: #94a3b8 !important;
}
.dark .form-label,
.dark h5,
.dark h4 {
  color: #f1f5f9 !important;
}
.dark .alert-success {
  background-color: #14532d !important;
  border-color: #166534 !important;
  color: #bbf7d0 !important;
}
.dark .alert-danger {
  background-color: #450a0a !important;
  border-color: #7f1d1d !important;
  color: #fecaca !important;
}
</style>
