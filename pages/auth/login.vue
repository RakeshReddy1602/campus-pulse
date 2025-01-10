<!-- pages/login.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 p-4">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p class="text-gray-600">Login to your student portal</p>
          </div>
  
          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Registration Number Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                v-model="formData.registrationNumber"
                type="text"
                :class="[
                  'w-full px-4 py-2 rounded-lg border focus:ring-4 outline-none transition duration-200',
                  errors.registrationNumber 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200'
                ]"
                placeholder="Enter 7-digit number"
              />
              <p v-if="errors.registrationNumber" class="mt-1 text-sm text-red-600">
                {{ errors.registrationNumber }}
              </p>
            </div>
  
            <!-- Password Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div class="relative">
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  :class="[
                    'w-full px-4 py-2 rounded-lg border focus:ring-4 outline-none transition duration-200',
                    errors.password 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'
                  ]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <!-- <Icon
                    :name="showPassword ? 'ph:eye-slash' : 'ph:eye'"
                    class="w-5 h-5"
                  /> -->
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password }}
              </p>
            </div>
  
            <!-- Login Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Logging in...</span>
              <span v-else>Login</span>
            </button>
          </form>
  
          <!-- Links -->
          <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <NuxtLink
              to="/auth/reset-password"
              class="text-blue-600 hover:underline transition duration-200"
            >
              Forgot Password?
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="text-blue-600 hover:underline transition duration-200"
            >
              New Student? Register Here
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const formData = ref({
    registrationNumber: '',
    password: ''
  });
  
  const errors = ref({});
  const showPassword = ref(false);
  const isLoading = ref(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!/^\d{7}$/.test(formData.value.registrationNumber)) {
      newErrors.registrationNumber = 'Registration number must be exactly 7 digits';
    }
    
    if (!formData.value.password) {
      newErrors.password = 'Password is required';
    } else if (formData.value.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      isLoading.value = true;
      navigateTo('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <script>
  // Add meta information for the page
//   definePageMeta({
//     layout: 'auth',
//     middleware: 'guest'
//   });
  </script>