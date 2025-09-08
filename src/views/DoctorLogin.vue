<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import store from "../store/appointments";

const router = useRouter();
const email = ref("");
const password = ref("");
const keepSignedIn = ref(false);

const theme = computed(() => store.theme.value);

const login = () => {
  if (
    (email.value === "doctor" && password.value === "1234") ||
    (email.value === "doctor@demo.com" && password.value === "demo123")
  ) {
    router.push("/doctor-dashboard");
  } else {
    alert("Invalid credentials (hint: doctor / 1234 or demo credentials)");
  }
};
</script>

<template>
  <div class="doctor-login-page">
    <!-- Hero Section -->
    <section
      class="hero-section text-center py-5"
      :class="theme === 'dark' ? 'hero-dark' : 'hero-light'"
    >
      <div class="container">
        <h2 class="fw-bold mb-1">
          <i class="bi bi-person-badge text-warning me-2"></i> Doctor Access
        </h2>
        <p class="fs-5">Elite Physician Portal</p>
        <p>
          Access your premium practice dashboard with secure authentication
        </p>

        <div
          class="features d-flex justify-content-center text-center mb-4 flex-wrap gap-4 mt-4"
        >
          <div class="feature-item">
            <i class="bi bi-lock-fill fs-2 text-primary mb-1"></i>
            <p class="mb-0 fw-semibold">Secure Login</p>
          </div>
          <div class="feature-item">
            <i class="bi bi-lightning-fill fs-2 text-warning mb-1"></i>
            <p class="mb-0 fw-semibold">Fast Access</p>
          </div>
          <div class="feature-item">
            <i class="bi bi-shield-lock-fill fs-2 text-success mb-1"></i>
            <p class="mb-0 fw-semibold">Protected</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Login Card -->
    <div
      class="d-flex align-items-center justify-content-center px-3 pb-5 "
      style="margin-top: 3rem"
    >
      <div
        class="card shadow-sm p-4 login-card"
        :class="theme === 'dark' ? 'card-dark' : 'card-light'"
      >
        <form @submit.prevent="login" class="login-form">
          <h5 class="mb-3 fw-semibold">Secure Login</h5>
          <p class="mb-4">
            Enter your credentials to access your dashboard
          </p>

          <div class="mb-3">
            <label for="email" class="form-label fw-semibold">Email Address *</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="form-control"
              :class="theme === 'dark' ? 'input-dark' : ''"
              placeholder="doctor@healthcare.com"
              required
              autocomplete="username"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label fw-semibold">Password *</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="form-control"
              :class="theme === 'dark' ? 'input-dark' : ''"
              placeholder="Enter your secure password"
              required
              autocomplete="current-password"
            />
          </div>

          <div class="form-check mb-4">
            <input
              class="form-check-input"
              type="checkbox"
              id="keepSignedIn"
              v-model="keepSignedIn"
              :class="theme === 'dark' ? 'bg-dark border-secondary' : ''"
            />
            <label class="form-check-label" for="keepSignedIn">
              Keep me signed in for 30 days
            </label>
          </div>

          <button type="submit" class="btn btn-primary w-100 mb-3">
            Access Elite Dashboard
          </button>
        </form>

        <!-- Demo credentials -->
        <div
          class="demo-credentials p-3 rounded-3 text-center"
          :class="theme === 'dark' ? 'demo-dark' : 'demo-light'"
        >
          <h6 class="fw-semibold mb-2">Demo Credentials</h6>
          <p class="mb-1">Use these credentials to test the doctor dashboard:</p>
          <p class="mb-0"><strong>Email:</strong> doctor@demo.com</p>
          <p><strong>Password:</strong> demo123</p>
        </div>

        <div class="text-center mt-3">
          <a href="#" class="text-decoration-none">Forgot your password?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hero */
.hero-light {
  background: linear-gradient(90deg, #0d6efd, #0dcaf0);
  color: #fff;
  border-radius: 0 0 30px 30px;
}
.hero-dark {
  background: linear-gradient(90deg, #212529, #343a40);
  color: #f8f9fa;
  border-radius: 0 0 30px 30px;
}

/* Cards */
.card-light {
  background-color: #fff !important;
  color: #212529 !important;
}
.card-dark {
  background-color: #2c2c2c !important;
  color: #f8f9fa !important;
  border: 1px solid #444;
}

/* Inputs */
.input-dark {
  background-color: #1e1e1e !important;
  color: #f8f9fa !important;
  border: 1px solid #555 !important;
}
.input-dark::placeholder {
  color: #aaa !important;
}

/* Demo box */
.demo-light {
  background-color: #f8f9fa !important;
  color: #212529 !important;
}
.demo-dark {
  background-color: #1e1e1e !important;
  color: #f8f9fa !important;
}
</style>
