<!-- CreateClub.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-green-900 mb-2">Create a New Club</h1>
          <p class="text-yellow-600">Start your journey by creating a club for your community</p>
        </div>
  
        <!-- Form Card -->
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-yellow-200">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Club Name -->
            <div>
              <label for="clubName" class="block text-sm font-medium text-green-800 mb-2">
                Club Name
              </label>
              <input
                id="clubName"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
                placeholder="Enter club name"
              />
            </div>
  
            <!-- Club Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-green-800 mb-2">
                Club Description
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="4"
                required
                class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
                placeholder="Describe your club's purpose and activities"
              ></textarea>
            </div>
  
            <!-- Club Category -->
            <div>
              <label for="category" class="block text-sm font-medium text-green-800 mb-2">
                Club Category
              </label>
              <select
                id="category"
                v-model="formData.category"
                required
                class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
              >
                <option value="" disabled>Select a category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
  
            <!-- Moderators Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Moderator 1 -->
              <div>
                <label for="mod1" class="block text-sm font-medium text-green-800 mb-2">
                  Primary Moderator <span class="text-orange-600">*</span>
                </label>
                <select
                  id="mod1"
                  v-model="formData.moderator1"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
                >
                  <option value="" disabled>Select moderator</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.name }}
                  </option>
                </select>
              </div>
  
              <!-- Moderator 2 -->
              <div>
                <label for="mod2" class="block text-sm font-medium text-green-800 mb-2">
                  Secondary Moderator <span class="text-green-600">(Optional)</span>
                </label>
                <select
                  id="mod2"
                  v-model="formData.moderator2"
                  class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
                >
                  <option value="">Select moderator (optional)</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.name }}
                  </option>
                </select>
              </div>
            </div>
  
            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                class="w-full py-4 px-6 rounded-lg font-medium text-white text-lg 
                       bg-gradient-to-r from-yellow-400 to-orange-500 
                       hover:from-yellow-500 hover:to-orange-600
                       transform hover:-translate-y-0.5 transition-all duration-200
                       focus:ring-4 focus:ring-yellow-200 focus:outline-none
                       shadow-lg hover:shadow-xl"
              >
                Create Club
              </button>
            </div>
          </form>
        </div>
  
        <!-- Success Message -->
        <div
          v-if="showSuccess"
          class="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg text-green-700 text-center"
        >
          Club created successfully!
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  
  definePageMeta({
    layout: 'common',
    title: 'Create a New Club'
  })

  const formData = reactive({
    name: '',
    description: '',
    category: '',
    moderator1: '',
    moderator2: ''
  })
  
  const showSuccess = ref(false)
  
  const categories = [
    'Art & Design',
    'Science & Technology',
    'Fitness & Sports',
    'Music & Performance',
    'Literature & Writing',
    'Gaming & eSports',
    'Environment & Sustainability',
    'Culture & Language',
    'Business & Entrepreneurship'
  ]
  
  const users = [
    { id: 1, name: 'Sarah Johnson' },
    { id: 2, name: 'Michael Chen' },
    { id: 3, name: 'Emma Davis' },
    { id: 4, name: 'Alex Thompson' },
    { id: 5, name: 'Maria Garcia' }
  ]
  
  const handleSubmit = () => {
    // // Handle form submission logic here
    // console.log('Form submitted:', formData)
    // showSuccess.value = true
    // setTimeout(() => {
    //   showSuccess.value = false
    // }, 3000)
    alert('Club created successfully!');
    // formData.reset();
  }
  </script>
  