<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-100 p-8">
      <header class="mb-12 text-center">
        <h1 class="text-5xl font-extrabold text-indigo-800 drop-shadow-md">Discover New Clubs</h1>
        <p class="text-lg text-blue-700 mt-4">
          Explore and connect with communities you're passionate about.
        </p>
      </header>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="(club, index) in availableClubs"
          :key="index"
          class="group rounded-lg overflow-hidden shadow-lg bg-white hover:bg-teal-100 transform hover:scale-105 transition-all duration-300"
        >
          <!-- Club Banner -->
          <div
            class="h-44 bg-cover bg-center relative"
            :style="{ backgroundImage: `url(${club.image})` }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-indigo-700/70 to-transparent flex items-center justify-center">
              <div class="flex items-center gap-2">
                <component
                  :is="club.icon"
                  class="w-8 h-8 text-white drop-shadow-lg"
                />
                <h2 class="text-3xl font-bold text-white text-center px-4">
                  {{ club.name }}
                </h2>
              </div>
            </div>
          </div>
  
          <!-- Club Details -->
          <div class="p-6">
            <p class="text-blue-900 text-sm mb-4 leading-relaxed line-clamp-3">
              {{ club.description }}
            </p>
            <div class="flex justify-between items-center">
              <span
                class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-indigo-200 text-indigo-800"
              >
                {{ club?.club_category?.name }}
              </span>
                <button :disabled="club.hasRequestedToJoin"
                class="px-4 py-2 rounded-lg text-sm font-bold shadow-md bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-teal-500 hover:to-blue-500"
                @click="joinClub(club.id)"
                >
                 {{ club.hasRequestedToJoin ? 'Already Requested to Join' : 'Join Club' }}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { 
    AcademicCapIcon, 
    GlobeAltIcon, 
    PuzzlePieceIcon, 
    MusicalNoteIcon, 
    FingerPrintIcon 
  } from "@heroicons/vue/24/solid";
  
  definePageMeta({
    override: true,
    layout: "common",
    title: "Discover New Clubs",
    description: "Explore and connect with communities you're passionate about.",
  });
  
  const availableClubs = ref([]);
  let loggedInUserId =  useCookie('user')?.value?.id;
  const { $axios } = useNuxtApp(); // Get Axios from Nuxt plugin
  // Fetch clubs from API
  const fetchClubs = async () => {
  try {
    console.log('loggedInUserId : ',loggedInUserId);
    const res = await $axios.post("/api/clubs/fetch-all-clubs", {
      userId: loggedInUserId
    });
    console.log('clubs  : ',res);
    if (res.status === 200) {
      availableClubs.value = res.data.data;
    } else {
      console.error("Failed to fetch clubs:", res.data.message);
    }
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
  }
};

  // Load clubs on component mount
  onMounted(fetchClubs);
  
    const joinClub = async (clubId) => {
      try {
        const res = await $axios.post("/api/clubs/join-club", {
          clubId: clubId,
          userId: loggedInUserId
        });
        console.log('res : ',res);
        if (res.status === 201) {
          fetchClubs();
          alert("Successfully joined the club!");
        } else {
          alert("Failed to join the club: " + res.data.message);
        }
      } catch (error) {
        alert("API Error: " + (error.response?.data?.message || error.message));
      }
    };
  </script>
  
  
  <style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  body {
    font-family: "Inter", sans-serif;
  }
  </style>
  