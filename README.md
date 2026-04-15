# 🎰 Gacha API

API sederhana untuk sistem undian (gacha) yang dibangun menggunakan Node.js, Express.js, dan MongoDB. 

API ini memungkinkan user untuk melakukan gacha guna mendapatkan hadiah tertentu berdasarkan peluang (random). Setiap user memiliki batas maksimal percobaan per hari, serta setiap hadiah memiliki kuota pemenang yang terbatas dalam satu periode.

Seluruh aktivitas gacha, termasuk hasil menang atau tidak, akan disimpan ke dalam database MongoDB dan dapat diakses kembali melalui endpoint yang tersedia.

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
```

#### Keterangan

* `userId` (string) → ID atau nama user yang melakukan gacha

#### Response

* Jika tidak menang:

```json
{
  "message": "Zonk! Anda Kurang Beruntung, Coba Lagi 😢"
}
```

* Jika menang:

```json
{
  "message": "🎉 Selamat Anda Menang! 🎉",
  "hadiah": "Pulsa Rp50.000"
}
```

* Jika melebihi limit:

```json
{
  "statusCode": 400,
  "error": "VALIDATION_ERROR",
  "message": "Limit gacha 5x per hari"
}
```

---

### 2. GET /api/gacha/history/:userId

Digunakan untuk melihat histori gacha user.

#### Parameter

* `userId` (string) → ID atau nama user

#### Contoh

```
GET /api/gacha/history/Georgina Gabriella
```

---

### 3. GET /api/gacha/prizes

Digunakan untuk melihat daftar hadiah dan sisa kuota.

#### Parameter

* Tidak ada

---

### 4. GET /api/gacha/winners

Digunakan untuk melihat daftar pemenang.

#### Parameter

* Tidak ada

#### Keterangan

* Nama user akan disamarkan

---

## 🎁 Daftar Hadiah

| No | Hadiah              | Kuota |
|----|--------------------|-------|
| 1  | Emas 10 gram       | 1     |
| 2  | Smartphone X       | 5     |
| 3  | Smartwatch Y       | 10    |
| 4  | Voucher Rp100.000  | 100   |
| 5  | Pulsa Rp50.000     | 500   |

---

## ⚙️ Rules

* Setiap user hanya dapat melakukan gacha maksimal **5 kali per hari**
* Jika melebihi batas, akan mendapatkan error
* Setiap hadiah memiliki kuota terbatas
* Kuota hadiah berlaku untuk 1 periode undian (bukan harian)
* Semua data disimpan di MongoDB

---

## ▶️ Cara Menjalankan

```bash
npm install
npm run dev
```

Server berjalan di:
http://localhost:5000

---

## 🛠️ Teknologi

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📸 Testing
* Echo API
* Postman

---

## 👩‍💻 Author
NIM   : 535250014
NAMA  : Georgina Gabriella
