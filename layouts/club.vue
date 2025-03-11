<template>
    <Header />
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 class="text-xl font-semibold mb-6">Club Portal</h2>
        <nav class="space-y-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.name"
            :to="item.path"
            class="block px-4 py-2 rounded-lg transition duration-200"
            :class="{ 'bg-blue-500 text-white': $route.path === item.path, 'text-gray-700 hover:bg-gray-200': $route.path !== item.path }"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-auto">
        <NuxtPage />
      </main>
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/header.vue';

  const menuItems = [
    { name: "Chat", path: "/clubs/view/chat" },
    { name: "Members", path: "/clubs/view/members" },
    { name: "Elections", path: "/clubs/view/elections" },
    { name: "Events", path: "/clubs/view/events" },
  ];
  </script>
  