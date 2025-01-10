
<!-- layouts/default.vue -->
<template>
    <div class="min-h-screen flex flex-col">
      <Header/>
      <slot />
    </div>
  </template>



<script setup lang="ts">
import Header from '~/pages/common-pages/header.vue';

</script>
 