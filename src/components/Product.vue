<template>
  <div class="product-section">
    <h1>Products</h1>
    <button @click="openAddForm" class="add-btn">Add New Product</button>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image" :alt="product.title" class="product-image">
        <div class="product-details">
          <h2>{{ product.title }}</h2>
          <div class="product-info">
            <p><strong>Price:</strong> ₹{{ product.price }}</p>
            <p><strong>Quantity:</strong> {{ product.quantity }}</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
          </div>
          <p class="product-description">{{ product.description }}</p>
        </div>
        <div class="product-actions">
          <button @click="openUpdateForm(product)" class="update-btn">Update</button>
          <button @click="deleteProduct(product._id)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showUpdateForm" class="form-overlay" @click="closeUpdateForm">
        <div class="form" @click.stop>
          <h2>Update Product</h2>
          <form @submit.prevent="updateProduct">
            <div class="form-group">
              <label for="update-name">Name:</label>
              <input type="text" id="update-name" v-model="updateFormData.title" required>
            </div>
            <div class="form-group">
              <label for="update-price">Price:</label>
              <input type="number" id="update-price" v-model="updateFormData.price" step="0.01" required>
            </div>
            <div class="form-group">
              <label for="update-quantity">Quantity:</label>
              <input type="number" id="update-quantity" v-model="updateFormData.quantity" required>
            </div>
            <div class="form-group">
              <label for="update-category">Category:</label>
              <select id="update-category" v-model="updateFormData.category" required>
                <option value="Electronic">Electronic</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Beauty">Beauty</option>
                <option value="Toys & Games">Toys & Games</option>
              </select>
            </div>
            <div class="form-group">
              <label for="update-description">Description:</label>
              <textarea id="update-description" v-model="updateFormData.description" required></textarea>
            </div>
            <div class="form-group">
              <label for="update-image">Image:</label>
              <input type="file" id="update-image" @change="handleImageUpload($event, 'update')" accept="image/*">
            </div>
            <div class="form-actions">
              <button type="submit" class="update-btn">Update</button>
              <button type="button" @click="closeUpdateForm" class="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showAddForm" class="form-overlay" @click="closeAddForm">
        <div class="form" @click.stop>
          <h2>Add New Product</h2>
          <form @submit.prevent="addProduct">
            <div class="form-group">
              <label for="add-title">Name:</label>
              <input type="text" id="add-title" v-model="addFormData.title" required>
            </div>
            <div class="form-group">
              <label for="add-price">Price:</label>
              <input type="number" id="add-price" v-model="addFormData.price" step="0.01" required>
            </div>
            <div class="form-group">
              <label for="add-quantity">Quantity:</label>
              <input type="number" id="add-quantity" v-model="addFormData.quantity" required>
            </div>
            <div class="form-group">
              <label for="add-category">Category:</label>
              <select id="add-category" v-model="addFormData.category" required>
                <option value="Electronic">Electronic</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Beauty">Beauty</option>
                <option value="Toys & Games">Toys & Games</option>
              </select>
            </div>
            <div class="form-group">
              <label for="add-description">Description:</label>
              <textarea id="add-description" v-model="addFormData.description" required></textarea>
            </div>
            <div class="form-group">
              <label for="add-image">Image:</label>
              <input type="file" id="add-image" @change="handleImageUpload($event, 'add')" accept="image/*" required>
            </div>
            <div class="form-actions">
              <button type="submit" class="add-btn">Add Product</button>
              <button type="button" @click="closeAddForm" class="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>


  </div>
</template>

<script setup>
import { ref } from 'vue';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter();
const products = ref([
  // { id: 1, title: 'Product 1', price: 19.99, quantity: 100, image: 'https://via.placeholder.com/150', category: 'Electronic', description: 'A sample product description' },
  // { id: 2, title: 'Product 2', price: 29.99, quantity: 50, image: 'https://via.placeholder.com/150', category: 'Clothing', description: 'Another sample product description' },
  // { id: 3, title: 'Product 3', price: 39.99, quantity: 75, image: 'https://via.placeholder.com/150', category: 'Books', description: 'Yet another sample product description' },
]);

const showUpdateForm = ref(false);
const showAddForm = ref(false);
const updateFormData = ref({
  id: null,
  title: '',
  price: 0,
  quantity: 0,
  image: undefined,
  description: '',
  category: ''
});
const addFormData = ref({
  title: '',
  description: '',
  price: 0,
  quantity: 0, 
  image: undefined,
  category: ''
});

const openUpdateForm = (product) => {
  updateFormData.value = { ...product };
  updateFormData.value.image=undefined;
  updateFormData.value.id=product._id;



  showUpdateForm.value = true;
};

const closeUpdateForm = () => {
  showUpdateForm.value = false;
};

const openAddForm = () => {
  addFormData.value = { title: '', price: 0, quantity: 0, image: undefined, description: '', category: '' };
  showAddForm.value = true;
};

const closeAddForm = () => {
  showAddForm.value = false;
};

const updateProduct =async () => {

  const formData=new FormData();

  for(let key in updateFormData.value){
    formData.append(key,updateFormData.value[key]);

}
  formData.append("productId",updateFormData.value.id);

  if(!formData.get('image')){
    formData.delete('image');
  }


   const response=await fetch("http://localhost:4000/api/v1/updateproduct",{
    method:'POST',
    body:formData,
    headers:{
      // 'Content-Type':'application/json',
      'authorization':localStorage.getItem('shoptoken'),
    }
   });

   const data=await response.json();


   getAllProduct();

  
  closeUpdateForm();
};


const getAllProduct=async()=>{

  try{

    if(!localStorage.getItem('shoptoken')){
      router.push('/login');
      return;
    }
      
    const response=await fetch("http://localhost:4000/api/v1/getallproduct",{
      method:'GET',
      headers:{
        "Authorization":localStorage.getItem('shoptoken'),
      }
    });


    const data=await response.json();

    products.value=data.allproduct;

  }catch(e){
    console.log("ERROR");
    console.log(e);
  }


}

const addProduct = async () => {
  const newProduct = addFormData.value;

  const formData = new FormData();

  for (let key in newProduct) {
    formData.append(key, newProduct[key]);
  }

  formData.append('token', localStorage.getItem('shoptoken'));

  const response = await fetch("http://localhost:4000/api/v1/addproduct", {
    method: 'POST',
    body: formData,
    headers: {
      'authorization': localStorage.getItem("shoptoken")
    },
  });

  const data = await response.json();

  if (data.success) {

    closeAddForm();

     getAllProduct();


    return;
  }

 
  closeAddForm();
};

const deleteProduct = async (id) => {

     
     console.log(id);

     const send={productId:id};

    const response=await fetch("http://localhost:4000/api/v1/removeproduct",{
      method:"POST",
      body:JSON.stringify(send),
      headers:{
        'Content-Type':'application/json',
        authorization:localStorage.getItem('shoptoken'),
      },
   
     

    });

    const data=await response.json();
 

    getAllProduct();
      
  
};

const handleImageUpload = (event, formType) => {
  const file = event.target.files[0];
  if (file) {
    if (formType === 'update') {
      updateFormData.value.image = file;
    } else {
      addFormData.value.image = file;
    }
  }
};

onMounted(getAllProduct);
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

.product-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
}

h1 {
  color: var(--accent-color);
  text-align: center;
  margin-bottom: 20px;
}

.add-btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #2ecc71;
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #27ae60;
}

.product-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.product-item {
  background-color: var(--card-bg-color);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.product-details {
  flex-grow: 1;
}

.product-details h2 {
  color: var(--accent-color);
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.product-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

.product-description {
  font-size: 0.9rem;
  color: #a0aec0;
}

.product-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.update-btn {
  background-color: var(--accent-color);
  color: var(--text-color);
}

.update-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
  color: var(--text-color);
}

.delete-btn:hover {
  background-color: #c0392b;
}

.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.form {
  background-color: var(--primary-color);
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form h2 {
  color: var(--accent-color);
  margin-bottom: 15px;
  text-align: center;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--text-color);
  font-weight: bold;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 0.9rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-group input[type="file"] {
  padding: 5px;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

.form-actions button {
  flex: 1;
  padding: 8px;
  font-size: 0.9rem;
}

.cancel-btn {
  background-color: var(--secondary-color);
  color: var(--text-color);
}

.cancel-btn:hover {
  background-color: #34495e;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.form {
  animation: slideDown 0.3s ease-out;
}

@media (max-width: 768px) {
  .product-list {
    grid-template-columns: 1fr;
  }
  
  .form {
    width: 95%;
    max-width: none;
  }
}
</style>