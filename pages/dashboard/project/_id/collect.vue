<template>
        <div class="container mx-auto">
    <Navbar/>
    <div class="grid mt-8">
      <notifications group="success"  position="top right"/>
            <h1 class="text-xl font-bold">Pengajuan Pencairan Dana</h1>
            <form class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      No Rekening
                    </label>
                    <input v-model="data.no_rekening" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="text" placeholder="No Rekening">
                    <!-- <p class="text-gray-600 text-xs italic">Buat deskripsi singkat semenarik mungkin</p> -->
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Atas Nama
                    </label>
                    <input v-model="data.account_name"  required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="text" placeholder="Nama">
                    <!-- <p class="text-gray-600 text-xs italic">Buat deskripsi singkat semenarik mungkin</p> -->
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Bank
                    </label>
                    <!-- <p class="text-gray-600 text-xs italic">Buat deskripsi singkat semenarik mungkin</p> -->
                    <input v-model="data.bank" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="text" placeholder="Bank">
                  </div>
                </div>
                <button type="button" @click="CollectAmount()" class="button bg-green-new border-0 p-4 text-white object-right w-full hover:bg-green-new-dark hover:transition hover:duration-700">Ajukan Pencairan</button>
              </form>
        </div>
  </div>
</template>

<script>
export default {
    middleware : 'auth',
    data(){
        return {
            data : {
                campaign_id : parseInt(this.$route.params.id),
                user_id : this.$store.state.auth.user.id,
                account_name : "", 
                no_rekening : "", 
                bank: ""
            }
        }
    }, methods : {
        async CollectAmount(){
            try {
                this.$axios.$post("/api/v1/collect", this.data)
                this.$notify({
                    group : "success",
                    title: "Success!",
                    type : "success",
                    text: "Berhasil Mengajukan Pencairan Dana"
                });

                setTimeout(() => {
                    location.reload()
                }, 2000)
            }catch(e){
                console.log(e)
            }
        }
    }
}
</script>
