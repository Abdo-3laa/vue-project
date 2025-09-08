<template>
  <footer
    class="footer pt-5 pb-4"
    :class="theme === 'dark' ? 'bg-dark text-light border-top border-secondary' : 'bg-white text-dark border-top'"
  >
    <div class="container">
      <div class="row gy-4">
        <!-- Brand Section -->
        <div class="col-lg-4 col-md-6">
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-hospital fs-2 text-warning me-2"></i>
            <h5 class="mb-0 fw-bold brand-glow">Care Clinic</h5>
          </div>
          <p class="small">
            Providing compassionate care, expert doctors, and modern facilities
            to keep you and your family healthy.
          </p>

          <!-- Social Icons -->
          <div class="d-flex gap-2 mt-3">
            <a href="#" class="btn btn-outline-warning btn-sm rounded-circle glow-icon">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="btn btn-outline-warning btn-sm rounded-circle glow-icon">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="#" class="btn btn-outline-warning btn-sm rounded-circle glow-icon">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="btn btn-outline-warning btn-sm rounded-circle glow-icon">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <!-- Links Sections -->
        <div class="col-lg-2 col-md-6" v-for="section in sections" :key="section.title">
          <h6 class="fw-bold mb-3">{{ section.title }}</h6>
          <ul class="list-unstyled">
            <li v-for="link in section.links" :key="link">
              <a href="#" class="footer-link glow-hover">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-4" :class="theme === 'dark' ? 'border-secondary' : 'border-muted'" />

      <!-- Bottom Row -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p class="mb-2 mb-md-0 small">
          © 2025 Care Clinic. All rights reserved.
        </p>
        <small>Made With ❤ Abdelrahman Alaa</small>
        <div class="d-flex align-items-center gap-3">
          <span class="small">We Accept:</span>
          <i class="bi bi-credit-card fs-5"></i>
          <i class="bi bi-paypal fs-5"></i>
          <i class="bi bi-apple fs-5"></i>
          <i class="bi bi-google fs-5"></i>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue"
import store from "../store/appointments"

const theme = computed(() => store.theme.value)

const sections = [
  {
    title: "SERVICES",
    links: ["Appointments", "Emergency Care", "Pharmacy", "Lab Tests"]
  },
  {
    title: "DOCTORS",
    links: ["Our Doctors", "Specialties", "Departments", "Book Online"]
  },
  {
    title: "SUPPORT",
    links: ["FAQs", "Contact Us", "Insurance", "Patient Rights"]
  },
  {
    title: "LEGAL",
    links: ["Privacy Policy", "Terms & Conditions", "Medical Disclaimer", "Cookies"]
  }
]
</script>

<style scoped>
/* Brand Glow */
.brand-glow {
  color: var(--bs-warning);
  text-shadow: 0 0 8px rgba(255, 193, 7, 0.7), 0 0 16px rgba(255, 193, 7, 0.4);
}

/* Footer Links */
.footer-link {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 4px 6px;
  border-radius: 6px;
  display: inline-block;
}

/* Hover glow effect */
.glow-hover:hover {
  border: 1px solid var(--bs-warning);
  box-shadow: 0 0 8px var(--bs-warning);
  background-color: rgba(255, 193, 7, 0.1);
  color: var(--bs-warning) !important;
}

/* Social Icons glow */
.glow-icon:hover {
  box-shadow: 0 0 10px var(--bs-warning);
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}
</style>
