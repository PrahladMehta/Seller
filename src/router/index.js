import Dashboard from '@/components/Dashboard.vue'
import Home from '@/components/Home.vue'
import Order from '@/components/Order.vue'
import Product from '@/components/Product.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'
import Otp from '@/components/Otp.vue'
import Forgetpassword from '@/components/Forgetpassword.vue'
import Updateforgetpassword from '@/components/Updateforgetpassword.vue'
import Resetpassword from '@/components/Resetpassword.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path:'/order',
      name:'order',
      component:Order
    },{
      path:'/product',
      name:'product',
      component:Product
    },{
      path:'/dashboard',
      name:'dashboard',
      component:Dashboard
    },
    {
      path:'/',
      name:'home',
      component:Home
    },
    {
      path:'/signup',
      name:'signup',
      component:Signup
    },{
      path:'/login',
      name:'login',
      component:Login
    },{
      path:'/forgetpassword',
      name:'forgetpassword',
      component:Forgetpassword
    },{
      path:'/resetpassword', 
      name:'resetpassword',
      component:Resetpassword
    },{
      path:'/updateforgetpassword/:token',
      name:'updateforgetpassword',
      component:Updateforgetpassword
    },{
      path:'/otp',
      name:'otp',
      component:Otp
    }

  ]
})

export default router
