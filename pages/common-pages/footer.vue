<template>
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="link in links" :key="link.text">
                <NuxtLink :to="link.url" class="hover:text-white transition-colors">
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4">Connect</h3>
            <div class="flex space-x-4">
              <a v-for="social in socials" :key="social.icon" href="#" 
                 class="hover:text-white transition-colors">
                <Icon :name="social.icon" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2025 College Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  

  <script setup>
      const socials = [
    { icon: 'ph:facebook-logo' },
    { icon: 'ph:twitter-logo' },
    { icon: 'ph:instagram-logo' },
    { icon: 'ph:linkedin-logo' }
  ];

</script>