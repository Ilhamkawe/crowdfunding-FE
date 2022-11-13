<template>
  <div class="container mx-auto">
    <Navbar/>
    <Breadcrumb :crumbs=crumbs />
    <notifications group="success"  position="top right"/>
    <div class="grid mt-8">
            <h1 class="text-xl font-bold">Sunting Aktivitas</h1>
            <form class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <!-- Required form plugin -->
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                      Foto Thumbnail
                    </label>
                <label
                class="
                    w-full
                    flex flex-col
                    items-center
                    px-4
                    py-6
                    bg-white
                    rounded-md
                    shadow-md
                    tracking-wide
                    uppercase
                    border border-blue
                    cursor-pointer
                    hover:bg-blue-main hover:text-white
                    text-purple-600
                    ease-linear
                    transition-all
                    duration-150
                "
                >
                <i class="fas fa-cloud-upload-alt fa-3x"></i>
                <span class="mt-2 text-base leading-normal" v-if="activity.data.image_url != ' '">{{activity.data.image_url.split("/")[2]}}</span>
                <span class="mt-2 text-base leading-normal" v-else>{{fileholder}}</span>
                <input type="file" @change="SelectFile()" ref="file" class="hidden" accept="image/*"/>
                </label>
              </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Judul
                    </label>
                    <input v-model="activity.data.name" required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Judul">
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Deskripsi Singkat
                    </label>
                    <input v-model="activity.data.short_description" required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Deskripsi Singkat">
                    <p class="text-gray-600 text-xs italic">Buat deskripsi singkat semenarik mungkin</p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Deskripsi
                    </label>
                     <section class="container">
                        <div class="quill-editor" 
                            @change="onEditorChange($event)"
                            :content="content"
                            v-quill:myQuillEditor="editorOption">
                        </div>
                    </section>
                  </div>
                </div>
                <button type="button" @click="activityForm()" class="button bg-green-new border-0 p-4 text-white object-right w-full hover:bg-green-new-dark hover:transition hover:duration-700">Selesai</button>
              </form>
        </div>
  </div>
</template>
 
<script>
  export default {
    middleware : "auth",
    data () {
      return {
        content: "",
        file : undefined,
        fileholder : "Pilih File",
        editorOption: {
            // some quill options
            modules: {
                toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ]
            }
        }, 
        crumbs : [
            {name: "Akun", path:"/Dashboard"},
            {name: "Dashboard", path:"/Dashboard"},
            {name: "proyek", path:"/dashboard/project/"+this.$route.params.id},
            {name: "Aktivitas", path:"/Dashboard/project/"+this.$route.params.id+"/activity"},
            {name: "Sunting", path:""}],
      }
    },
    async asyncData({$axios, params, query}){
        const activity = await $axios.$get("/api/v1/campaign/user/activity/"+params.actid+"/"+params.id)
        return {activity}
    },
    mounted(){
         setTimeout(() => {
            this.content = this.activity.data.description
        }, 500)
    },
    methods: {
    onEditorChange({editor, html, text}) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
       SelectFile(){
        this.file = this.$refs.file.files
        this.fileholder = this.file[0].name
      },
        async load(){
          const activity = await $axios.$get("/api/v1/campaign/user/activity/"+params.actid+"/"+params.id)
          this.activity = activity
        },
        async activityForm(){
            let formData = new FormData()
            formData.append("id", parseInt(this.$route.params.actid))
            formData.append("campaign_id", parseInt(this.$route.params.id))
            formData.append("name", this.activity.data.name)
            formData.append("short_description", this.activity.data.short_description)
            formData.append("description", this.content)
            formData.append("file", null)
            if (this.file != undefined) {
                formData.append("file", this.file.item(0))
            }

            try {
                await this.$axios.$put('/api/v1/campaign/activity',formData, {
                  headers : {
                      "Content-Type" : "Multipart/form-data"
                  }
                }
            )

            this.load()

            this.$notify({
                group : "success",
                title: "Success!",
                type : "success",
                text: "Aktivitas Berhasil Diubah"
            });

            } catch (e) {
                console.log(e)
            }
      }     
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
