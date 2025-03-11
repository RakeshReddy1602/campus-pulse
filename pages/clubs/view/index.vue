<template>
    <div>
      <h1 class="text-xl">Hello from here</h1>
      <h1>{{ club.name }}</h1>
      <p>{{ club.description }}</p>
      <!-- Add more club details here -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  definePageMeta({
    title: 'Club Details',
    description: 'View club details',
    layout: 'club',
  })

  const route = useRoute();
  const router = useRouter();
  const club = ref({
      id: 8,
      name: 'Mock Club',
      description: 'This is a mock club description.',
    });
  
  const fetchClubDetails = async (clubId) => {
    // Fetch club details from the server or local storage
    // For demonstration, we'll use a mock club object
    club.value = {
      id: clubId,
      name: 'Mock Club',
      description: 'This is a mock club description.',
    };
    console.log('club : ',club);
    
  };
  
  onMounted(() => {
    const clubId = localStorage.getItem('clubId');
    if (clubId) {
      debugger;
      fetchClubDetails(clubId);
    } else {
      router.push('/clubs'); // Redirect to clubs page if clubId is not found
    }
  });
  
  onBeforeUnmount(() => {
    localStorage.removeItem('clubId');
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>