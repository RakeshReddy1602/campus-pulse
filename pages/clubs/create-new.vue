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
            <label for="clubName" class="block text-sm font-medium text-green-800 mb-2">Club Name</label>
            <input
              id="clubName"
              v-model="formData.name"
              type="text"
              required
              autofocus
              @blur="touched.name = true"
              class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
              placeholder="Enter club name"
            />
            <p v-if="touched.name && formData.name.length < 6" class="text-red-600 text-sm mt-1">
              Club name must be at least 6 characters.
            </p>
          </div>

          <!-- Club Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-green-800 mb-2">Club Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              required
              @blur="touched.description = true"
              class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
              placeholder="Describe your club's purpose and activities"
            ></textarea>
            <p v-if="touched.description && formData.description.length < 10" class="text-red-600 text-sm mt-1">
              Description must be at least 10 characters.
            </p>
          </div>

          <!-- Club Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-green-800 mb-2">Club Category</label>
            <select
              id="category"
              v-model="formData.categoryId"
              required
              @blur="touched.category = true"
              class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
            >
              <option value="" disabled>Select a category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <p v-if="touched.category && !formData.categoryId" class="text-red-600 text-sm mt-1">
              Please select a category.
            </p>
          </div>

          <!-- Club Banner -->
          <div>
            <label for="banner" class="block text-sm font-medium text-green-800 mb-2">Club Banner (JPG, JPEG, PNG, max 5 MB)</label>
            <input
              id="banner"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              @change="handleBannerUpload"
              required
              class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
            />
            <p v-if="bannerError" class="text-red-600 text-sm mt-1">{{ bannerError }}</p>
            <div v-if="formData.bannerPreview" class="mt-2">
              <img :src="formData.bannerPreview" alt="Banner Preview" class="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>

          <!-- Club Videos -->
          <div>
            <label class="block text-sm font-medium text-green-800 mb-2">Club Introduction Videos (MP4, max 20 MB each, up to 5 videos)</label>
            <div v-for="(video, index) in formData.videos" :key="index" class="mb-4">
              <label :for="'video' + index" class="block text-sm font-medium text-green-800 mb-1">Video {{ index + 1 }} (optional)</label>
              <div class="flex items-center gap-4">
                <input
                  :id="'video' + index"
                  type="file"
                  accept="video/mp4"
                  @change="handleVideoUpload($event, index)"
                  class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
                />
                <button type="button" @click="removeVideo(index)" class="text-red-600 hover:text-red-800 transition-colors">
                  Remove
                </button>
              </div>
              <div v-if="formData.videoPreviews[index]" class="mt-2">
                <video :src="formData.videoPreviews[index]" controls class="w-96 h-96 rounded-lg shadow-lg"></video>
              </div>
              <p v-if="videoErrors[index]" class="text-red-600 text-sm mt-1">{{ videoErrors[index] }}</p>
            </div>
            <div v-if="formData.videos.length < 5" class="mt-4">
              <button type="button" @click="addVideo" class="text-blue-600 hover:text-blue-800 transition-colors">
                + Add Another Video
              </button>
            </div>
          </div>

          <!-- Moderators Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Primary Moderator -->
            <div>
              <label for="firstModeratorId" class="block text-sm font-medium text-green-800 mb-2">Primary Moderator</label>
              <select
                id="firstModeratorId"
                v-model="formData.firstModeratorId"
                required
                @change="filterModerators"
                class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
              >
                <option value="" disabled>Select a primary moderator</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }}
                </option>
              </select>
            </div>

            <!-- Secondary Moderator -->
            <div>
              <label for="secondaryModeratorId" class="block text-sm font-medium text-green-800 mb-2">Secondary Moderator</label>
              <select
                id="secondaryModeratorId"
                v-model="formData.secondaryModeratorId"
                class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
              >
                <option value="" disabled>Select a secondary moderator</option>
                <option v-for="user in secondaryModerators" :key="user.id" :value="user.id">
                  {{ user.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Warning Message for Duplicate Moderators -->
          <div v-if="moderatorsSame" class="p-4 bg-orange-100 border border-orange-200 rounded-lg text-orange-700 text-center">
            Primary and secondary moderators cannot be the same.
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="!isFormValid"
              class="w-full py-4 px-6 rounded-lg font-medium text-white text-lg 
                     bg-gradient-to-r from-yellow-400 to-orange-500 
                     hover:from-yellow-500 hover:to-orange-600
                     transform hover:-translate-y-0.5 transition-all duration-200
                     focus:ring-4 focus:ring-yellow-200 focus:outline-none
                     shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Club
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

definePageMeta({
  title: 'Create a New Club',
  meta: [
    {
      name: 'description',
      content: 'Create a new club for your community and start engaging with like-minded people.'
    }
  ],
  layout: 'common'
})

const { $axios } = useNuxtApp()
const loading = ref(false);
const formData = reactive({
  name: '',
  description: '',
  categoryId: '',
  firstModeratorId: '',
  secondaryModeratorId: '',
  banner: null,
  bannerPreview: null,
  videos: [],
  videoPreviews: []
})

const touched = reactive({
  name: false,
  description: false,
  category: false
})

const categories = ref([])
const users = ref([])
const secondaryModerators = ref([])

onMounted(async () => {
  const [categoryRes, userRes] = await Promise.all([
    $axios.get('/api/club-category/fetch-all'),
    $axios.get('/api/user/fetch-all')
  ])
  categories.value = categoryRes.data.clubCategories || []
  users.value = userRes.data.users || []
  secondaryModerators.value = users.value
})

const moderatorsSame = computed(() => formData.firstModeratorId && formData.secondaryModeratorId && formData.firstModeratorId === formData.secondaryModeratorId)

const isFormValid = computed(() => 
  formData.name.length >= 6 &&
  formData.description.length >= 10 &&
  formData.categoryId &&
  formData.banner &&
  !moderatorsSame.value
)

const filterModerators = () => {
  secondaryModerators.value = users.value.filter(user => user.id !== formData.firstModeratorId)
}

const bannerError = ref(null)
const videoErrors = ref([])

const handleBannerUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      bannerError.value = 'Only PNG, JPG, and JPEG files are allowed.'
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      bannerError.value = 'File size must be less than 5 MB.'
      return
    }
    bannerError.value = null
    formData.banner = file

    // Create a preview of the banner
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.bannerPreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleVideoUpload = (event, index) => {
  const file = event.target.files[0]
  videoErrors.value[index] = null // Clear existing error message for this index
  if (file) {
    if (file.size > 20 * 1024 * 1024) {
      videoErrors.value[index] = `Video ${index + 1} size must be less than 20 MB.`
    } else {
      formData.videos[index] = file

      // Create a preview of the video
      const reader = new FileReader()
      reader.onload = (e) => {
        formData.videoPreviews[index] = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}

const addVideo = () => {
  if (formData.videos.length < 5) {
    formData.videos.push(null)
    formData.videoPreviews.push(null)
    videoErrors.value.push(null)
  }
}

const removeVideo = (index) => {
  formData.videos.splice(index, 1)
  formData.videoPreviews.splice(index, 1)
  videoErrors.value.splice(index, 1)
}

const handleSubmit = async () => {
  if (!isFormValid) {
    alert('Invalid form data');
    return
  }

  loading.value = true

  try {
    let loggedInUserId = useCookie('user')?.value?.id;
    if(!loggedInUserId) {
      alert('Something went wrong. please try logging in again!!');
    }

    const payload = new FormData()
    payload.append('name', formData.name)
    payload.append('description', formData.description)
    payload.append('adminId', loggedInUserId)
    payload.append('categoryId', formData.categoryId)
    payload.append('primaryModeratorId', formData.firstModeratorId)
    payload.append('secondaryModeratorId', formData.secondaryModeratorId || null)
    payload.append('banner', formData.banner)
    let videos  =  [];
    formData.videos.forEach((video) => {
      if(video) {
        videos.push(video);
      }
    });
    payload.append('videos[]', videos);
    console.log('--  hitting api');
    await $axios.post('/api/clubs/create-new', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('---received response')
    // Reset form
    Object.assign(formData, {
      name: '',
      description: '',
      categoryId: '',
      firstModeratorId: '',
      secondaryModeratorId: '',
      banner: null,
      bannerPreview: null,
      videos: [],
      videoPreviews: []
    })
  } catch (error) {
    console.error(error)
    alert('Something went wrong. Please try again later.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>