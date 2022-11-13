<template>
  <div class="container mx-auto">
    <Navbar/>
    <Breadcrumb :crumbs=crumbs />
    <EditProject :campaign=project.data.data :cattegory=cattegory.data />
  </div>
</template>
 
<script>
  export default {
    middleware : "auth",
    data () {
      return {
        currentStep : 0,
        crumbs : [{name: "Akun", path:"/Dashboard"},{name: "Dashboard", path:"/Dashboard"},{name: "Proyek", path:"/Dashboard/project/"+this.$route.params.id},{name: "Sunting", path:""}],
      }
    },
    async asyncData ({$axios, params}){
       const cattegory = await $axios.$get("/api/v1/cattegory")
        const project = await $axios.get("/api/v1/campaign/" + params.id + "/user")
        return { project , cattegory}
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
