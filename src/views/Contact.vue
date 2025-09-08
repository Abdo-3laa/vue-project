<template>
  <div :class="theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'" class="py-5">
    <div class="container">
      <!-- Header -->
      <div class="text-center mb-5">
        <span class="badge bg-success mb-2">💬 Reach Us</span>
        <h2 class="fw-bold mb-2">Connect with Our Premium Team</h2>
        <p :class="theme === 'dark' ? 'text-light-50' : 'text-muted'">
          Reach out to our elite healthcare experts for tailored guidance and consultations.
        </p>
        <div class="d-flex justify-content-center gap-4 mt-3">
          <div class="text-center">
            <div class="fs-4 fw-bold text-success">&lt;12h</div>
            <small :class="theme === 'dark' ? 'text-light-50' : 'text-muted'">Avg Response</small>
          </div>
          <div class="text-center">
            <div class="fs-4 fw-bold text-info">24/7</div>
            <small :class="theme === 'dark' ? 'text-light-50' : 'text-muted'">Availability</small>
          </div>
          <div class="text-center">
            <div class="fs-4 fw-bold text-warning">100%</div>
            <small :class="theme === 'dark' ? 'text-light-50' : 'text-muted'">Secure</small>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Left Info Card -->
        <div class="col-12 col-md-6">
          <div :class="theme === 'dark' ? 'bg-dark-card' : 'bg-white'" class="shadow rounded p-4 h-100 info-card">
            <h4 class="mb-4">
              <i class="bi bi-telephone-fill me-2 text-primary"></i> Contact Details
            </h4>

            <div
              v-for="item in infoItems"
              :key="item.title"
              :class="theme === 'dark' ? 'bg-dark-item' : 'bg-light-item'"
              class="p-3 rounded mb-3 d-flex align-items-start gap-3 shadow-sm hover-card"
            >
              <div class="fs-3">{{ item.icon }}</div>
              <div>
                <strong>{{ item.title }}</strong>
                <div :class="theme === 'dark' ? 'text-light-50' : 'text-muted'">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Form Card -->
        <div class="col-12 col-md-6">
          <div :class="theme === 'dark' ? 'bg-dark-card' : 'bg-white'" class="shadow rounded p-4 h-100 form-card">
            <h4 class="mb-4">
              <i class="bi bi-envelope-fill me-2 text-primary"></i> Request Consultation
            </h4>
            <p :class="theme === 'dark' ? 'text-light-50' : 'text-muted'" class="mb-4">
              Send us your inquiry and get personalized medical advice.
            </p>

            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label"><i class="bi bi-person-fill me-1"></i> Full Name *</label>
                  <input v-model="form.name" type="text" name="name" class="form-control" placeholder="John Doe" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label"><i class="bi bi-envelope-fill me-1"></i> Email *</label>
                  <input v-model="form.email" type="email" name="email" class="form-control" placeholder="email@example.com" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label"><i class="bi bi-telephone-fill me-1"></i> Phone (Optional)</label>
                  <input v-model="form.phone" type="tel" name="phone" class="form-control" placeholder="+1 555 123 4567" />
                </div>
                <div class="col-md-6">
                  <label class="form-label"><i class="bi bi-tag-fill me-1"></i> Subject *</label>
                  <select v-model="form.subject" name="subject" class="form-select" required>
                    <option value="">Select a topic</option>
                    <option value="Appointment">Appointment</option>
                    <option value="Medical Inquiry">Medical Inquiry</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label"><i class="bi bi-chat-dots-fill me-1"></i> Message *</label>
                  <textarea v-model="form.message" name="message" rows="5" class="form-control" placeholder="Your detailed inquiry..." required></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary w-100">Send Message</button>
                </div>
              </div>
            </form>

            <!-- Success Message -->
            <div v-if="success" class="alert alert-success mt-4" role="alert">
              ✅ Your message has been sent successfully. We'll get back to you soon!
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
              ❌ {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import store from '../store/appointments'

const theme = computed(() => store.theme.value)

const infoItems = [
  { icon: '📞', title: '24/7 Support', desc: '+1 (555) 123-4567 – Always available' },
  { icon: '✉️', title: 'Email', desc: 'Care Clinic@medicare.com – Secure & confidential' },
  { icon: '📍', title: 'Location', desc: 'Care Clinic Medical Center, 123 Prestige Blvd' },
  { icon: '⏰', title: 'Hours', desc: 'Mon-Fri: 7AM-9PM, Weekends: 8AM-6PM' },
  { icon: '⚠️', title: 'Medical Emergency', desc: 'Call 911 immediately for urgent care' },
]

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const success = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  success.value = false
  errorMessage.value = ''

  try {
    const response = await fetch('https://formspree.io/f/mgvlrkql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      success.value = true
      form.value = { name: '', email: '', phone: '', subject: '', message: '' }
    } else {
      errorMessage.value = 'Something went wrong. Please try again later.'
    }
  } catch (error) {
    errorMessage.value = 'Network error. Please check your connection.'
  }
}
</script>

<style scoped>
.bg-white {
  background-color: #ffffff;
}
.bg-dark-card {
  background-color: #0b1e2d;
}
.bg-dark-item {
  background-color: #132d42;
}
.bg-light-item {
  background-color: #f8f9fa;
}
.shadow {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
.text-light-50 {
  color: rgba(255, 255, 255, 0.65) !important;
}
.rounded {
  border-radius: 12px;
}
.form-control,
.form-select {
  background-color: #f8f9fa;
  color: #212529;
  border: 1px solid #ced4da;
}
.bg-dark .form-control,
.bg-dark .form-select {
  background-color: #1c2b3b;
  color: #fff;
  border: 1px solid #3a4a5a;
}
.btn-primary {
  background-color: #0066cc;
  border: none;
  transition: background-color 0.3s;
}
.btn-primary:hover {
  background-color: #005bb5;
}
.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
