<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-8">
      <header class="mb-12 text-center">
        <h1 class="text-5xl font-extrabold text-white drop-shadow-lg">My Clubs</h1>
        <p class="text-lg text-gray-100 mt-4">Discover communities and connect with like-minded people.</p>
      </header>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(club, index) in clubs"
          :key="index"
          class="rounded-xl overflow-hidden shadow-xl transition-transform transform hover:scale-105"
          :class="clubColors[index % clubColors.length].cardBg"
        >
          <!-- Club Header -->
          <div
            class="flex items-center p-6"
            :class="clubColors[index % clubColors.length].header"
          >
            <div
              class="p-4 rounded-full shadow-md"
              :class="clubColors[index % clubColors.length].iconBg"
            >
              <UserGroupIcon class="h-10 w-10 text-white" />
            </div>
            <div class="ml-4">
              <h2
                class="text-2xl font-bold"
                :class="clubColors[index % clubColors.length].titleText"
              >
                {{ club.name }}
              </h2>
              <span
                class="text-sm font-medium px-3 py-1 rounded-full"
                :class="clubColors[index % clubColors.length].badge"
              >
                {{ club.category }}
              </span>
            </div>
          </div>
  
          <!-- Club Description -->
          <div class="p-6 bg-white">
            <p class="text-gray-600 text-sm mb-4">{{ club.description }}</p>
            <div class="flex justify-between items-center">
              <a
                :href="club.link"
                class="text-sm font-semibold text-gray-700 hover:underline"
              >
                View Details
              </a>
              <button
                class="px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
                :class="clubColors[index % clubColors.length].button"
              >
                Discuss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { UserGroupIcon } from '@heroicons/vue/24/solid';
  
  definePageMeta({
   layout: 'common'
  });

  const clubs = [
    {
      name: "Tech Innovators",
      category: "Technology",
      description: "A club for tech enthusiasts to innovate and share ideas.",
      link: "#",
    },
    {
      name: "Designers Hub",
      category: "Design",
      description: "Connecting creative minds passionate about design.",
      link: "#",
    },
    {
      name: "Fitness Freaks",
      category: "Health",
      description: "Promoting health and fitness with regular activities.",
      link: "#",
    },
    {
      name: "Literary Circle",
      category: "Literature",
      description: "Exploring the beauty of literature through discussions.",
      link: "#",
    },
    {
      name: "Photography Club",
      category: "Photography",
      description: "Capture moments and learn the art of photography.",
      link: "#",
    },
    {
      name: "Entrepreneurs Club",
      category: "Business",
      description: "A hub for budding entrepreneurs to share and grow.",
      link: "#",
    },
  ];
  
  const clubColors = [
    {
      cardBg: "bg-gradient-to-tr from-blue-500 via-blue-400 to-indigo-500",
      header: "bg-gradient-to-tr from-blue-500 via-blue-400 to-indigo-500",
      iconBg: "bg-blue-800",
      badge: "bg-blue-700 text-blue-100",
      titleText: "text-blue-100",
      button: "bg-blue-700 text-white hover:bg-blue-800",
    },
    {
      cardBg: "bg-gradient-to-tr from-green-500 via-green-400 to-teal-500",
      header: "bg-gradient-to-tr from-green-500 via-green-400 to-teal-500",
      iconBg: "bg-green-800",
      badge: "bg-green-700 text-green-100",
      titleText: "text-green-100",
      button: "bg-green-700 text-white hover:bg-green-800",
    },
    {
      cardBg: "bg-gradient-to-tr from-pink-500 via-pink-400 to-purple-500",
      header: "bg-gradient-to-tr from-pink-500 via-pink-400 to-purple-500",
      iconBg: "bg-pink-800",
      badge: "bg-pink-700 text-pink-100",
      titleText: "text-pink-100",
      button: "bg-pink-700 text-white hover:bg-pink-800",
    },
    {
      cardBg: "bg-gradient-to-tr from-yellow-500 via-orange-400 to-red-500",
      header: "bg-gradient-to-tr from-yellow-500 via-orange-400 to-red-500",
      iconBg: "bg-yellow-800",
      badge: "bg-yellow-700 text-yellow-100",
      titleText: "text-white",
      button: "bg-yellow-700 text-white hover:bg-yellow-800",
    },
  ];
  </script>
  
  <style>
  body {
    font-family: 'Inter', sans-serif;
  }
  </style>
  