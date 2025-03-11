<template>
    <div class="flex h-screen bg-gray-900 text-white">
      <!-- Sidebar -->
      <div class="w-1/4 bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg p-4 border-r border-gray-700">
        <h2 class="text-lg font-semibold mb-6 text-gray-300">💬 Club Chat</h2>
        <ul>
          <li
            v-for="user in users"
            :key="user.id"
            class="flex items-center space-x-3 p-3 rounded-lg transition hover:bg-gray-800 cursor-pointer"
          >
            <div class="w-10 h-10 bg-gray-600 text-white flex items-center justify-center rounded-full">
              {{ user.name[0] }}
            </div>
            <span class="text-gray-200">{{ user.name }}</span>
          </li>
        </ul>
      </div>
  
      <!-- Main Chat Area -->
      <div class="flex flex-col flex-1 h-full">
        <!-- Club Header -->
        <div class="bg-gray-950 bg-opacity-90 p-5 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">🚀 Tech Innovators</h1>
            <p class="text-gray-400 text-sm">Building the future, one innovation at a time.</p>
          </div>
          <div class="text-gray-400 text-sm">
            <p>Members: <span class="font-semibold text-gray-200">{{ users.length }}</span></p>
            <p>Status: <span class="text-green-400">Active</span></p>
          </div>
        </div>
  
        <!-- Messages -->
        <div class="flex-1 p-6 overflow-y-auto space-y-4" ref="chatContainer">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex"
            :class="msg.isMine ? 'justify-start' : 'justify-end'"
          >
            <div
              class="p-4 max-w-xs rounded-2xl shadow-md text-sm"
              :class="msg.isMine ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-300'"
            >
              <p>{{ msg.text }}</p>
            </div>
          </div>
        </div>
  
        <!-- Chat Input -->
        <div class="p-4 bg-gray-950 bg-opacity-80 backdrop-blur-lg flex items-center space-x-3">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            class="flex-1 p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-gray-600 outline-none transition"
            @keyup.enter="sendMessage"
          />
          <button
            class="p-3 bg-gray-700 text-white rounded-full hover:scale-105 transition"
            @click="sendMessage"
          >
            📩
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick } from "vue";
  definePageMeta({
    title: "Club Chat",
    description: "Chat with club members",
    layout: "club",
  })
  const users = ref([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);
  
  const messages = ref([]);
  const newMessage = ref("");
  const chatContainer = ref(null);
  
  // Fix localStorage issue (ensure it's only used on client-side)
  const loadMessages = () => {
    if (process.client) {
      messages.value = JSON.parse(localStorage.getItem("chatMessages")) || [];
    }
  };
  
  const saveMessages = () => {
    if (process.client) {
      localStorage.setItem("chatMessages", JSON.stringify(messages.value));
    }
  };
  
  const sendMessage = () => {
    if (!newMessage.value.trim()) return;
  
    messages.value.push({ id: Date.now(), text: newMessage.value, isMine: true });
    newMessage.value = "";
    saveMessages();
    scrollToBottom();
  };
  
  const scrollToBottom = () => {
    nextTick(() => {
      chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight, behavior: "smooth" });
    });
  };
  
  watch(messages, saveMessages, { deep: true });
  
  onMounted(() => {
    loadMessages();
    scrollToBottom();
  });
  </script>
  
  <style>
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #4b4b4b;
    border-radius: 6px;
  }
  </style>
  