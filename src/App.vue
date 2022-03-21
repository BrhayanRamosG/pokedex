<script setup>
import NavBar from "@/components/NavBar.vue";
import LayoutPage from "@/layout/LayoutPage.vue";
import FooterPage from "./components/FooterPage.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <LayoutPage />
  </main>
  <FooterPage />
</template>
