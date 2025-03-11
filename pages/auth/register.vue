<!-- pages/register.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-100 p-4">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p class="text-gray-600">Join our college portal</p>
          </div>
  
          <!-- Registration Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Full Name Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                v-model="formData.fullName"
                type="text"
                :class="[
                  'w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-200',
                  isFieldValid('fullName') === false
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                ]"
                placeholder="Enter your full name"
                @input="validateField('fullName')"
              />
              <TransitionGroup name="fade">
                <p v-if="errors.fullName" key="fullName" class="mt-2 text-sm text-red-500">
                  {{ errors.fullName }}
                </p>
              </TransitionGroup>
            </div>
  
            <!-- Email Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                v-model="formData.email"
                type="email"
                :class="[
                  'w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-200',
                  isFieldValid('email') === false
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                ]"
                placeholder="your.email@example.com"
                @input="validateField('email')"
              />
              <TransitionGroup name="fade">
                <p v-if="errors.email" key="email" class="mt-2 text-sm text-red-500">
                  {{ errors.email }}
                </p>
              </TransitionGroup>
            </div>
  
            <!-- Registration Number Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                v-model="formData.registrationNumber"
                type="text"
                maxlength="7"
                :class="[
                  'w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-200',
                  isFieldValid('registrationNumber') === false
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                ]"
                placeholder="7-digit number"
                @input="validateField('registrationNumber')"
              />
              <TransitionGroup name="fade">
                <p v-if="errors.registrationNumber" key="registrationNumber" class="mt-2 text-sm text-red-500">
                  {{ errors.registrationNumber }}
                </p>
              </TransitionGroup>
            </div>
  
            <!-- Role Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                v-model="formData.role"
                :class="[
                  'w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-200',
                  isFieldValid('role') === false
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                ]"
                @change="validateField('role')"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
              <TransitionGroup name="fade">
                <p v-if="errors.role" key="role" class="mt-2 text-sm text-red-500">
                  {{ errors.role }}
                </p>
              </TransitionGroup>
            </div>
  
            <!-- Form Actions -->
            <div class="flex space-x-4">
              <button
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-amber-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              >
                <span v-if="isSubmitting">Registering...</span>
                <span v-else>Register</span>
              </button>
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-200 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  definePageMeta({
    middleware: 'block-access',
  });
  
  
  const formData = ref({
    fullName: '',
    email: '',
    registrationNumber: '',
    role: ''
  });
  
  const errors = ref({});
  const isSubmitting = ref(false);
  
  // Validation rules
  const validationRules = {
    fullName: (value) => {
      if (!value) return 'Full name is required';
      if (value.length < 3) return 'Name must be at least 3 characters';
      if (!/^[a-zA-Z\s]*$/.test(value)) return 'Name can only contain letters and spaces';
      return '';
    },
    email: (value) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
      return '';
    },
    registrationNumber: (value) => {
      if (!value) return 'Registration number is required';
      if (!/^\d{7}$/.test(value)) return 'Registration number must be exactly 7 digits';
      return '';
    },
    role: (value) => {
      if (!value) return 'Please select a role';
      return '';
    }
  };
  
  // Validate single field
  const validateField = (field) => {
    const error = validationRules[field](formData.value[field]);
    if (error) {
      errors.value[field] = error;
    } else {
      delete errors.value[field];
    }
  };
  
  // Check if specific field is valid
  const isFieldValid = (field) => {
    if (!formData.value[field]) return null;
    return !validationRules[field](formData.value[field]);
  };
  
  // Check if entire form is valid
  const isFormValid = computed(() => {
    return Object.keys(validationRules).every(field => {
      return !validationRules[field](formData.value[field]);
    });
  });
  
  // Handle form submission
  const handleSubmit = async () => {
    // Validate all fields
    Object.keys(validationRules).forEach(validateField);
    
    if (!isFormValid.value) return;
    
    try {
      isSubmitting.value = true;
      console.log('Form submitted:', formData.value);
      // Add your API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Show success message or redirect
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // Reset form
  const resetForm = () => {
    formData.value = {
      fullName: '',
      email: '',
      registrationNumber: '',
      role: ''
    };
    errors.value = {};
  };
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>