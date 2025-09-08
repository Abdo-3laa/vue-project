import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Doctors from '../views/Doctors.vue'
import Booking from '../views/Booking.vue'
import MyAppointments from '../views/MyAppointments.vue'
import Contact from '../views/Contact.vue'
import DoctorLogin from '../views/DoctorLogin.vue'
import DoctorDashboard from '../views/DoctorDashboard.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/doctors', name: 'doctors', component: Doctors },
  { path: '/booking/:id', name: 'booking', component: Booking, props: true },
  { path: '/my-appointments', name: 'myAppointments', component: MyAppointments },
  { path: '/contact', name: 'contact', component: Contact },
  // اختياري
  { path: '/doctor-login', name: 'doctorLogin', component: DoctorLogin },
  { path: '/doctor-dashboard', name: 'doctorDashboard', component: DoctorDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
