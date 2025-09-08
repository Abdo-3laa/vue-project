<template>
  <nav
    class="navbar navbar-expand-lg fixed-top transition-all duration-300"
    :class="[navClass, { scrolled: isScrolled }]"
  >
    <div class="container">
      <!-- Logo -->
      <router-link
        class="navbar-brand d-flex align-items-center fw-bold glow-text"
        to="/"
        @click="closeMenu"
      >
        <i class="bi bi-hospital me-2 text-warning fs-4"></i>
        <span class="brand-text">Care Clinic</span>
      </router-link>

      <!-- Toggler -->
      <button
        class="navbar-toggler"
        type="button"
        aria-controls="nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div id="nav" class="collapse navbar-collapse" ref="nav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="link in links" :key="link.text">
            <router-link
              class="nav-link d-flex align-items-center hover-link"
              :to="link.to"
              @click="closeMenu"
            >
              <i :class="link.icon + ' me-1'"></i> {{ link.text }}
            </router-link>
          </li>
        </ul>

        <!-- Right buttons -->
        <div class="d-flex align-items-center gap-2">
          <!-- Doctor Login -->
          <router-link
            to="/doctor-login"
            class="btn btn-outline-warning btn-sm animate-btn"
            @click="closeMenu"
          >
            <i class="bi bi-person-badge me-1"></i> Doctor Login
          </router-link>

          <!-- Theme Toggle -->
          <button
            class="btn btn-theme-toggle btn-sm animate-btn"
            @click="toggleTheme"
            :class="theme === 'dark' ? 'btn-light' : 'btn-dark'"
            :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
          >
            <i
              class="bi"
              :class="theme === 'dark' ? 'bi-brightness-high' : 'bi-moon-stars'"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import store from "../store/appointments";
import { computed, ref, onMounted, onUnmounted } from "vue";
import * as bootstrap from "bootstrap";

// Theme
const theme = computed(() => store.theme.value);
const toggleTheme = () => store.toggleTheme();

// Navbar theme
const navClass = computed(() =>
  theme.value === "dark"
    ? "navbar-dark bg-dark shadow-sm backdrop-blur"
    : "navbar-light bg-white shadow-sm backdrop-blur"
);

// Scroll effect
const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

// Collapse logic
const nav = ref(null);
let collapseInstance = null;

onMounted(() => {
  if (nav.value) {
    collapseInstance = bootstrap.Collapse.getOrCreateInstance(nav.value, {
      toggle: false,
    });
  }
});

const toggleMenu = () => {
  if (collapseInstance) {
    collapseInstance.toggle();
  }
};

const closeMenu = () => {
  if (collapseInstance && nav.value.classList.contains("show")) {
    collapseInstance.hide();
  }
};

// Links
const links = [
  { to: "/", text: "Home", icon: "bi bi-house-door" },
  { to: "/doctors", text: "Doctors", icon: "bi bi-person-lines-fill" },
  { to: "/my-appointments", text: "My Appointments", icon: "bi bi-calendar-check" },
  { to: "/contact", text: "Contact", icon: "bi bi-envelope" },
];
</script>

<style scoped>
/* Glow effect for brand name */
.glow-text {
  color: #ffc107;
  transition: all 0.3s ease-in-out;
}
.navbar-dark .glow-text {
  text-shadow: 0 0 8px #ffc107;
}
.navbar-light .glow-text {
  text-shadow: 0 0 6px #ffeb3b;
}

/* Hover effect with glowing box */
.hover-link {
  transition: all 0.3s ease;
  padding: 6px 10px;
  border-radius: 6px;
  position: relative;
}

.navbar-light .hover-link:hover {
  border: 2px solid #ffc107;
  background-color: #fff8e1;
  box-shadow: 0 0 10px #ffc107;
}

.navbar-dark .hover-link:hover {
  border: 2px solid #ffca2c;
  background-color: #343a40;
  box-shadow: 0 0 10px #ffca2c;
}

/* Animate buttons */
.animate-btn {
  transition: all 0.3s ease-in-out;
}
.animate-btn:hover {
  transform: scale(1.05);
}
</style>
