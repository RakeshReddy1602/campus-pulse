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

          <!-- Moderators Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Primary Moderator -->
            <div>
              <label for="mod1" class="block text-sm font-medium text-green-800 mb-2">
                Primary Moderator <span class="text-orange-600">*</span>
              </label>
              <select
                id="mod1"
                v-model="formData.firstModeratorId"
                required
                @change="filterModerators"
                class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
              >
                <option value="" disabled>Select moderator</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.registration_number }} - {{ user.name }}
                </option>
              </select>
            </div>

            <!-- Secondary Moderator -->
            <div>
              <label for="mod2" class="block text-sm font-medium text-green-800 mb-2">
                Secondary Moderator <span class="text-green-600">(Optional)</span>
              </label>
              <select
                id="mod2"
                v-model="formData.secondaryModeratorId"
                class="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-200 bg-green-50/30"
              >
                <option value="">Select moderator (optional)</option>
                <option v-for="user in secondaryModerators" :key="user.id" :value="user.id">
                  {{ user.registration_number }} - {{ user.name }}
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
  secondaryModeratorId: ''
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
  !moderatorsSame.value
)

const filterModerators = () => {
  secondaryModerators.value = users.value.filter(user => user.id !== formData.firstModeratorId)
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
    const payload = {
      name: formData.name,
      description: formData.description,
      adminuserId: loggedInUserId,
      categoryId: formData.categoryId,
      firstModeratorId: formData.firstModeratorId,
      secondaryModeratorId: formData.secondaryModeratorId || null
    }
    console.log('--  hitting api');
    await $axios.post('/api/clubs/create-new', payload)
    console.log('---received response')
    // Reset form
    Object.assign(formData, {
      name: '',
      description: '',
      categoryId: '',
      firstModeratorId: '',
      secondaryModeratorId: ''
    })
  } catch (error) {
    console.error(error)
    alert('Something went wrong. Please try again later.')
  } finally {
    loading.value = false
  }
}

</script>
