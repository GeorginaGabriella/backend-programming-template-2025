# 🎰 Gacha API

API sederhana untuk sistem undian (gacha) yang dibangun menggunakan Node.js, Express.js, dan MongoDB. 

API ini memungkinkan user untuk melakukan gacha untuk mendapatkan hadiah tertentu berdasarkan peluang (random). Setiap user memiliki batas maksimal percobaan per hari, serta setiap hadiah memiliki kuota pemenang yang terbatas dalam satu periode.

Seluruh aktivitas gacha, termasuk hasil menang atau tidak, akan disimpan ke dalam database MongoDB dan dapat diakses kembali melalui endpoint yang tersedia.

---

## 📌 Base URL

[http://localhost:5000/api](http://localhost:5000/api)

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

#### Response

#### Jika Kalah

```json
{
  "user": {
    "userId": "Georgina Gabriella"
  },
  "drawDate": "2026-04-16",
  "drawCountToday": 1,
  "remainingDrawsToday": 4,
  "result": {
    "isWinner": false,
    "prize": null,
    "message": "😢 Maaf, Anda Belum Beruntung, Coba Lagi Ya 😢"
  },
  "logId": "69e0a771e352f1f2eb753537"
}
```

#### Jika Menang

```json
{
  "user": {
    "userId": "Georgina Gabriella"
  },
  "drawDate": "2026-04-16",
  "drawCountToday": 1,
  "remainingDrawsToday": 4,
  "result": {
    "isWinner": true,
    "prize": "Voucher Rp100.000",
    "message": "🎉 Hore! Selamat Anda Beruntung Memenangkan Hadiah!🎉"
  },
  "logId": "69e0a771e352f1f2eb753537"
}
```

#### Jika Melebihi Limit

```json
{
  "statusCode": 400,
  "error": "VALIDATION_ERROR",
  "description": "Invalid request",
  "message": "Limit gacha 5x per hari"
}
```

---

### 2. GET /api/gacha/history/:userId

Melihat histori gacha user.

#### Contoh

```
GET /api/gacha/history/user123
```

#### Response

```json
[
  {
    "id": "69e0a723e352f1f2eb753527",
		"userId": "Georgina Gabriella",
		"isWin": true,
		"hadiah": "Smartwatch Y",
		"createdAt": "2026-04-16"
  }
]
```

---

### 3. GET /api/gacha/prizes

Melihat daftar hadiah dan sisa kuota.

#### Response

```json
[
  {
    "code": "emas-10g",
    "name": "Emas 10 gram",
    "quota": 1,
    "winnerCount": 0,
    "remainingQuota": 1
  }
]
```

---

### 4. GET /api/gacha/winners

Melihat daftar pemenang.

#### Response

```json
[
  {
    "prizeName": "Pulsa Rp50.000",
    "totalWinners": 1,
    "winners": [
      {
        "maskedName": "G**r*ina Ga*ri*l*a",
        "wonAt": "2026-04-16"
      }
    ]
  }
]
```

#### Keterangan

* Nama user disamarkan (masking)
* Data diambil dari database MongoDB

---

## 🎁 Daftar Hadiah

| No | Code         | Hadiah            | Kuota |
| -- | ------------ | ----------------- | ----- |
| 1  | emas-10g     | Emas 10 gram      | 1     |
| 2  | smartphone-x | Smartphone X      | 5     |
| 3  | smartwatch-y | Smartwatch Y      | 10    |
| 4  | voucher-100k | Voucher Rp100.000 | 100   |
| 5  | pulsa-50k    | Pulsa Rp50.000    | 500   |

---

## ⚙️ Rules

* Setiap user hanya dapat melakukan gacha maksimal **5 kali per hari**
* Jika melebihi batas, akan mendapatkan error
* Hadiah memiliki kuota terbatas
* Kuota berlaku untuk **1 periode undian (bukan harian)**
* Semua aktivitas disimpan di MongoDB

---

## ▶️ Cara Menjalankan

```bash
npm install
npm run dev
```

Server berjalan di:
[http://localhost:5000](http://localhost:5000)

---

## 🧪 Testing

Gunakan:

* Echo API
* Postman

Endpoint yang diuji:

* POST /api/gacha
* GET /api/gacha/history/:userId
* GET /api/gacha/prizes
* GET /api/gacha/winners

---

## 👩‍💻 Author

535250014 - Georgina Gabriella
Kuis 1 Back-End Programming

---

