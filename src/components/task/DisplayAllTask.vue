<template>
  <div>
   <b-button class="btn btn-warning mb-5" v-b-modal.modal >Create Task</b-button><br>
    <b-spinner v-if="isLoading" label="Spinning"></b-spinner>
 
    <table class="table">
  <thead>
    <tr >
      <th scope="col">#</th>
      <th scope="col">Capaity</th>
      <th scope="col">Name</th>
      <th scope="col">Model</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in tasks" :key="task.id">
      <th scope="row">{{task.id}}</th>
      <td>{{task.capacity}}</td>
      <td>{{task.name}}</td>
      <td>{{task.model}}</td>
      <td>       <div class="float-right mr-2 mb-5">
          <b-icon
             class="mr-2"
             variant="primary"
             icon=" pencil-square
"            @click="updateTask(task.id,task)"
             aria-hidden="true"
          ></b-icon>
          <b-icon
            variant="danger"
            icon="trash-fill"
            aria-hidden="true"
            @click="deleteTask(task.id)"
          ></b-icon>
        </div></td>
    </tr>
   
  </tbody>
</table>
     
    <b-modal
      id="modal"
      ref="modal"
      title="Create Task"
      :hide-footer="true"
      :hide-header="true"
    >
 


       <b-icon @click="$bvModal.hide('modal')" icon="x-circle"  variant="danger" aria-hidden="true"></b-icon>

      <div>
        <b-card style="max-width: 50rem" class="mb-2 mx-auto border-0 rounded">
          <form @submit.stop.prevent="createTask">
            <div class="alert alert-success" v-if="message && message.message">
              <p>{{ message.message }}</p>
            </div>
            <div class="alert alert-danger" v-if="errors && errors.errors">
              <p>{{ errors.message }}</p>
            </div>
            <div class="text-danger .fs-2" v-if="errors && errors.errors">
              <small>{{ errors.errors.message }}</small>
            </div>
            <div class="form-group">
              <label for="title" class="float-left">name</label>
              <input
                type="text"
                v-model="$v.task.name.$model"
                id="title"
                name="title"
                placeholder="tap your name here.."
                class="form-control"
                :class="{ 'is-invalid': $v.task.name.$model }"
              />
              <span v-if="!$v.task.name.required" class="invalid-feedback">
                Name is required</span
              >
              <!-- <span v-if="!$v.task.name.minLength" class="invalid-feedback"
                >name must be at least 3 characters</span
              > -->
            </div>
            <div class="form-group">
              <label for="title" class="float-left">capacity</label>
              <input
                type="text"
                v-model="$v.task.capacity.$model"
                id="title"
                name="title"
                placeholder="tap you capacity here.."
                class="form-control"
                :class="{'is-invalid': $v.task.capacity.$model }"
              />
              <span v-if="!$v.task.capacity.required" class="invalid-feedback">
                Name is required</span
              >
              <!-- <span v-if="!$v.task.title.minLength" class="invalid-feedback"
                >name must be at least 3 characters</span
              > -->
            </div>
            <div class="form-group">
              <label for="title" class="float-left">model</label>
              <input
                type="text"
                v-model="$v.task.model.$model"
                id="title"
                name="title"
                placeholder="tap you model here.."
                class="form-control"
                :class="{ 'is-invalid': $v.task.model.$model }"
              />
              <span v-if="!$v.task.model.required" class="invalid-feedback">
                Name is required</span
              >
              <!-- <span v-if="!$v.task.model.minLength" class="invalid-feedback"
                >name must be at least 3 characters</span
              > -->
            </div>
     
            <div class="form-group">
              <button
                class="float-left mt-2 btn btn-danger"
                type="submit"
                :disabled="submitStatus || $v.$invalid"
              >
                create <b-spinner small v-if="submitStatus"></b-spinner>
              </button>
            </div>
          </form>
        </b-card>
      </div>
    </b-modal>
  </div>

</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";

import axios from "axios";
export default {
  data() {
    return {
        displayCreate: false,
      task: {
        capacity: "",
        name: "",
        model: "",
       
      },
      submitted: false,
      success: false,
      submitStatus: false,
      errors: "",
      message: "",
      tasks: [],
      isLoading: false,
    };
  },
  validations: {
    task: {
      name: {
        required,
      //  minLength: minLength(3),
      },
      capacity: {
        required,
       // minLength: minLength(3),
      },
      model: {
        required,
       // email,
      },
    },
  },

  created() {
   this.isLoading = true;
    axios
      .get("http://localhost:7000/plane/findAll")
      .then((res) => {
        this.tasks = res.data;
        console.log(this.tasks.data);
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
       this.isLoading = false;
        

      });

  },
  methods:{
       createTask(){
      //   this.task={
      //   capacity: "",
      //   name: "",
      //   model: ""
       
      // },

      axios.post('http://localhost:7000/plane/save',this.task).then(()=>{
           alert('created')})
    
    },
       updateTask(id,task){
       this.task=task,
       this.$bvModal.show("modal") 
       axios.put('http://localhost:7000/plane/update/'+id).then(()=>{
           alert('suessfully updated')
             }
         )  
      
      },

       deleteTask(id){
         axios.delete('http://localhost:7000/plane/delete/'+id).then(()=>{
           alert('delete')
             }
         )
       }
       
      
       }

};
</script>