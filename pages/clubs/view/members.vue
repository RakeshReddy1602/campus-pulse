<template>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Club Members</h2>
  
      <div class="space-y-4">
        <div
          v-for="member in members"
          :key="member.id"
          class="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          :class="{ 'bg-blue-100 border-blue-500': member.isModerator }"
        >
          <div>
            <p class="text-lg font-medium">
              {{ member.name }}
              <span v-if="member.isModerator" class="text-blue-700 text-sm font-semibold">(Moderator)</span>
            </p>
            <p class="text-sm text-gray-600">Reg. No: {{ member.regNo }}</p>
          </div>
          <div class="space-x-2">
            <button class="px-3 py-1 bg-red-500 text-white rounded" @click="removeMember(member.id)">
              Remove
            </button>
            <button class="px-3 py-1 bg-gray-500 text-white rounded">
              Block
            </button>
          </div>
        </div>
      </div>
  
      <p v-if="members.length === 0" class="text-center text-gray-500 mt-4">No members left.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  definePageMeta({
    title: "Club Members",
    description: "View club members",
    layout: "club",
  })

  const members = ref([
    { id: 1, name: "John Doe", regNo: "CLB2024001", isModerator: true },
    { id: 2, name: "Jane Smith", regNo: "CLB2024002", isModerator: true },
    ...Array.from({ length: 28 }, (_, i) => ({
      id: i + 3,
      name: `Member ${i + 3}`,
      regNo: `CLB2024${String(i + 3).padStart(3, "0")}`,
      isModerator: false,
    })),
  ]);
  
  const removeMember = (id) => {
    members.value = members.value.filter(member => member.id !== id);
  };
  </script>
  