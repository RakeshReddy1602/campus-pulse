<template>
  <div class="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <!-- Election Header -->
      <header class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">{{ election.name }}</h1>
        <p class="text-lg text-gray-600">{{ election.description }}</p>
      </header>

      <!-- Election Details -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Election Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><strong>Start Date:</strong> {{ formatDate(election.start_date) }}</p>
          <p><strong>End Date:</strong> {{ formatDate(election.end_date) }}</p>
          <p><strong>Creator:</strong> {{ election.creator.name }} ({{ election.creator?.registration_number }})</p>
          <p><strong>Primary Coordinator:</strong> {{ election.primary_coordinator?.name }} ({{ election.primary_coordinator.registration_number }})</p>
          <p><strong>Secondary Coordinator:</strong> {{ election.secondary_coordinator?.name }} ({{ election.secondary_coordinator.registration_number }})</p>
        </div>
      </div>

      <!-- Candidates Selection -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Candidates</h2>
        <div class="bg-gray-50 p-4 rounded-md shadow-sm">
          <ul class="space-y-3">
            <li v-for="candidate in election.options" :key="candidate.id" class="flex items-center">
              <input
                type="radio"
                :value="candidate.id"
                v-model="selectedUser"
                class="mr-2 cursor-pointer"
                :disabled="election.hasAlreadyVoted"
              />
              <label class="cursor-pointer">{{ candidate.name }}</label>
            </li>
          </ul>
        </div>
      </div>

      <!-- Already Voted Message -->
      <div v-if="election.hasAlreadyVoted" class="text-center text-red-600 font-medium p-4 rounded-md bg-red-50">
        You have already voted for this election. Vote options are disabled.
      </div>

      <!-- OTP Input -->
      <div v-else class="mb-6">
        <label class="block text-lg font-semibold text-gray-800 mb-2">Enter OTP</label>
        <div class="flex items-center space-x-3">
          <input
            type="text"
            v-model="otp"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your OTP"
          />
          <button
            @click="generateOtp"
            :disabled="otpButtonDisabled || loadingOtp"
            class="py-2 px-5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all disabled:opacity-50"
          >
            <span v-if="loadingOtp">Generating...</span>
            <span v-else>Generate OTP</span>
          </button>
        </div>
        <p v-if="otpError" class="text-red-500 mt-2">{{ otpError }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between items-center mt-6">
        <button
          @click="goBack"
          class="py-2 px-5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          Back
        </button>
        <button
          @click="castVote"
          :disabled="election.hasAlreadyVoted || loadingVote"
          class="py-2 px-5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all disabled:opacity-50"
        >
          <span v-if="loadingVote">Submitting...</span>
          <span v-else>Cast Vote</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useNuxtApp, useCookie } from '#imports';

const props = defineProps({ election: Object });
const emit = defineEmits(['close']);
const { $axios } = useNuxtApp();
const userCookie = useCookie('user');
const userId = userCookie.value?.id;

const selectedUser = ref(null);
const otp = ref('');
const otpButtonDisabled = ref(false);
const otpError = ref('');
const loadingOtp = ref(false);
const loadingVote = ref(false);

const goBack = () => {
  emit('close');
};

const generateOtp = async () => {
  otpError.value = '';
  loadingOtp.value = true;
  try {
    await $axios.post('/api/user/generate-otp', { userId });
    alert('OTP generated successfully!');
    otpButtonDisabled.value = true;
    setTimeout(() => {
      otpButtonDisabled.value = false;
    }, 120000); // Disable button for 120 seconds
  } catch (error) {
    otpError.value = 'Failed to generate OTP. Please try again.';
    console.error(error);
  } finally {
    loadingOtp.value = false;
  }
};

const castVote = async () => {
  loadingVote.value = true;
  try {
    await $axios.post('/api/elections/cast-vote', {
      userId,
      electionOptionId: selectedUser.value,
      electionId: props.election.id,
      otp: otp.value,
    });
    alert('Vote casted successfully!');
    emit('close');
  } catch (error) {
    console.error('Failed to cast vote:', error);
    alert('Failed to cast vote. Please try again.');
  } finally {
    loadingVote.value = false;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
button:hover {
  transform: scale(1.03);
}
</style>
