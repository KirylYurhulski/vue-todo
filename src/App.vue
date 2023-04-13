<template>
  <div class="container">
    <div class="row">
      <nav class="blue darken-1">
        <div class="nav-wrapper">
          <router-link exact to="/">Home</router-link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><router-link to="/create">Create</router-link></li>
            <li><router-link to="/list">List</router-link></li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo" ref="sidebar">
        <li><router-link to="/create" class="sidenav-close">Create</router-link></li>
        <li><router-link to="/list" class="sidenav-close">List</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    M.Sidenav.init(this.$refs.sidebar, {})
  }
}
</script>

<style>
@import 'materialize-css/dist/css/materialize.min.css';

.description-len {
  float: right;
  font-size: 12px;
}
</style>
