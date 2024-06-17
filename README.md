# Hicare - API Server Side 
# Cloud Computing Learning Path


Repository ini berisikan serba serbi Backend yang dipakai di Aplikasi HICARE beserta informasi resource, teknologi dan tutorial pemakaian API aplikasi HICARE.
Repository ada di branch Master. Main hanya sebagai home untuk Readme.md.

## Cloud Computing Division
| Nama | Bangkit ID |
|----------|----------|
| Radot Yohanes Nababan   | C119D4KY0314   |
| Ilham Yoga Pratama   | C119D4KY0314   |


## Routes 
Area ini digunakan untuk development di Postman. 

| Method | Endpoint/Path | Keterangan |
|--------|---------------|--------------|
| POST | /texts | Posting Artikel |
| POST | /predict | Posting gambar prediksi (Unavailable in Apps)|
| GET | /texts | Mengambil data artikel keseluruhan |
| GET | /texts/:textName | Mengambil data artikel berdasarkan nama|

## Code Technology
Saat pengembangan aplikasi ini, kami memakai spesifikasi teknologi sebagai berikut

| Alat | Kegunaan |
|----------|----------|
| Javascript   | Bahasa Keseluruhan aplikasi   |
| Cloud Run | Layanan Upload Aplikasi dari Google Cloud Platform|
|Cloud Storage | Layanan Upload Model Machine Learning|
|Firestore|Penyimpanan Data Artikel yang di Post|
|Docker|Perantara Deployment ke Cloud Run ( Google Cloud Platform) |
|ExpressJS|Code Framework yang digunakan|

## Cara Pemakaian
1. Pastikan sudah menginstall Code Editor dan Nodejs (NPM)
2. Pastikan sudah memakai WSL2 di Terminal VSCode (Ubuntu Distro / OpenSUSE)
3. Download dan Ekstrak Code ( Bisa Menggunakan Git Clone), code berada di branch master.
4. Jalankan perintah ``` npm install ```
5. Buka server.js, pastikan port dan host yang dipakai **bukan untuk deployment**.

 
















