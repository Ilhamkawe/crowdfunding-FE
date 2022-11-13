<template>
  <div class="container mx-auto">
    <Navbar/>
    <Breadcrumb :crumbs=crumbs />
    <CreateProject :cattegory=cattegory.data />
  </div>
   
</template>
 
<script>
  export default {
    middleware : "auth",
    async asyncData ({$axios}){
        const cattegory = await $axios.$get("/api/v1/cattegory")
        return { cattegory }
    },
    data () {
      return {
        crumbs : [{name: "Akun", path:"/Dashboard"},{name: "Dashboard", path:"/Dashboard"},{name: "Pengajuan", path:""}],
      }
    },
    methods: {
      
    }
  }
</script>
 
<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }
