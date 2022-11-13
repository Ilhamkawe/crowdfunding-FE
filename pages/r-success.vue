<template>
    <div class="success-page">
      <div class="container mx-auto h-screen flex justify-center items-center">
        <div class="w-full lg:w-1/3 px-10 lg:px-0">
          <div class="flex justify-center items-center mx-auto mt-6 mb-8">
            <img src="/image/11_Success-1.png" alt="" class="w-full" />
          </div>
          <h2 class="font-medium mb-3 text-3xl text-center">
            Daftar Berhasil !
          </h2>
          <p class="text-center font-light">
            akun anda sudah berhasil didaftarkan
            <br />
            silahkan login untuk lanjut
          </p>
          <div class="mb-4 mt-6">
            <div class="mb-4">
              <button
                @click="$router.push({ path: '/login' })"
                class="button button-lg button-primary block w-full"
              >
                Masuk !
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    
}
</script>