# 🎰 Gacha API

API sederhana untuk sistem undian (gacha) menggunakan Node.js, Express, dan MongoDB.

---

## 📌 Base URL
http://localhost:5000/api

---

## 🚀 Endpoint

### 1. POST /api/gacha

Digunakan untuk melakukan gacha.

#### Request Body
```json
{
  "userId": "Georgina Gabriella"
}

Keterangan
userId (string) → ID atau nama user yang melakukan gacha

Response
- Jika tidak menang:
{
  "message": "Zonk! Anda Kurang Beruntung, Coba Lagi 😢"
}

- Jika menang:
{
  "message": "🎉 Selamat Anda Menang!🎉",
  "hadiah": "Pulsa Rp50.000"
}

- Jika melebihi limit:
{
  "statusCode": 400,
  "error": "VALIDATION_ERROR",
  "message": "Limit gacha 5x per hari"
}

2. GET /api/gacha/history/:userId
Digunakan untuk melihat histori gacha user.

Parameter:
- userId (string) → ID atau nama user

Contoh:
GET /api/gacha/history/Georgina Gabriella

3. GET /api/gacha/prizes
Digunakan untuk melihat daftar hadiah dan sisa kuota.

Parameter:
- Tidak ada

4. GET /api/gacha/winners
Digunakan untuk melihat daftar pemenang.

Parameter:
- Tidak ada

Keterangan:
- Nama user akan disamarkan

⚙️ Rules
- Setiap user hanya dapat melakukan gacha maksimal 5 kali per hari
- Hadiah memiliki kuota terbatas (bukan per hari)
- Semua data disimpan di MongoDB