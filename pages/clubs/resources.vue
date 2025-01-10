<template>
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <!-- Header -->
      <header class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-6 shadow-lg">
        <div class="max-w-6xl mx-auto">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold">General Channel: Club Resources</h1>
              <p class="text-sm text-purple-100">Share and discuss resources with your club members</p>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Messages Section -->
      <div class="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div class="max-w-4xl mx-auto">
          <div
            v-for="(resource, index) in resources"
            :key="index"
            class="flex items-start space-x-4 group"
          >
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-bold shadow-lg transform group-hover:scale-105 transition-transform duration-200"
              >
                {{ resource.authorInitials }}
              </div>
            </div>
  
            <!-- Message Content -->
            <div class="flex-1 bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-bold text-gray-900">{{ resource.author }}</h3>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-500">{{ resource.date }}</span>
                  <button class="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p class="text-gray-700">{{ resource.description }}</p>
              <div class="mt-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <a
                  :href="resource.link"
                  target="_blank"
                  class="flex items-center space-x-2 text-indigo-600 hover:text-purple-600 transition-colors duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span class="underline">{{ resource.link }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Input Section -->
      <div class="bg-white border-t border-gray-100 px-6 py-4 shadow-lg">
        <div class="max-w-4xl mx-auto flex items-center space-x-4">
          <input
            type="text"
            placeholder="Share a resource with your club..."
            class="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                   bg-gray-50 hover:bg-white transition-all duration-200"
            disabled
          />
          <button
            @click="alertComingSoon"
            class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl
                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            Share Resource
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  definePageMeta({
    layout: 'common'
  })

  const resources = ref([
    {
      author: 'Alice Wang',
      authorInitials: 'AW',
      date: 'Jan 9, 2025',
      description: 'Check out this comprehensive guide on Vue.js best practices. It covers everything from component design to state management patterns! 🚀',
      link: 'https://vuejs.org/guide',
    },
    {
      author: 'John Doe',
      authorInitials: 'JD',
      date: 'Jan 8, 2025',
      description: 'Found an amazing collection of free design tools for open-source projects. Perfect for our upcoming hackathon! 🎨',
      link: 'https://opensource.design/tools',
    },
    {
      author: 'Emma Brown',
      authorInitials: 'EB',
      date: 'Jan 7, 2025',
      description: 'Just published my analysis of AI trends to watch in 2025. Would love to hear your thoughts on the predictions! 🤖',
      link: 'https://aiinsights.com/2025-trends',
    },
  ])
  
  const alertComingSoon = () => {
    alert('Coming Soon! We\'re working on making resource sharing even better! 🚀')
  }
  </script>