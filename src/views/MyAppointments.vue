<template>
  <div :class="theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'" class="min-vh-100 py-5">
    <div class="container">

      <!-- Header -->
      <div class="text-center mb-4">
        <h1 class="fw-bold mb-1">
          <i class="bi bi-calendar2-check-fill text-primary me-2"></i>
          My Appointments
        </h1>
        <p class="mb-0" :class="theme === 'dark' ? 'text-light-50' : 'text-muted'">
          Track and manage your healthcare consultations with ease
        </p>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-4">
          <div :class="cardClass" class="p-3 text-center h-100 stat-card">
            <div class="fs-4 mb-2"><i class="bi bi-list-check"></i></div>
            <div class="small">Total Appointments</div>
            <div class="h4 fw-bold">{{ total }}</div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div :class="cardClass" class="p-3 text-center h-100 stat-card">
            <div class="fs-4 mb-2"><i class="bi bi-check2-circle"></i></div>
            <div class="small">Confirmed</div>
            <div class="h4 fw-bold">{{ confirmedCount }}</div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div :class="cardClass" class="p-3 text-center h-100 stat-card">
            <div class="fs-4 mb-2"><i class="bi bi-clock-history"></i></div>
            <div class="small">Upcoming</div>
            <div class="h4 fw-bold">{{ upcomingCount }}</div>
          </div>
        </div>
      </div>

      <!-- Appointments List -->
      <div v-if="appointments.length" class="mb-5">
        <div class="row g-4">
          <div v-for="(appt, idx) in appointments" :key="appt.id || idx" class="col-12">
            <div :class="cardClass" class="p-3 d-flex flex-column flex-md-row gap-3 align-items-start appointment-card">
              
              <!-- Doctor Image -->
              <img v-if="appt.doctorPhoto" 
                   :src="appt.doctorPhoto" 
                   alt="doctor"
                   class="rounded-circle border shadow-sm"
                   style="width:64px; height:64px; object-fit:cover;">
              
              <div class="d-flex align-items-center gap-3 flex-grow-1">
                <div>
                  <h5 class="mb-1 fw-semibold">{{ appt.doctorName }}</h5>
                  <div class="small mb-1">
                    <i class="bi bi-geo-alt me-1"></i> 
                    {{ appt.specialty || '—' }} • {{ appt.location || '—' }}
                  </div>
                  <div class="small">
                    <i class="bi bi-calendar-event me-1"></i> {{ formatDate(appt.date) }}
                    &nbsp; • &nbsp;
                    <i class="bi bi-clock me-1"></i> {{ appt.time }}
                    <span v-if="isUpcoming(appt.date)" class="badge bg-success">Upcoming</span>
                    <span v-else class="badge bg-secondary">Past</span>
                  </div>
                </div>
              </div>

              <div class="d-flex gap-2 align-items-center flex-wrap">
                <button
                  class="btn btn-outline-success btn-sm"
                  :disabled="appt.confirmed"
                  @click="confirmAppointment(idx)"
                >
                  <i class="bi bi-check2 me-1"></i>
                  {{ appt.confirmed ? 'Confirmed' : 'Confirm' }}
                </button>

                <!-- Cancel -->
                <button
                  class="btn btn-danger btn-sm"
                  @click="openCancelModal(idx)"
                >
                  <i class="bi bi-x-circle me-1"></i> Cancel
                </button>

                <!-- Details -->
                <button
                  class="btn btn-info btn-sm text-light"
                  @click="showDetails(appt)"
                >
                  <i class="bi bi-info-circle me-1"></i> Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-5">
        <div class="mb-3">
          <i class="bi bi-calendar-x fs-1 text-muted"></i>
        </div>
        <h4 class="fw-semibold">No Appointments Found</h4>
        <p class="mb-3 text-muted">
          You haven't booked any appointments yet. Start by finding a specialist that meets your healthcare needs.
        </p>
        <router-link to="/doctors" class="btn btn-primary">
          <i class="bi bi-search-heart me-1"></i> Find Doctors
        </router-link>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div class="modal fade" tabindex="-1" ref="cancelModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" :class="theme === 'dark' ? 'bg-dark text-light' : ''">
          <div class="modal-header">
            <h5 class="modal-title text-danger">
              <i class="bi bi-exclamation-triangle me-2"></i> Confirm Cancel
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to cancel this appointment?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button class="btn btn-danger" @click="confirmCancel">Yes, Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div class="modal fade" tabindex="-1" ref="detailsModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" :class="theme === 'dark' ? 'bg-dark text-light' : ''">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-info-circle me-2"></i> Appointment Details
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="selectedAppt">
            <div class="text-center mb-3">
              <img v-if="selectedAppt.doctorPhoto"
                   :src="selectedAppt.doctorPhoto"
                   class="rounded-circle border shadow-sm"
                   style="width:80px; height:80px; object-fit:cover;">
            </div>
            <p><strong>Doctor:</strong> {{ selectedAppt.doctorName }} ({{ selectedAppt.specialty }})</p>
            <p><strong>Location:</strong> {{ selectedAppt.location }}</p>
            <p><strong>Date:</strong> {{ formatDate(selectedAppt.date) }} at {{ selectedAppt.time }}</p>
            <hr>
            <p><strong>Patient:</strong> {{ selectedAppt.patientName }}</p>
            <p><strong>Phone:</strong> {{ selectedAppt.phone }}</p>
            <p><strong>Email:</strong> {{ selectedAppt.email }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import store from '../store/appointments'
import 'bootstrap/dist/js/bootstrap.bundle'

const appointments = ref([])
const selectedAppt = ref(null)
const detailsModal = ref(null)
const cancelModal = ref(null)

let detailsInstance = null
let cancelInstance = null
const cancelIndex = ref(null)

onMounted(() => {
  try {
    appointments.value = JSON.parse(localStorage.getItem('appointments') || '[]')
  } catch (e) {
    appointments.value = []
  }

  if (detailsModal.value) {
    detailsInstance = new bootstrap.Modal(detailsModal.value)
  }
  if (cancelModal.value) {
    cancelInstance = new bootstrap.Modal(cancelModal.value)
  }
})

const save = () => {
  localStorage.setItem('appointments', JSON.stringify(appointments.value))
}

function openCancelModal(index) {
  cancelIndex.value = index
  cancelInstance.show()
}

function confirmCancel() {
  if (cancelIndex.value !== null) {
    appointments.value.splice(cancelIndex.value, 1)
    save()
  }
  cancelInstance.hide()
}

function confirmAppointment(index) {
  const appt = appointments.value[index]
  if (!appt) return
  appt.confirmed = true
  save()
}

function showDetails(appt) {
  selectedAppt.value = appt
  detailsInstance.show()
}

const theme = computed(() => store.theme.value)

const total = computed(() => appointments.value.length)
const confirmedCount = computed(() => appointments.value.filter(a => a.confirmed).length)
const upcomingCount = computed(() => appointments.value.filter(a => isUpcoming(a.date)).length)

function isUpcoming(dateStr) {
  if (!dateStr) return false
  const apptDate = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0,0,0,0)
  return apptDate >= today
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch (e) {
    return dateStr
  }
}
</script>

<style scoped>
.stat-card, .appointment-card {
  border-radius: 12px;
  transition: transform .25s ease, box-shadow .25s ease;
}
.stat-card:hover, .appointment-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
}
</style>
