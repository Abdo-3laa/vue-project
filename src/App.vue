<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main>
      <router-view/>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
main {
  min-height: calc(100vh - 72px); /* يضمن إن المحتوى ياخد الشاشة */
  padding-top: 72px; /* يبعد المحتوى عن النافبار */
  padding-bottom: 60px; /* مسافة قبل الفوتر */
}



</style>
