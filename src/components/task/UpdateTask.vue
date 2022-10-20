<template>
  <div id="app">
    <div>
      <b-spinner v-if="isLoading" label="Spinning"></b-spinner>

      <b-table
        striped
        hover
        :items="listItems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="0">
        <template v-slot:cell(action)="data">
          <b-button size="sm" class="mr-1" @click="edit(data)"> Edit </b-button>
          <b-button size="sm" @click="deleteRecord(data)"> Delete </b-button>
        </template>
      </b-table>
      <!-- <b-pagination
        v-model="currentPage"
        :total-rows="totalPages"
        :per-page="recordsPerPage">
      </b-pagination> -->
    </div>
  </div>
</template>
<script>

import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      listItems: [],
      currentPage: 1,
      totalPages: 0,
      recordsPerPage: 10,
      isLoading: false,
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "name",
          label: " Name",
          sortable: true,
          class: "text-center",
        },
        {
          key: "capacity",
          label: "Capaity",
          sortable: true,
          image: true,
        },
        {
          key: "model",
          label: "Model",
          sortable: true,
        },
        {
          key: "action",
          label: "Actions",
        },
      ],
      params: "",
    };
  },
  created() {
    this.loadPassengers();
  },
  watch: {
    currentPage: {
      handler: function (value) {
        this.params = `page=${value}&size=${this.recordsPerPage}`;
        this.loadPassengers();
      },
    },
  },
  methods: {
    loadPassengers() {
      this.isLoading = true;
      this.params = `page=${this.currentPage}&size=${this.recordsPerPage}`;
      axios
    .get(`http://localhost:7000/plane/findAll`, {})
    .then((response) => {Promise.resolve(response.data)
      if (response.data) {
          this.listItems = response.data;
          this.totalPages = response.totalPassengers;
          this.isLoading = false;
        }
    })
      // passengerService.getListPassengers().then((response) => {
      //   console.log(response)
      //   if (response.data) {
      //     this.listItems = response.data;
      //     this.totalPages = response.totalPassengers;
      //     this.isLoading = false;
      //   }
      // });
    },
    deleteRecord(data) {
      this.$bvModal
        .msgBoxConfirm("Are you sure wants to delete?", {
          title: "Please Confirm",
          size: "mm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.listItems.splice(data.index, 1);
          }
        });
    },
    edit(data) {
      alert(JSON.stringify(data));
    },
  },
};
</script>