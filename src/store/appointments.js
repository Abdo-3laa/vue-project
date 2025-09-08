import { reactive, watch, computed } from 'vue'

// mock persistence helpers
const LS_KEY = 'appointments_v1'
const load = () => JSON.parse(localStorage.getItem(LS_KEY) || '[]')
const save = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data))

const state = reactive({
  appointments: load(),    // [{id, doctorId, doctorName, specialty, patientName, phone, email, date, time}]
  theme: localStorage.getItem('theme') || 'light', // light | dark
})

watch(() => state.appointments, (v) => save(v), { deep: true })
watch(() => state.theme, (t) => {
  localStorage.setItem('theme', t)
  document.documentElement.setAttribute('data-theme', t)
  document.body.classList.toggle('bg-dark', t === 'dark')
  document.body.classList.toggle('text-light', t === 'dark')
}, { immediate: true })

let idCounter = Date.now()

export default {
  state,
  theme: computed(() => state.theme),
  toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
  },
  addAppointment(app) {
    state.appointments.push({ id: ++idCounter, ...app })
  },
  removeAppointment(id) {
    state.appointments = state.appointments.filter(a => a.id !== id)
  },
  all: computed(() => state.appointments),
}
