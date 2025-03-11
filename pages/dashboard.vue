<!-- DashboardContent.vue -->
<template>
  <main class="min-h-screen bg-gradient-to-br from-light-gray via-indigo-100 to-indigo-200 p-8">
    <!-- Header Section -->
    <header class="mb-8">
      <h1 class="text-4xl font-extrabold text-charcoal mb-3">Welcome back, {{ loggedInUser?.name }}!</h1>
      <p class="text-xl text-gray-700">Here's what's happening today. Get ready for a burst of data!</p>
    </header>

    <!-- Overview Cards (Colorful Version) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="bg-gradient-to-r from-rose-100 to-rose-300 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-400"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900 mb-2">{{ stat.name }}</p>
            <h3 class="text-3xl font-bold text-white">{{ stat.value }}</h3>
            <p class="text-sm text-green-700 font-bold mt-2 flex items-center">
              <ArrowUpIcon class="h-4 w-4 mr-1" />
              {{ stat.change }}
            </p>
          </div>
          <div class="bg-yellow-200 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <component :is="stat.icon" class="h-7 w-7 text-yellow-700" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Activities Section --><!-- Recent Activities Section -->
<div class="lg:col-span-2">
  <div class="bg-gradient-to-r from-yellow-300 via-orange-200 to-red-200 rounded-xl shadow-2xl border border-gray-300 overflow-hidden hover:shadow-3xl transition-all duration-300">
    <div class="p-6 border-b border-gray-200 bg-yellow-100">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-800">Recent Activities</h2>
        <button class="text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-all">View All</button>
      </div>
    </div>
    <div class="divide-y divide-gray-200">
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="p-6 flex items-start space-x-4 hover:bg-yellow-50 transition-all transform hover:scale-105 bg-gradient-to-l from-yellow-200 via-orange-200 to-yellow-300"
      >
        <div class="bg-yellow-400 p-2 rounded-lg shadow-xl">
          <component :is="activity.icon" class="h-6 w-6 text-yellow-700" />
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700">{{ activity.title }}</p>
          <div class="flex items-center mt-2">
            <span class="text-sm text-gray-500">{{ activity.time }}</span>
            <span class="mx-2 text-gray-300">•</span>
            <span class="text-sm font-semibold text-yellow-600">{{ activity.type }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



      <!-- Quick Actions Section -->
      <div class="lg:col-span-1">
        <div class="bg-gradient-to-r from-teal-500 to-teal-300 rounded-xl shadow-2xl border border-gray-300 p-6 hover:shadow-xl transition-all duration-300">
          <h2 class="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div class="space-y-6">
            <NuxtLink 
            v-for="(action, index) in quickActions"
            :key="index" 
            :to="action.url">>
            <button
              class="w-full flex items-center justify-between p-5 rounded-lg border-2 border-gray-300 hover:border-teal-600 hover:bg-teal-100 hover:scale-105 transition-all duration-300 group"
            >
                <div class="flex items-center space-x-3">
                <div class="p-3 rounded-lg bg-teal-200 group-hover:bg-teal-300 transition-all">
                  <component :is="action.icon" class="h-6 w-6 text-gray-700 group-hover:text-teal-700 transition-all" />
                </div>
                <span class="ml-3 font-medium text-gray-800 group-hover:text-teal-700 transition-all">{{ action.name }}</span>
              </div>
              <ArrowRightIcon class="h-5 w-5 text-gray-400 group-hover:text-teal-600 transition-all" />
            </button>
          </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  /* Custom background for the entire dashboard */
  .bg-gradient-to-br {
    background-image: linear-gradient(to right bottom, #f3f4f6, #c7d2fe, #6b8fe5);
  }
  /* Custom color for text */
  .text-charcoal {
    color: #374151;
  }
  .text-gray-700 {
    color: #4b5563;
  }
  .bg-light-gray {
    background-color: #f3f4f6;
  }
  .text-amber-600 {
    color: #f59e0b;
  }
  .text-yellow-500 {
    color: #fbbf24;
  }
  .text-yellow-600 {
    color: #d97706;
  }
  .bg-pink-100 {
    background-color: #f9a8d4;
  }
  .bg-pink-200 {
    background-color: #fbcfe8;
  }
  .bg-teal-300 {
    background-color: #99f6e4;
  }
</style>


  
  <script setup>
  import { ref } from 'vue';
  // import {useCookie} from '#app';
  import {
    UserGroupIcon,
    CalendarIcon,
    InboxIcon,
    ChartBarIcon,
    UserPlusIcon,
    BellIcon,
    ChatBubbleLeftIcon,
    FlagIcon,
    ArrowUpIcon,
    ArrowRightIcon
  } from '@heroicons/vue/24/outline';
  const loggedInUser = useCookie('user');
  console.log(loggedInUser.value)
  // user.value = JSON.parse(user.value)
  definePageMeta({
    layout: 'common'
  })
  
  const pageTitle = ref('College Dashboard')
  const userName = ref('Srinu Korada')
  
  const stats = [
    { 
      name: 'Active Clubs', 
      value: '38', 
      change: '+12% from last month',
      icon: UserGroupIcon 
    },
    { 
      name: 'Upcoming Events', 
      value: '12',
      change: '+8% from last week', 
      icon: CalendarIcon 
    },
    { 
      name: 'Unread Messages', 
      value: '24',
      change: '+18% from yesterday', 
      icon: InboxIcon 
    },
    { 
      name: 'Ongoing Elections', 
      value: '3',
      change: '+2 new campaigns', 
      icon: ChartBarIcon 
    }
  ]
  
  const activities = [
    { 
      title: 'Photography Club added 8 new members',
      time: '5 minutes ago',
      type: 'Club Activity',
      typeColor: 'text-blue-600',
      icon: UserPlusIcon 
    },
    { 
      title: 'Spring Soccer Tournament registration opens tomorrow',
      time: '1 hour ago',
      type: 'Event Update',
      typeColor: 'text-emerald-600',
      icon: CalendarIcon 
    },
    { 
      title: 'Student Council posts new budget proposal',
      time: '2 hours ago',
      type: 'Announcement',
      typeColor: 'text-amber-600',
      icon: BellIcon 
    },
    { 
      title: 'New Debate Club formed with 15 founding members',
      time: '3 hours ago',
      type: 'New Club',
      typeColor: 'text-purple-600',
      icon: ChatBubbleLeftIcon 
    }
  ]
  
  const quickActions = [
    { name: 'Create New Event', url: 'events/create-new', icon: CalendarIcon },
    { name: 'Join a Club', url: 'clubs/clubs-list', icon: UserGroupIcon },
    { name: 'View Elections', url: 'elections/my-elections', icon: FlagIcon },
    { name: 'View My Clubs', url: 'clubs/my-clubs', icon: BellIcon }
  ]
  </script>