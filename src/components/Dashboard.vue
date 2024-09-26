<template>
      <div class="dashboard">
        <h1>Seller Dashboard</h1>
        <div class="chart-container">
          <div class="chart-wrapper">
            <h2>Most Sold Products</h2>
            <canvas ref="soldProductsChart"></canvas>
          </div>
          <div class="chart-wrapper">
            <h2>Most Viewed Products</h2>
            <canvas ref="viewedProductsChart"></canvas>
          </div>
        </div>
      </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import Chart from 'chart.js/auto';
    
    const soldProductsChart = ref(null);
    const viewedProductsChart = ref(null);
    
    const createChart = (ctx, data, label) => {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.name),
          datasets: [{
            label: label,
            data: data.map(item => item.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#ecf0f1'
              }
            },
            x: {
              ticks: {
                color: '#ecf0f1'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: '#ecf0f1'
              }
            }
          }
        }
      });
    };
    
    onMounted(() => {
      // Sample data - replace with actual data from your backend
      const soldProductsData = [
        { name: 'Product A', value: 150 },
        { name: 'Product B', value: 120 },
        { name: 'Product C', value: 100 },
        { name: 'Product D', value: 80 },
        { name: 'Product E', value: 50 },
      ];
    
      const viewedProductsData = [
        { name: 'Product X', value: 500 },
        { name: 'Product Y', value: 450 },
        { name: 'Product Z', value: 400 },
        { name: 'Product W', value: 350 },
        { name: 'Product V', value: 300 },
      ];
    
      createChart(soldProductsChart.value, soldProductsData, 'Units Sold');
      createChart(viewedProductsChart.value, viewedProductsData, 'View Count');
    });
    </script>
    
    <style scoped>
    :root {
      --primary-color: #1a2a3a;
      --secondary-color: #2c3e50;
      --accent-color: #3498db;
      --text-color: #ecf0f1;
      --bg-color: #0f1a2a;
      --card-bg-color: #1c2b3a;
    }
    
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: var(--bg-color);
      color: var(--text-color);
    }
    
    h1 {
      color: var(--accent-color);
      text-align: center;
      margin-bottom: 30px;
      font-size: 2.5rem;
    }
    
    h2 {
      color: var(--accent-color);
      margin-bottom: 20px;
      font-size: 1.8rem;
    }
    
    .chart-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;
    }
    
    .chart-wrapper {
      flex: 1 1 calc(50% - 10px);
      min-width: 300px;
      background-color: var(--card-bg-color);
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    canvas {
      width: 100% !important;
      height: auto !important;
      max-height: 400px;
    }
    
    @media (max-width: 768px) {
      .chart-wrapper {
        flex: 1 1 100%;
      }
    }
    </style>