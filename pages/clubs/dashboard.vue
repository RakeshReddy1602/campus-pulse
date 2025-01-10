<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Header -->
      <header class="text-center bg-gradient-to-r from-teal-600 to-orange-500 text-white py-4 px-6 shadow-md">
        <h1 class="text-2xl font-bold">MVGR Club Dashboard</h1>
        <p class="text-sm text-orange-200">Overview of recent and upcoming activities.</p>
      </header>
  
      <!-- Main Content -->
      <div class="px-6 py-8 space-y-8">
        <!-- Recent Events -->
        <section>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Recent Events</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="event in recentEvents"
              :key="event.id"
              class="bg-white rounded-lg shadow-md p-4"
            >
              <h3 class="font-bold text-lg text-teal-700">{{ event.title }}</h3>
              <p class="text-sm text-gray-600">{{ event.date }}</p>
              <p class="mt-2 text-gray-700">{{ event.description }}</p>
            </div>
          </div>
        </section>
  
        <!-- Future Events -->
        <section>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="event in futureEvents"
              :key="event.id"
              class="bg-white rounded-lg shadow-md p-4"
            >
              <h3 class="font-bold text-lg text-orange-600">{{ event.title }}</h3>
              <p class="text-sm text-gray-600">{{ event.date }}</p>
              <p class="mt-2 text-gray-700">{{ event.description }}</p>
            </div>
          </div>
        </section>
  
        <!-- Elections -->
        <section>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Elections</h2>
          <div class="space-y-4">
            <div
              v-for="election in elections"
              :key="election.id"
              class="bg-white rounded-lg shadow-md p-4"
            >
              <h3 class="font-bold text-lg text-teal-700">{{ election.title }}</h3>
              <p class="text-sm text-gray-600">Date: {{ election.date }}</p>
              <div class="mt-3">
                <h4 class="font-semibold text-gray-800">Winners:</h4>
                <ul class="list-disc list-inside text-gray-700">
                  <li v-for="winner in election.winners" :key="winner">{{ winner }}</li>
                </ul>
              </div>
              <div class="mt-3">
                <h4 class="font-semibold text-gray-800">Losers:</h4>
                <ul class="list-disc list-inside text-gray-700">
                  <li v-for="loser in election.losers" :key="loser">{{ loser }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Club Stats -->
        <section>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Club Statistics</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 class="text-2xl font-bold text-teal-600">{{ stats.members }}</h3>
              <p class="text-sm text-gray-600">Total Members</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 class="text-2xl font-bold text-orange-500">{{ stats.events }}</h3>
              <p class="text-sm text-gray-600">Total Events</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 class="text-2xl font-bold text-teal-600">{{ stats.elections }}</h3>
              <p class="text-sm text-gray-600">Total Elections</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 class="text-2xl font-bold text-orange-500">{{ stats.resources }}</h3>
              <p class="text-sm text-gray-600">Total Resources Shared</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'

  definePageMeta({
    layout: 'common',
    title: 'Club Dashboard'
  })

// Dummy data
  const recentEvents = ref([
    { id: 1, title: 'Hackathon 2024', date: 'Jan 5, 2025', description: 'A coding marathon to solve real-world problems.' },
    { id: 2, title: 'Workshop: AI Basics', date: 'Dec 20, 2024', description: 'An introductory workshop on Artificial Intelligence.' },
    { id: 3, title: 'Leadership Talk', date: 'Dec 15, 2024', description: 'Insights on leadership skills from industry experts.' },
  ])
  
  const futureEvents = ref([
    { id: 1, title: 'Cloud Computing Workshop', date: 'Feb 15, 2025', description: 'Learn the fundamentals of cloud computing.' },
    { id: 2, title: 'Spring Hackathon', date: 'Mar 20, 2025', description: 'Build innovative solutions in teams.' },
  ])
  
  const elections = ref([
    {
      id: 1,
      title: 'Club President Elections',
      date: 'Jan 10, 2025',
      winners: ['Alice Johnson'],
      losers: ['Bob Smith', 'Charlie Brown'],
    },
    {
      id: 2,
      title: 'Tech Team Lead Elections',
      date: 'Dec 25, 2024',
      winners: ['Emma Watson'],
      losers: ['Liam Davis'],
    },
  ])
  
  const stats = ref({
    members: 120,
    events: 25,
    elections: 5,
    resources: 150,
  })
  </script>
  
  <style scoped>
  .bg-gradient-to-r {
    background: linear-gradient(to right, #14b8a6, #f97316);
  }
  
  .bg-gray-100 {
    background-color: #f3f4f6;
  }
  
  .bg-gray-200 {
    background-color: #e5e7eb;
  }
  
  .text-teal-600 {
    color: #14b8a6;
  }
  
  .text-orange-500 {
    color: #f97316;
  }
  </style>
  