<template>
  <div class="order-section">
    <h1>Orders</h1>
    <div class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-item">
        <div class="order-header">
          <span class="order-id">Order #{{ order.id }}</span>
          <span :class="['order-status', order.status]">{{ order.status }}</span>
        </div>

        <div class="order-image-details">

          <img :src="order.image" alt="image">

       
        <div class="order-details">
          <p><strong>PRODUCT :</strong>  {{ order.title }}</p>
          <p><strong>QUANTITY: </strong> {{ order.quantity }}</p>
       
        </div>

        <div class="order-details">
          <p><strong>ADDRESS: </strong>  {{ order.address }}</p>
          <p><strong>Customer: </strong> {{ order.customer }}</p>
          <p><strong>Total: </strong> ₹ {{ order.total.toFixed(2) }}</p>
          <p><strong>Date: </strong>  {{ order.date.split('T')[0] }}</p>
        </div>

      </div>
        <div class="order-actions">
          <label for="status">Update Status:</label>
          <select :id="'status-' + order.id" v-model="order.status" @change="updateOrderStatus(order)">
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { getAllOrderRoute,changeOrderStatusRoute } from './Utils';


import { onMounted ,} from 'vue';
import { useRouter } from 'vue-router';
 
const orders = ref([
  { id: 1, customer: 'John Doe', total: 99.99, date: '2023-05-15', status: 'pending' },
  { id: 2, customer: 'Jane Smith', total: 149.99, date: '2023-05-14', status: 'processing' },
  { id: 3, customer: 'Bob Johnson', total: 199.99, date: '2023-05-13', status: 'shipped' },
  { id: 4, customer: 'Alice Brown', total: 79.99, date: '2023-05-12', status: 'delivered' },
  { id: 5, customer: 'Charlie Davis', total: 129.99, date: '2023-05-11', status: 'pending' },
]);

const router=useRouter();


const getOrder=async()=>{

  try{

    if(!localStorage.getItem('shoptoken')){
      router.push('/login');
      return;
    }

    const response=await fetch(getAllOrderRoute,{

      method:'GET',
      headers:{
        authorization:localStorage.getItem('shoptoken'),
      }

    });

    const data=await response.json();

    console.log(data);

    orders.value=data.orders




  }catch(e){

    console.log("ERROR");
    console.log(e);


  }
}

const updateOrderStatus =async (order) => {
  console.log(`Order ${order.id} status updated to: ${order.status}`);
    
  const response=await fetch(changeOrderStatusRoute,{
    method:'POST',
    headers:{
      authorization:localStorage.getItem('shoptoken'),
      'Content-Type':'application/json',

    },
    body:JSON.stringify({order_id:order.order_id,status:order.status})
  });

  const data=await response.json();

  console.log(data);
  

 
};

onMounted(getOrder);
</script>

<style>
:root {
  --primary-color: #1a2a3a;
  --secondary-color: #2c3e50;
  --accent-color: #3498db;
  --text-color: #ecf0f1;
  --bg-color: #0f1a2a;
  --card-bg-color: #1c2b3a;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
}

.order-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: var(--accent-color);
  text-align: center;
  margin-bottom: 20px;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  background-color: var(--card-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.order-id {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--accent-color);
}

.order-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: capitalize;
}

.order-status.pending {
  background-color: #f39c12;
  color: #ffffff;
}

.order-status.processing {
  background-color: #3498db;
  color: #ffffff;
}

.order-status.shipped {
  background-color: #2ecc71;
  color: #ffffff;
}

.order-status.delivered {
  background-color: #27ae60;
  color: #ffffff;
}

.order-details {

  margin-bottom: 15px;
  margin-top:15px;


}

.order-image-details{

    display:flex;
    gap:30px;

}

.order-image-details img{
  width:200px;
  margin-bottom:10px;
  
}

.order-details p {
  margin: 10px 0;
  text-align: left;


  
}

.order-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

select {
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-color);
}

@media (max-width: 600px) {
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>