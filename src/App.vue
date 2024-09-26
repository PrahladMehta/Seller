<script setup>
import { reactive, provide, ref, onMounted } from 'vue'
import { UserIcon, UserPlusIcon, MenuIcon, XIcon, LogOutIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const emailData = reactive({
  email: ""
})

provide('emailData', emailData)

const isMenuOpen = ref(false)
const isLoggedIn = ref(false)
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('shoptoken')
}

const logout = () => {
  localStorage.removeItem('shoptoken')
  isLoggedIn.value = false
  router.push('/')
}

onMounted(() => {
  checkLoginStatus()
  window.addEventListener('storage', checkLoginStatus)
})
</script>

<template>
  <header class="header">
    <router-link to="/" style="text-decoration: none;"><div class="logo">SellerHub</div></router-link>
    <button class="menu-toggle" @click="toggleMenu">
      <MenuIcon v-if="!isMenuOpen" class="icon" />
      <XIcon v-else class="icon" />
    </button>
    <nav :class="{ 'open': isMenuOpen }">
      <router-link to="/dashboard" href="#" class="nav-link" @click="isMenuOpen = false">Dashboard</router-link>
      <router-link to="/product" class="nav-link" @click="isMenuOpen = false">Products</router-link>
      <router-link to="/order" class="nav-link" @click="isMenuOpen = false">Orders</router-link>
      <template v-if="!isLoggedIn">
        <router-link to="/login" class="nav-link login-btn" @click="isMenuOpen = false">
          <UserIcon class="icon" />
          Login
        </router-link>
        <router-link to="/signup" class="nav-link signup-btn" @click="isMenuOpen = false">
          <UserPlusIcon class="icon" />
          Sign Up
        </router-link>
      </template>
      <button v-else class="nav-link logout-btn" @click="logout">
        <LogOutIcon class="icon" />
        Logout
      </button>
    </nav>
  </header>
  <router-view></router-view>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--primary-color);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-color);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
}

nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.login-btn, .signup-btn, .logout-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.login-btn {
  background-color: var(--secondary-color);
}

.signup-btn {
  background-color: var(--accent-color);
  color: var(--primary-color);
}

.logout-btn {
  background-color: var(--danger-color);
  color: var(--primary-color);
  border: none;
  cursor: pointer;
}

.icon {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  nav {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--primary-color);
    padding: 1rem;
  }

  nav.open {
    display: flex;
  }
}
</style>