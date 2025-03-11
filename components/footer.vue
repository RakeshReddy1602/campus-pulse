<template>
  <footer class="bg-gray-900 text-gray-300 py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Quick Links -->
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

        <!-- Connect -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Connect</h3>
          <div class="flex space-x-4">
            <a v-for="social in socials" :key="social.icon" :href="social.url" 
               class="hover:text-white transition-colors">
              <component :is="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Contact Us -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Contact Us</h3>
          <ul class="space-y-2">
            <li><a href="mailto:contact@college.com" class="hover:text-white transition-colors">Email: contact@college.com</a></li>
            <li><a href="tel:+1234567890" class="hover:text-white transition-colors">Phone: +1 (234) 567-890</a></li>
            <li><a href="https://www.college.com/contact" class="hover:text-white transition-colors">Visit Contact Page</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Newsletter</h3>
          <form action="#" method="POST" class="flex flex-col space-y-4">
            <input type="email" name="email" placeholder="Enter your email" 
                   class="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-300">Subscribe</button>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-8 pt-8 border-t border-gray-800 text-center">
        <p>&copy; 2025 College Portal. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-vue-next';

// Links for the footer
const links = [
  { text: 'Home', url: '/' },
  { text: 'About Us', url: '/' },
  { text: 'Admissions', url: '/' },
  { text: 'Courses', url: '/' }
];

// Social media links with URLs replaced by '/'
const socials = [
  { icon: Facebook, url: '/' },
  { icon: Twitter, url: '/' },
  { icon: Instagram, url: '/' },
  { icon: Linkedin, url: '/' }
];
</script>
