<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
    <div class="w-full max-w-2xl">
      <h1 class="text-3xl font-bold mb-4 text-center text-blue-700 dark:text-blue-400">Doctor Dashboard</h1>
      <p class="mb-6 text-center text-gray-600 dark:text-gray-300">Here you can see all booked appointments.</p>

      <div v-if="appointments.length" class="grid grid-cols-1 gap-6">
        <div
          v-for="(appt, index) in appointments"
          :key="index"
          class="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] p-6"
        >
          <p class="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
            👤 <span class="text-blue-700 dark:text-blue-400">Patient:</span> {{ appt.patientName }}
          </p>
          <p class="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
            🩺 <span class="text-blue-700 dark:text-blue-400">Doctor:</span> {{ appt.doctorName }}
          </p>
          <p class="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
            📅 <span class="text-blue-700 dark:text-blue-400">Date:</span> {{ appt.date }}
          </p>
          <p class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            ⏰ <span class="text-blue-700 dark:text-blue-400">Time:</span> {{ appt.time }}
          </p>
        </div>
      </div>

      <div v-else class="text-gray-500 dark:text-gray-400 text-center mt-10 animate-pulse">
        No appointments yet.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const appointments = ref([])

onMounted(() => {
  appointments.value = JSON.parse(localStorage.getItem('appointments') || '[]')
})
</script>