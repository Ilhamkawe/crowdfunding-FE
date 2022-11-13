<template>
    <div class="container mx-auto">
        <Navbar/>
        <div class="w-1/2 mx-auto text-center pt-10 pb-10">
            <h1 class="text-4xl font-bold">FAQ</h1>
            <h3 class="text-2xl">Frequently Asked Questions</h3>
        </div>
        <div class="content">
            <accordion :name="'Bagaimana Cara Mengajukan Penggalangan Dana ?'">
                
                    <p>Untuk melakukan pengajuan penggalangan dana ada beberapa prosedur yang harus anda lakukan, yaitu : </p>
                    <br>
                    <ol class="list-decimal">
                        <li>Anda harus seorang mahasiswa universitas teknologi yogyakarta</li>
                        <li>Membuat Akun</li>
                        <li>Masuk Sebagai User</li>
                        <li>Masuk ke halaman dashboard saya yang ada pada dropdown profil</li>
                        <li>Pilih tombol ajukan penggalangan dana, lalu isi form yang disediakan dengan melampirkan proposal</li>
                        <li>Tunggu hingga admin memvalidasi penggalangan dana anda</li>
                    </ol>
                
            </accordion>
            <accordion :name="'Apa Saja Ketentuan Yang Diperlukan Untuk Melengkapi Proposal ?'">
                
                    <p>Untuk lampiran berupa proposal kurang lebih akan seperti proposal Pekan Kretifitas Mahasiswa (PKM) hanya saja ada beberapa tambahan didalamnya, isi yang harus terkandung dalam proposal yaitu :</p>
                    <br>
                    <ol class="list-decimal">
                        <li>Pendahuluan</li>
                        <li>Tinjauan Pustaka</li>
                        <li>Metode Pelaksanaan</li>
                        <li>Biaya dan Jadwal Kegiatan</li>
                        <li>Lampiran (wajib melampirkan KTM, dan KTP)</li>
                    </ol>
                    <br>
                    <p>Atau Anda Bisa Mendownload <a class="text-blue-700" :href="$axios.defaults.baseURL + '/proposal/Template-Proposal.docx'"> Tempalte Proposal</a></p>
            </accordion>
        </div>
        <Footer/>
    </div>
</template>
<style>
body{
    margin-left : 6rem;
    margin-right : 6rem;
    margin-top: 3rem;
  }
</style>