<template>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Profile Header -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div class="flex items-center gap-6">
            <div class="relative">
              <img 
              :src="'/favicon.ico'" 
                alt="Profile picture"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-md"
              />
              <label class="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform">
                <input type="file" class="hidden" @change="handleImageUpload" accept="image/*" />
                <Camera class="w-5 h-5 text-gray-600" />
              </label>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ profile.fullName }}</h1>
              <p class="text-gray-600 mt-1">{{ profile.email }}</p>
              <p class="text-gray-600">{{ profile.mobile }}</p>
            </div>
          </div>
        </div>
  
        <!-- Basic Information Section -->
        <div class="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <button 
            @click="toggleSection('basic')"
            class="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <h2 class="text-lg font-semibold text-gray-900">Basic Information</h2>
            <ChevronDown 
              :class="['w-5 h-5 transition-transform', 
                activeSection === 'basic' ? 'rotate-180' : '']"
            />
          </button>
          
          <div v-if="activeSection === 'basic'"
            class="p-6 pt-0 border-t border-gray-100"
          >
            <form @submit.prevent="saveBasicInfo" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input 
                  v-model="profile.fullName"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  v-model="profile.email"
                  type="email"
                  class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Mobile
                </label>
                <input 
                  v-model="profile.mobile"
                  type="tel"
                  class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  @click="cancelEdit('basic')"
                  class="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
  
        <!-- Academic Details Section -->
        <div class="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <button 
            @click="toggleSection('academic')"
            class="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <h2 class="text-lg font-semibold text-gray-900">Academic Details</h2>
            <ChevronDown 
              :class="['w-5 h-5 transition-transform', 
                activeSection === 'academic' ? 'rotate-180' : '']"
            />
          </button>
          
          <div v-if="activeSection === 'academic'"
            class="p-6 pt-0 border-t border-gray-100"
          >
            <form @submit.prevent="saveAcademicInfo" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input 
                  v-model="profile.studentId"
                  type="text"
                  disabled
                  class="w-full px-4 py-2 rounded-lg border bg-gray-50"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select 
                  v-model="profile.department"
                  class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                >
                  <option value="cs">Computer Science</option>
                  <option value="eng">Engineering</option>
                  <option value="bus">Business</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Year of Study
                </label>
                <select 
                  v-model="profile.yearOfStudy"
                  class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Section/Class
                </label>
                <input 
                  v-model="profile.section"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  @click="cancelEdit('academic')"
                  class="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
  
        <!-- Social Section -->
        <div class="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <button 
            @click="toggleSection('social')"
            class="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <h2 class="text-lg font-semibold text-gray-900">Social & Interests</h2>
            <ChevronDown 
              :class="['w-5 h-5 transition-transform', 
                activeSection === 'social' ? 'rotate-180' : '']"
            />
          </button>
          
          <div v-if="activeSection === 'social'"
            class="p-6 pt-0 border-t border-gray-100"
          >
            <form @submit.prevent="saveSocialInfo" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea 
                  v-model="profile.bio"
                  rows="4"
                  class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Clubs
                </label>
                <div class="space-y-2">
                  <div v-for="(club, index) in profile.clubs" :key="index"
                    class="flex gap-2"
                  >
                    <input 
                      v-model="profile.clubs[index]"
                      type="text"
                      class="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    />
                    <button 
                      type="button"
                      @click="removeClub(index)"
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 class="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    type="button"
                    @click="addClub"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Club
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Social Media Links
                </label>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <Github class="w-5 h-5 text-gray-600" />
                    <input 
                      v-model="profile.socialLinks.github"
                      type="url"
                      placeholder="GitHub Profile URL"
                      class="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    />
                  </div>
                  <div class="flex items-center gap-3">
                    <Linkedin class="w-5 h-5 text-gray-600" />
                    <input 
                      v-model="profile.socialLinks.linkedin"
                      type="url"
                      placeholder="LinkedIn Profile URL"
                      class="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  @click="cancelEdit('social')"
                  class="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Camera, ChevronDown, Github, Linkedin, Trash2 } from 'lucide-vue-next'
  
  definePageMeta({
    layout: 'common'
  })

  const activeSection = ref(null)
  const profile = ref({
    imageUrl: null,
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+1 234 567 8900',
    studentId: 'STU123456',
    department: 'cs',
    yearOfStudy: '2',
    section: 'A',
    bio: '',
    clubs: ['Photography Club', 'Coding Club'],
    socialLinks: {
      github: '',
      linkedin: ''
    }
  })
  
  // Store initial state for cancellation
  const initialState = JSON.parse(JSON.stringify(profile.value))
  
  const toggleSection = (section) => {
    activeSection.value = activeSection.value === section ? null : section
  }
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        profile.value.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  const saveBasicInfo = () => {
    // Save to backend
    initialState.fullName = profile.value.fullName
    initialState.email = profile.value.email
    initialState.mobile = profile.value.mobile
    activeSection.value = null
  }
  
  const saveAcademicInfo = () => {
    // Save to backend
    initialState.department = profile.value.department
    initialState.yearOfStudy = profile.value.yearOfStudy
    initialState.section = profile.value.section
    activeSection.value = null
  }
  
  const saveSocialInfo = () => {
    // Save to backend
    initialState.bio = profile.value.bio
    initialState.clubs = [...profile.value.clubs]
    initialState.socialLinks = { ...profile.value.socialLinks }
    activeSection.value = null
  }
  
  const cancelEdit = (section) => {
    // Restore initial state for the specific section
    if (section === 'basic') {
      profile.value.fullName = initialState.fullName
      profile.value.email = initialState.email
      profile.value.mobile = initialState.mobile
    } else if (section === 'academic') {
      profile.value.department = initialState.department
      profile.value.yearOfStudy = initialState.yearOfStudy
      profile.value.section = initialState.section
    } else if (section === 'social') {
      profile.value.bio = initialState.bio
      profile.value.clubs = [...initialState.clubs]
      profile.value.socialLinks = { ...initialState.socialLinks }
    }
    activeSection.value = null
  }
  
  const addClub = () => {
    profile.value.clubs.push('')
  }
  
  const removeClub = (index) => {
    profile.value.clubs.splice(index, 1)
  }
  </script>