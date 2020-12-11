<template>
  <div>
    <section class="section bg-secondary">
      <div class="container">
        <div class="row">
          <div class="col-md-12 user-details">
            <div class="current-user-email mr-3">{{ currentUser.email }}</div>
            <base-button class="logout-button" @click="logout">Logout</base-button>
          </div>
        </div>
        <h3 class="mb-4">Cars In Stock</h3>
        <div class="filter-section mb-3 row">
          <div class="col-md-6">
            <base-input
                alternative
                class="mb-0"
                type="text"
                placeholder="Search"
                v-model="search">
            </base-input>
          </div>
          <div class="col-md-6">
            <base-button @click="reloadData">Search</base-button>
            <base-button @click="resetData">Reset</base-button>
          </div>
        </div>
        <div class="row row-grid align-items-center">
          <div class="col-md-12">
            <div class="card">
              <table class="table">
                <thead>
                <tr>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in carsInStock" v-bind:key="index">
                  <td>{{ item.make_name }}</td>
                  <td>{{ item.model_name }}</td>
                  <td>{{ item.year }}</td>
                  <td>{{ item.quantity }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <base-pagination :page-count="pageCount" v-model="currentPage" @input="pageChanged"></base-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import auth from '@/core/auth.js'
import moduleCarInStock from '@/store/car/car-in-stock/moduleCarInStock.js'
import moduleAuth from '@/store/auth/moduleAuth.js'

export default {
  computed: {
    currentUser: {
      get() {
        return auth.getLoggedInUser();
      }
    },
    carsInStock: {
      get() {
        return this.$store.state['car-in-stock'] && this.$store.getters['car-in-stock/carsInStock']
      }
    },
    pageCount: {
      get() {
        return this.$store.getters['car-in-stock/pagination']['last_page'];
      }
    },
    search: {
      get() {
        return this.$store.getters['car-in-stock/filters']['search'];
      },
      set(value) {
        this.$store.commit('car-in-stock/setSearchValue', value);
      }
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    pageChanged() {
      this.reloadData();
    },
    resetData() {
      this.$store.commit('car-in-stock/setSearchValue', "");

      this.reloadData();
    },
    reloadData() {
      this.$store.dispatch(`car-in-stock/fetchCarsInStock`, {page: this.currentPage, search: this.search})
    },
    logout() {
      this.$store.dispatch('auth/logout')

          .then(
              () => {
                this.$router.push({name: 'user.login'});
              }
          );
    }
  },
  created() {
    this.$store.registerModule('auth', moduleAuth)
    this.$store.registerModule('car-in-stock', moduleCarInStock)
    this.reloadData();
  },
  destroyed() {
    this.$store.unregisterModule('auth')
    this.$store.unregisterModule('car-in-stock')
  }
}

</script>

<style lang="scss">

.user-details {
  text-align: right;

  .current-user-email, .logout-button {
    display: inline-block;
  }
}

</style>