//VARIABEL
const ceklis = document.getElementById('ceklis');
const pengalihan = document.getElementById('pengalihan');
const cari = document.querySelector('#cari');
const judul = document.getElementById('judul');
const penulis = document.getElementById('penulis');
const tahun = document.getElementById('tahun');
const tombolCari = document.getElementById('tombolCari');
const tombolOk = document.getElementById('tombolOk');
const dialog = document.getElementById('dialog');
const dialogText = document.getElementById('dialogText');
const tampungan = [];
const kondisiEvent = 'kondisi';
//FUNCTION DIGUNAKAN UNTUK MENAMBAHKAN TAMPUNGAN PADA LAYAR PADA SAAT SUBMIT
function tampungTambahBuku(){
    tombolTambahBuku.addEventListener('click', function(event){
        event.preventDefault();
        mengecek();
    });
}
//MENGECEK KEDUKUNGAN STORAGE PADA BROWSER DAN MENGISI TAMPUNGAN YANG TELAH DIISI
function cekDukungStorage(){
    if (typeof(Storage) !== 'undefined') {
        console.log("Browser mendukung local/session Storage :)");
        localStorage.setItem('data_buku', JSON.stringify(tampungan));
        document.dispatchEvent(new Event('simpan_buku'));
        return true;
    }else{
        console.log("Browser tidak mendukung local/session Storage :(");
        return false;
    }
}
//FUNCTION MENAMBAHKAN BUKU BARU
function tambahBukuBaru(){
    if(judul.value == "" || penulis.value == "" || tahun.value == ""){
        dialogDialog("Inputan tidak boleh kosong satupun!", 'disabled', 'hidden', '18%');
    }else{
        dialogDialog("Tambah buku berhasil!", 'disabled', 'hidden', '22%');
        if(ceklis.checked == true){
            tampungan.push(objekBukuBaru(+new Date(), judul.value, penulis.value, tahun.value, true));
        }else{
            tampungan.push(objekBukuBaru(+new Date(), judul.value, penulis.value, tahun.value, false));
        }
    }
    document.dispatchEvent(new Event(kondisiEvent));
    cekDukungStorage();
}
//MENJALANKAN OBJEK
function objekBukuBaru(id, title, author, year, isComplete){
    return{
        id, title, author, year, isComplete
    };
}
//MEMBUAT ELEMEN SESUAI KONDISI ISCOMPLETE
function membuatBukuBaru(objekBuku){
    //MEMBUAT ELEMEN
    const con8 = document.createElement('div');
    const con9 = document.createElement('div');
    const con10 = document.createElement('div');
    const con11 = document.createElement('div');
    let judulJudul = document.createElement('h3');
    let penulisPenulis = document.createElement('p');
    let tahunTahun = document.createElement('p');
    const tombolTombol2 = document.createElement('input');
    //MENAMBAHKAN CLASS DARI ELEMEN YANG TELAH DIBUAT
    con8.classList.add('container8');
    con9.classList.add('container9');
    con10.classList.add('container10');
    con11.classList.add('container11');
    penulisPenulis.classList.add('hoho');
    tahunTahun.classList.add('hoho');
    tombolTombol2.classList.add('submit3');
    //MENGATUR STRUKTUR
    judulJudul.innerText = objekBuku.title;
    penulisPenulis.innerText = "Penulis: "+objekBuku.author;
    tahunTahun.innerText = "Tahun: "+objekBuku.year;
    con8.append(judulJudul, con9);
    con9.append(con10, con11);
    con10.append(penulisPenulis, tahunTahun);
    judulJudul.setAttribute('id', 'judul');
    tombolTombol2.setAttribute('type', 'submit');
    tombolTombol2.setAttribute('id', 'tombol2');
    tombolTombol2.setAttribute('value', 'Hapus Buku');
    tombolTombol2.addEventListener('click', function () {
        hapusBuku(objekBuku.id);
        dialogDialog("Hapus Buku Berhasil!", 'disabled', 'hidden', '23%');
        dialogText.innerText = "Hapus Buku Berhasil!";
    });
    con8.setAttribute('id', `todo-${objekBuku.id}`);
    if(!objekBuku.isComplete){
        tombolSelesai(objekBuku, con11, tombolTombol2);
        return con8;
    }else{
        tombolBelumSelesai(objekBuku, con11, tombolTombol2);
        return con8;
    } 
    
}
//HAPUS BUKU
function hapusBuku(idBuku){
    if(cariIdBukuIndex(idBuku) !== -1){
        tampungan.splice(cariIdBukuIndex(idBuku), 1);
        document.dispatchEvent(new Event(kondisiEvent));
        cekDukungStorage();
        return true;
    }else{
        return false;
    }  
}
//MENCARI ID BUKU
function cariIdBuku(idBuku) {
    for (const tampunganBuku of tampungan) {
      if (tampunganBuku.id === idBuku) {
        return tampunganBuku;
        }
    }
    return null;
}
//MENCARI ID BUKU DARI NOMOR INDEX
function cariIdBukuIndex(idBuku) {
    for (const nomorIndex in tampungan) {
        if (tampungan[nomorIndex].id === idBuku) {
            return nomorIndex;
        }
    }
    return -1;
}
document.addEventListener(kondisiEvent, function () {
    document.getElementById('belumSelesai').innerHTML = '';
    document.getElementById('selesai').innerHTML = '';
    for (const tampunganBuku of tampungan) {
        if (!tampunganBuku.isComplete){
            document.getElementById('belumSelesai').append(membuatBukuBaru(tampunganBuku));
        }else{
            document.getElementById('selesai').append(membuatBukuBaru(tampunganBuku));
        }
        
    }
});
//TOMBOL 'MASUKKAN BUKU BARU'
document.addEventListener('DOMContentLoaded', function () {
    tampungTambahBuku();
    tahanData()
});
//MEMPERTAHANKAN SEBUAH DATA YANG BERASAL DARI SI PEMBUAT MENGGUNAKAN LOCAL STORAGE
function tahanData(){
    if(true){
        if(JSON.parse(localStorage.getItem('data_buku')) === null) {
            return false;
        }else{
        for(const tampung of JSON.parse(localStorage.getItem('data_buku'))) {
            tampungan.push(tampung);
        }
    }
      document.dispatchEvent(new Event(kondisiEvent));
    }
}
//FUNGSI CUSTOM DIALOG
function dialogDialog(text, disabled, hidden, left){
    dialogText.innerText = text;
    dialog.removeAttribute(disabled);
    dialog.removeAttribute(hidden);
    dialog.style.left = left;
    tombolOk.addEventListener('click', function () {
        dialog.setAttribute(disabled, disabled);
        dialog.setAttribute(hidden, hidden);
    });
}
//FUNGSI RESET UNTUK JIKA USER TELAH MENAMBAHKAN ATAU TIDAK MENGISI INPUTAN, INPUTAN YANG TELAH DIINPU AKAN TERESET
function reset(judul2, penulis2,tahun2, ceklis2){
    judul.value = judul2;
    penulis.value = penulis2;
    tahun.value = tahun2;
    ceklis.checked = ceklis2;
}
//KONDISI SAAT MENGETIK PADA INPUT CARI
cari.addEventListener("keyup", function(event){
    const cariBuku = event.target.value.toLowerCase();
    const listBuku = document.querySelectorAll(".container8");
    listBuku.forEach((item) => {
        mencari(item, cariBuku);
    });
});
//UNTUK MEMBUAT & MENGAKTIFKAN TOMBOL SELESAI
function tombolSelesai(idObjek,container11 ,tombolHapus){
    const tombolTombol1 = document.createElement('input');
    tombolTombol1.setAttribute('type', 'submit');
    tombolTombol1.classList.add('submit3');
    tombolTombol1.setAttribute('value', 'Selesai dibaca');
    tombolTombol1.setAttribute('id', 'tombol1_1');
    tombolTombol1.addEventListener('click', function(){
        if(cariIdBuku(idObjek.id) != null){
            cariIdBuku(idObjek.id).isComplete = true;
            document.dispatchEvent(new Event(kondisiEvent));
            cekDukungStorage();
            return true;
        }else{ 
            return false;
        }
    });
    container11.append(tombolTombol1, tombolHapus);
    reset("","","",false);
}
//UNTUK MEMBUAT & MENGAKTIFKAN TOMBOL BELUM SELESAI
function tombolBelumSelesai(idObjek,container11 ,tombolHapus){
    const tombolTombol3 = document.createElement('input');
    tombolTombol3.setAttribute('type', 'submit');
    tombolTombol3.classList.add('submit3');
    tombolTombol3.setAttribute('value', 'Belum Selesai dibaca');
    tombolTombol3.setAttribute('id', 'tombol1_2');
    tombolTombol3.addEventListener('click', function(){
        if(cariIdBuku(idObjek.id) != null){
            cariIdBuku(idObjek.id).isComplete = false;
            document.dispatchEvent(new Event(kondisiEvent));
            cekDukungStorage();
            return true;
        }else{ 
            return false;
        }
    });
    container11.append(tombolTombol3, tombolHapus);
    reset("","","",false);
}
//MENGECEK KONDISI CEKLIS JIKA TRUE AKAN KE BUKU SELESAI DAN SEBALIKNYA
function mengecek(){
    if(ceklis.checked == true){
        tambahBukuBaru();
    }else{
        tambahBukuBaru();
    }
}
//MENCARI BUKU BERDASARKAN JUDUL YANG DIMANA FIRSTCHILD YAITU 'H3' YANG MERUPAKAN ANAK PERTAMA DARI CLASS CONTAINER 8
function mencari(item2, cariBuku2){
    const isiItem = item2.firstChild.textContent.toLowerCase()
    if(isiItem.indexOf(cariBuku2) != -1){
        item2.setAttribute("style", "display: block;");
    }else{
        item2.setAttribute("style", "display: none !important;");
    }
}