<template>
      <div class="home-page">
    
    
        <main>
          <section class="hero">
            <h1>Welcome to SellerHub</h1>
         
            <p>Manage your products, track orders, and grow your business all in one place.</p>
            <br>
            <button class="cta-button">Get Started</button>
          </section>
    
          <section class="quick-stats">
            <div class="stat-card">
              <h3>Total Sales</h3>
              <p class="stat-value">₹ {{ totalSales.toLocaleString() }}</p>
            </div>
            <div class="stat-card">
              <h3>Orders</h3>
              <p class="stat-value">{{ orders.toLocaleString() }}</p>
            </div>
            <div class="stat-card">
              <h3>Products</h3>
              <p class="stat-value">{{ products.toLocaleString() }}</p>
            </div>
          </section>
    
          <section class="features">
            <h2>Key Features</h2>
            <div class="feature-grid">
              <div class="feature-card">
                <i class="feature-icon">📊</i>
                <h3>Real-time Analytics</h3>
                <p>Track your sales and performance with up-to-the-minute data.</p>
              </div>
              <div class="feature-card">
                <i class="feature-icon">🏷️</i>
                <h3>Easy Product Management</h3>
                <p>Add, edit, and organize your products effortlessly.</p>
              </div>
              <div class="feature-card">
                <i class="feature-icon">📦</i>
                <h3>Order Fulfillment</h3>
                <p>Streamline your order processing and shipping workflows.</p>
              </div>
              <div class="feature-card">
                <i class="feature-icon">💰</i>
                <h3>Secure Payments</h3>
                <p>Receive payments safely and manage your earnings with ease.</p>
              </div>
            </div>
          </section>
        </main>
    
        <footer class="footer">
          <p>&copy; 2023 SellerHub. All rights reserved.</p>
        </footer>
      </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    
    // Sample data - replace with actual data in a real application
    const totalSales = ref(15235000);
    const orders = ref(1234);
    const products = ref(56);
    </script>
    
    <style scoped>
   
    </style>