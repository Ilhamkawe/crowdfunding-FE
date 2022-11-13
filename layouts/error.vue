<template>
     <div class="container mx-auto h-screen flex justify-center items-center">
        <div class="w-full lg:w-1/3 px-10 lg:px-0">
          <div class="flex justify-center items-center mx-auto mt-6 mb-8">
            <img src="/404-illustration.svg" alt="" class="w-full" />
          </div>
          <h2 class="font-medium mb-3 text-3xl text-center">
            Oops, Sepertinya Terjadi Kesalahan.
          </h2>
          <p class="text-center font-light" v-if="error.statusCode == 404">
            Sepertinya Halaman ini Belum Ada 
            <br />
            Saat Ini !
          </p>
          <div class="mb-4 mt-6">
            <div class="mb-3">
              <button
                @click="$router.push({ path: '/' })"
                class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
              >
                Fund Other Project
              </button>
            </div>
            <div class="mb-4">
              <button
                @click="$router.push({ path: '/dashboard' })"
                class="block w-full bg-transparent border border-gray-500 text-gray-500 hover:bg-green-button hover:border-green-button hover:text-white font-light px-6 py-4 text-lg rounded-full"
              >
                My Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    props : ["error"],
    layout : "sucess"
}
</script>