
 <template>
  <div class="auth-container">
    <div class="image-container"></div>
    <form class="auth-form" action="" @submit.prevent="handleSubmit">
      <h1>Sign up</h1>

      <div class="two-value">
        <div>
        <input class="auth-input" type="text" placeholder="First Name" @change="handleChange" name="firstname">
      </div>
      <div>
        <input class="auth-input" type="text" placeholder="Last Name" @change="handleChange" name="lastname">
      </div>
      </div>


   
      <div>
        <input class="auth-input" type="email" placeholder="Email" @change="handleChange" name="email">
      </div>

      
      <div class="two-value">   <div>
        <input class="auth-input" type="password" placeholder="Password" @change="handleChange" name="password">
      </div>
      <div>
        <input class="auth-input" type="password" placeholder="Confirm Password" @change="handleChange" name="confirmpassword">
      </div></div>


      <div class="buttoncontianer">
        
      <button class="auth-button">Submit</button>
      <p>Already have account <router-link to="/login" class="links" > Login</router-link></p>
      </div>
    
    </form>
  </div>
</template>

<script>
// Script content remains unchanged
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

import { signUpRoute } from './Utils';

export default {
  setup(props) {
    const router = useRouter();
    const emailData = inject('emailData');
    const user = reactive({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: '',
      role:'seller'
    });

    const handleChange = (e) => {
      user[e.target.name] = e.target.value;
      console.log(user);
      emailData.email = user.email;
      console.log(emailData);
    }

    const handleSubmit = async () => {
      if (user.firstname.length === 0) {
        alert("first name is empty");
        return;
      }
      if (user.lastname.length === 0) {
        alert("last name is empty");
        return;
      }
      if (user.password.length === 0) {
        alert("password is empty");
        return;
      }
      if (user.confirmpassword.length === 0) {
        alert("confirm password is empty");
        return;
      }
      if (user.password !== user.confirmpassword) {
        alert("Password and confirm password do not match");
        return;
      }

      try {
        const response = await fetch(signUpRoute, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        const data = await response.json();

        if (data.success) {
      
          router.push('/otp');
          localStorage.setItem('shoptoken',JSON.stringify(data.token));
          return;
        }

        alert(data.message);
      } catch (e) {
        console.log("ERROR");
        console.log(e);
      }
    }

    return { user, handleChange, handleSubmit };
  }
};
</script>

<style scoped>

</style>