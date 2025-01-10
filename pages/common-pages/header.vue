
<template>
  <header class="bg-gradient-to-r from-indigo-100 via-blue-50 to-teal-100">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-9 w-14" src="/public/logo.jpg" alt="" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-indigo-800"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6 text-teal-500" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold text-indigo-800">
            Clubs 
            <ChevronDownIcon class="size-5 flex-none text-indigo-500" aria-hidden="true" />
          </PopoverButton>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div
                  v-for="item in products"
                  :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-indigo-50"
                >
                  <div
                    class="flex size-11 flex-none items-center justify-center rounded-lg bg-indigo-100 group-hover:bg-white"
                  >
                    <component :is="item.icon" class="size-6 text-indigo-700 group-hover:text-teal-500" aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <NuxtLink :to="item.href"  class="block font-semibold text-indigo-900">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                      <p class="mt-1 text-indigo-700">{{ item.description }}</p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold text-indigo-800">
            Elections 
            <ChevronDownIcon class="size-5 flex-none text-indigo-500" aria-hidden="true" />
          </PopoverButton>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div
                  v-for="item in elections"
                  :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-indigo-50"
                >
                  <div
                    class="flex size-11 flex-none items-center justify-center rounded-lg bg-indigo-100 group-hover:bg-white"
                  >
                    <component :is="item.icon" class="size-6 text-indigo-700 group-hover:text-teal-500" aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <NuxtLink :to="item.href"  class="block font-semibold text-indigo-900">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                      <p class="mt-1 text-indigo-700">{{ item.description }}</p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold text-indigo-800">
            Events 
            <ChevronDownIcon class="size-5 flex-none text-indigo-500" aria-hidden="true" />
          </PopoverButton>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div
                  v-for="item in events"
                  :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-indigo-50"
                >
                  <div
                    class="flex size-11 flex-none items-center justify-center rounded-lg bg-indigo-100 group-hover:bg-white"
                  >
                    <component :is="item.icon" class="size-6 text-indigo-700 group-hover:text-teal-500" aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <NuxtLink :to="item.href"  class="block font-semibold text-indigo-900">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                      <p class="mt-1 text-indigo-700">{{ item.description }}</p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <NuxtLink to="/" class="text-sm font-semibold text-indigo-800">Features</NuxtLink>
        <NuxtLink to = "/dashboard" class="text-sm font-semibold text-indigo-800">Dashboard</NuxtLink>
      </PopoverGroup>

      <Popover class="relative hidden lg:flex ml-8">
        <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold text-indigo-800">
          Profile
          <ChevronDownIcon class="size-5 flex-none text-indigo-500" aria-hidden="true" />
        </PopoverButton>

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <PopoverPanel class="absolute right-0 z-10 mt-3 w-48 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
            <div class="p-4">
              <NuxtLink to="/profile/profile" class="block rounded-lg p-2 text-sm font-semibold text-indigo-800 hover:bg-indigo-50">
                Your Profile
              </NuxtLink>
              <NuxtLink to="/auth/login" class="block rounded-lg p-2 text-sm font-semibold text-indigo-800 hover:bg-indigo-50">
                Logout
              </NuxtLink>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </nav>

    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-indigo-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-300"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-9 w-14" src="/public/logo.jpg" alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-indigo-800" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6 text-teal-500" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-300">
            <div class="space-y-2 py-6">
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosureButton
                  class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold text-indigo-800 hover:bg-teal-50"
                >
                  Clubs
                  <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'size-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                    <DisclosureButton
                    v-for="item in products"
                    :key="item.name"
                    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-indigo-800 hover:bg-teal-50">
                      <NuxtLink to="item.href" class="block font-semibold text-indigo-800 hover:bg-teal-50">
                        {{ item.name }}
                      </NuxtLink>
                    </DisclosureButton>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosureButton
                  class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold text-indigo-800 hover:bg-teal-50"
                >
                  Clubs
                  <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'size-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                    <DisclosureButton
                    v-for="item in products"
                    :key="item.name"
                    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-indigo-800 hover:bg-teal-50">
                      <NuxtLink to="item.href" class="block font-semibold text-indigo-800 hover:bg-teal-50">
                        {{ item.name }}
                      </NuxtLink>
                    </DisclosureButton>
                </DisclosurePanel>
              </Disclosure>
              <NuxtLink to="/" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-indigo-800 hover:bg-teal-50">
                Features
              </NuxtLink>
              <NuxtLink to="/dashboard" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-indigo-800 hover:bg-teal-50">
                Dashboard
              </NuxtLink>
            
            </div>
            <div class="py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-indigo-800 hover:bg-teal-50">
                Your Profile
              </a>
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-indigo-800 hover:bg-teal-50">
                Logout
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid';

const events = [
  { name: 'My Events', description: 'Get a better understanding of your traffic', href: '/events/my-events', icon: ChartPieIcon },
  { name: 'Create New Event', description: 'Your customers’ data will be safe and secure', href: '/events/create-new', icon: FingerPrintIcon },
  // { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  // { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
];
const elections = [
  { name: 'My Eelctions', description: 'Get a better understanding of your traffic', href: '/elections/my-elections', icon: ChartPieIcon },
  { name: 'Create New Election', description: 'Your customers’ data will be safe and secure', href: '/elections/create-new', icon: FingerPrintIcon },
  // { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  // { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
];
const products = [
  { name: 'My Clubs', description: 'Get a better understanding of your traffic', href: '/clubs/my-clubs', icon: ChartPieIcon },
  { name: 'Availabile Clubs', description: 'Speak directly to your customers', href: '/clubs/clubs-list', icon: CursorArrowRaysIcon },
  { name: 'Create New Club', description: 'Your customers’ data will be safe and secure', href: '/clubs/create-new', icon: FingerPrintIcon },
  // { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  // { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
];
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

const mobileMenuOpen = ref(false);
</script>
```