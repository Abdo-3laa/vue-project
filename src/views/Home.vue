<template>
  <div>
    <!-- Hero Section -->
    <section
      class="hero d-flex align-items-center position-relative"
      :class="theme === 'dark' ? 'hero-dark' : 'hero-light'"
    >
      <!-- Overlay -->
      <div class="overlay"></div>

      <div class="container position-relative">
        <div class="row align-items-center">
          <!-- Text Content -->
          <div
            class="col-md-6 d-flex flex-column justify-content-center align-items-center text-center animate-text"
          >
            <h1 class="fw-bold display-4 text-light">
              Best Caring, <span class="text-warning">Better Doctors</span>
            </h1>
            <p class="lead mt-3 text-light">
              Expert doctors, modern facilities, and compassionate care for every patient.
            </p>
            <div class="mt-4">
              <router-link to="/doctors" class="btn btn-warning btn-lg me-2 shadow animate-btn">
                Book Appointment
              </router-link>
              <a href="#departments" class="btn btn-outline-light btn-lg shadow animate-btn">
                Learn More
              </a>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="col-md-6 text-center py-4 animate-img">
            <img
              src="/images/doctor.png"
              alt="Doctor"
              class="img-fluid hero-img glow-border"
              :class="theme === 'dark' ? 'glow-dark' : 'glow-light'"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- باقي الصفحة -->
    <div class="container mt-5">
      <!-- Departments -->
      <section
        id="departments"
        class="py-5"
        :class="theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'"
      >
        <div class="text-center">
          <h2 class="fw-bold mb-4">Extra Ordinary Health Solutions</h2>
          <div class="row g-4">
            <div class="col-md-3" v-for="(dept, i) in departments" :key="i">
              <div
                class="card h-100 shadow-sm p-3"
                :class="theme === 'dark' ? 'bg-secondary text-light' : 'bg-white text-dark'"
              >
                <img :src="dept.img" :alt="dept.title" class="card-img-top w-50 mx-auto" />
                <h5 class="mt-3">{{ dept.title }}</h5>
                <p class="small">{{ dept.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Us -->
      <section class="py-5" :class="theme === 'dark' ? 'bg-dark text-light' : 'bg-white text-dark'">
        <div class="text-center">
          <h2 class="fw-bold mb-4">We Are Best Professional in Medical Sectors</h2>
          <div class="row align-items-center">
            <div class="col-md-6 animate-img">
              <img src="/images/team.png" alt="Team" class="img-fluid rounded shadow" />
            </div>
            <div class="col-md-6 animate-text">
              <h4 class="fw-bold">Why Choose Us?</h4>
              <p>Our doctors and staff are highly skilled and provide personalized patient care.</p>
              <ul class="list-unstyled text-start d-inline-block">
                <li>✔ 24/7 Emergency Services</li>
                <li>✔ Skilled Medical Professionals</li>
                <li>✔ Advanced Medical Equipment</li>
                <li>✔ Patient-Centered Approach</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section
        class="py-5"
        :class="theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark'"
      >
        <div class="text-center">
          <h2 class="fw-bold mb-5">What Our Patients Say</h2>
          <div class="row g-4 justify-content-center">
            <div class="col-md-4" v-for="(t, i) in testimonials" :key="i">
              <div
                class="card shadow-sm border-0 h-100 position-relative pt-5"
                :class="theme === 'dark' ? 'bg-dark text-light' : 'bg-white text-dark'"
              >
                <div class="position-absolute top-0 start-50 translate-middle">
                  <img
                    :src="t.img"
                    alt="patient"
                    class="rounded-circle border border-3 border-white shadow"
                    width="80"
                    height="80"
                  />
                </div>
                <div class="card-body mt-4">
                  <p class="fst-italic">"{{ t.text }}"</p>
                  <h6 class="fw-bold mb-0">{{ t.name }}</h6>
                  <small>{{ t.role }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- How It Works Section -->
    <section
      id="how-it-works"
      class="py-5"
      :class="theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'"
    >
      <div class="container text-center">
        <h2 class="fw-bold mb-5">How It Works</h2>
        <p class="mb-4 lead">
          Simple steps to book your appointment
        </p>
        <div class="row g-4">
          <!-- Step 1 -->
          <div class="col-md-4">
            <div
              class="card h-100 shadow-sm border-0 text-center p-4"
              :class="theme === 'dark' ? 'bg-secondary text-light' : 'bg-white text-dark'"
            >
              <div class="mb-3">
                <i class="bi bi-search fs-1 text-warning"></i>
              </div>
              <h5 class="fw-bold">Search & Find</h5>
              <p class="small">
                Search for doctors by specialty, location, or name.  
                View their profiles, ratings, and available time slots.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="col-md-4">
            <div
              class="card h-100 shadow-sm border-0 text-center p-4"
              :class="theme === 'dark' ? 'bg-secondary text-light' : 'bg-white text-dark'"
            >
              <div class="mb-3">
                <i class="bi bi-calendar-check fs-1 text-success"></i>
              </div>
              <h5 class="fw-bold">Book Appointment</h5>
              <p class="small">
                Select your preferred date and time.  
                Fill in your details and confirm your appointment.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="col-md-4">
            <div
              class="card h-100 shadow-sm border-0 text-center p-4"
              :class="theme === 'dark' ? 'bg-secondary text-light' : 'bg-white text-dark'"
            >
              <div class="mb-3">
                <i class="bi bi-bell fs-1 text-primary"></i>
              </div>
              <h5 class="fw-bold">Get Confirmed</h5>
              <p class="small">
                Receive confirmation and reminders.  
                Manage all your appointments in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    
  </div>
  
</template>

<script setup>
import store from "../store/appointments";
import { computed } from "vue";

const theme = computed(() => store.theme.value);

const departments = [
  { img: "/images/ortho.png", title: "Orthopedic Care", desc: "Best bone & joint treatments." },
  { img: "/images/dentist.png", title: "Dentistry", desc: "Quality dental care services." },
  { img: "/images/neuro.png", title: "Neurology", desc: "Brain & nerve specialists." },
  { img: "/images/cardio.png", title: "Cardiology", desc: "Heart care experts." },
];

const testimonials = [
  {
    text: "Amazing doctors, very professional and kind!",
    name: "Sarah Ali",
    role: "Patient",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "The staff was so helpful and friendly!",
    name: "Omar Hassan",
    role: "Patient",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "Best medical experience I ever had!",
    name: "Mona Adel",
    role: "Patient",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];
</script>

<style scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 80px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0 0 30px 30px;
  position: relative;
  overflow: hidden;
}
.hero-light {
  background-image: url("https://media.istockphoto.com/id/1447388979/vector/modern-blue-medical-technology-background-vector-polygon-pattern.jpg?s=612x612&w=0&k=20&c=GsfF2ldGnhFvhcMoRrsSgbhQAy8Bdy9h4QPMSeZFsoo=");
}
.hero-dark {
  background-image: url("data:image/jpeg;base64,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");
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}
.container {
  position: relative;
  z-index: 2;
}
.hero-img {
  max-height: 400px;
  object-fit: contain;
  border-radius: 20px;
}
.glow-border {
  border: 5px solid transparent;
  border-radius: 20px;
  transition: box-shadow 0.3s ease-in-out;
}
.glow-light {
  box-shadow: 0 0 20px 5px rgba(255, 193, 7, 0.7),
    0 0 40px 10px rgba(255, 193, 7, 0.5);
}
.glow-light:hover {
  box-shadow: 0 0 25px 8px rgba(255, 193, 7, 1),
    0 0 50px 15px rgba(255, 193, 7, 0.8);
}
.glow-dark {
  box-shadow: 0 0 20px 5px rgba(13, 202, 240, 0.7),
    0 0 40px 10px rgba(13, 202, 240, 0.5);
}
.glow-dark:hover {
  box-shadow: 0 0 25px 8px rgba(13, 202, 240, 1),
    0 0 50px 15px rgba(13, 202, 240, 0.8);
}
.card {
  border: none;
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* أنيميشن */
.animate-text {
  animation: fadeInUp 1s ease forwards;
}
.animate-img {
  animation: fadeInRight 1.2s ease forwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-btn {
  transition: all 0.3s ease;
}
.animate-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(255, 193, 7, 0.6);
}
</style>
