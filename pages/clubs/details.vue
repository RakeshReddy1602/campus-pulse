<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="text-4xl font-bold text-navy-800 mb-2">Club Details</h1>
          <p class="text-teal-700">Here are the details of your club and its members</p>
        </div>
  
        <!-- Club Details Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
          <div class="mb-8">
            <!-- Club Name and Category -->
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-semibold text-navy-700">Club Name: {{ club.name }}</h2>
              <span class="text-lg text-teal-600 bg-teal-50 px-4 py-2 rounded-full shadow-lg">{{ club.category }}</span>
            </div>
  
            <!-- Club Description -->
            <p class="text-base text-navy-600">{{ club.description }}</p>
          </div>
  
          <div class="border-t border-blue-200 pt-6">
            <!-- Admin and Moderators -->
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-navy-700 mb-3">Admin & Moderators</h3>
              <div class="space-y-4">
                <div>
                  <span class="font-medium text-navy-700">Admin:</span>
                  <span class="text-teal-700">{{ club.admin.name }}</span>
                </div>
                <div>
                  <span class="font-medium text-navy-700">Moderator 1:</span>
                  <span class="text-teal-700">{{ club.moderator1.name }}</span>
                </div>
                <div v-if="club.moderator2">
                  <span class="font-medium text-navy-700">Moderator 2:</span>
                  <span class="text-teal-700">{{ club.moderator2.name }}</span>
                </div>
              </div>
            </div>
  
            <!-- Members List -->
            <div>
              <h3 class="text-xl font-semibold text-navy-700 mb-3">Members</h3>
              <ul class="space-y-3">
                <li
                  v-for="user in club.users"
                  :key="user.id"
                  class="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-sm hover:bg-teal-100 transition duration-200"
                >
                  <span class="text-navy-700 font-medium">{{ user.name }}</span>
                  <span class="text-teal-500 text-sm">{{ user.role }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="mt-8 flex justify-center gap-4">
          <button
            @click="editClub"
            class="w-36 py-2 px-4 rounded-lg font-medium text-white text-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-teal-200 focus:outline-none shadow-lg hover:shadow-xl"
          >
            Edit Club
          </button>
          <button
            @click="deleteClub"
            class="w-36 py-2 px-4 rounded-lg font-medium text-white text-lg bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-red-200 focus:outline-none shadow-lg hover:shadow-xl"
          >
            Delete Club
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  definePageMeta({
    title: 'Club Details',
    layout: 'common'
  })

  // Sample club data
  const club = ref({
    name: 'Science & Technology Club',
    description: 'A community of tech enthusiasts focused on the latest developments in science and technology.',
    category: 'Science & Technology',
    admin: { name: 'Michael Chen' },
    moderator1: { name: 'Emma Davis' },
    moderator2: { name: 'Alex Thompson' },
    users: [
      { id: 1, name: 'Sarah Johnson', role: 'Member' },
      { id: 2, name: 'Michael Chen', role: 'Member' },
      { id: 3, name: 'Emma Davis', role: 'Member' },
      { id: 4, name: 'Alex Thompson', role: 'Member' },
      { id: 5, name: 'Maria Garcia', role: 'Member' }
    ]
  })
  
  // Methods for buttons
  const editClub = () => {
   alert('Coming soon!')
  }
  
  const deleteClub = () => {
    alert('Coming soon!')
}
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  