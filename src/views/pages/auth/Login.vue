<template>
  <div class="LayoutDefault ">
    <div>
      <base-form>
        <h3 class="mb-4">Sign In</h3>
        <form @submit.prevent="handleSubmit">
          <div class="alert alert-danger" v-if="errors && errors.errors">
            <p>{{ errors.message }}</p>
          </div>
          <div class="form-group" >
            <label for="email" class="float-left">Username</label>
            <input
              v-model="$v.user.username.$model"
              id="email"
              name="email"
              placeholder="username"
              class="form-control"
              :class="{ 'is-invalid': $v.user.username.$error }"
            />
            <div v-if="$v.user.username.$error" class="invalid-feedback">
              <span v-if="!$v.user.username.required">Username is required</span>
              <!-- <span v-if="!$v.user.email.email">Username is invalid</span> -->
            </div>
            <div class="text-danger .fs-2" v-if="errors && errors.errors">
              <small>{{ errors.errors.username[0] }}</small>
            </div>
          </div>

          <div class="form-group ">
            <label for="password" class="float-left">Password</label>
            <input
              type="password"
              v-model="$v.user.password.$model"
              id="password"
              name="password"
              placeholder="Password"
              class="form-control"
              :class="{ 'is-invalid': $v.user.password.$error }"
            />
            <div v-if="$v.user.password.$error" class="invalid-feedback">
              <span v-if="!$v.user.password.required"
                >Password is required</span
              >
              <span v-if="!$v.user.password.minLength"
                >Password must be at least 8 characters</span
              >
            </div>
            <div class="text-danger mt-3" v-if="errors">
              <p>
                <small>{{ errors.password }}</small>
              </p>
            </div>
          </div>

          <div class="form-group">
            <button
              class="btn btn-danger"
              type="submit"
              :disabled="submitStatus || $v.$invalid"
            >
              Login <b-spinner small v-if="submitStatus"></b-spinner>
            </button>
          </div>
          <!-- <router-link to="/register">Register</router-link><br />
          <router-link to="/request_token">Forgot Password</router-link> -->
        </form>
      </base-form>
    </div>
  </div>
</template>

<script>
  import Layout from "@/layouts/Layout";
  import { required, email, minLength } from "vuelidate/lib/validators";
  import BaseForm from "@/components/UI/BaseForm.vue";
  import axios from "axios"

  export default {
    components: {
      BaseForm,
      Layout,
    },
    data() {
      return {
        user: {
          username: "",
          password: "",
        },
  submitted: false,
  success: false,
  submitStatus: false,
  errors: "",
  message: "",
      };
    },
    validations: {
      user: {
        username: {
          required,
          
        },
        password: {
          required,
          minLength: minLength(8),
        },
      },
    },
    methods: {
      handleSubmit() {
        this.submitStatus = true;
    // context.commit('loadingStatus',true)
    (this.success = false), (this.errors = ""), (this.message = "");
    let formData = {
      username: this.user.username,
      password: this.user.password,
    };

  console.log(formData)
    // axios
    //   .get("http://localhost:8080/login", {headers:{
    //                 "Authorization": 'Basic ' + window.btoa(formData.username + ":" + formData.password)
    //             }} )
    //   .then((res) => {
    //     if (res.data) {
    //     //  context.commit("loginStatus", true);
    //        console.log( res.data)
    //     // (state.success = true),
    //     //    (state.submitted = false),
    //       // localStorage.setItem("token", res.data.token);
    //      // router.push({ path: "/taskboard" });
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response.status == 422) {
    //       // context.commit('loginStatus',false)
    //       (this.success = false), (this.errors = error.response.data);
    //     }

    //     //  console.log( state.errors)
    //   })
    //   .finally(() => {
    //     //state.isLogin =false,
    //     this.submitStatus = false;
    //   });
    let config = {
  method: 'get',
  url: 'http://localhost:8080/login',
  headers: { 
    'Authorization': 'Basic Z3JlZzp0dXJucXVpc3Q='
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
  


      },
    },
    computed: {
      // loadingStatus() {
      //   return this.$store.getters["login/loadingStatus"];
      // },
      // errors() {
      //   return this.$store.getters["login/errors"];
      // },
      // success() {
      //   return this.$store.getters["login/success"];
      // },
    },
  };
</script>
<style scoped>
.LayoutDefault{
  margin: auto;
  justify-content: center;
  margin-top: 200px;
}
</style>