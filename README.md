# 📒 Jotter Backend API

Jotter is a personal content management backend system built with Node.js, Express.js, and MongoDB. It allows users to create folders, upload files (images and PDFs), store notes, manage favorite items, secure access to private content using a PIN, and much more.

## 🚀 Features

- 🔐 User authentication (Sign up, Sign in, Rename, Delete)
- 📁 Folder management (Create, Rename, Fetch Single, Fetch All)
- 📝 Notes, 📸 Images, 📄 PDFs – CRUD operations
- ⭐ Favorites – Add and Fetch favorite items
- 📂 Private Collection – PIN-protected access
- 📦 Duplicate data from collections (adds "copy" to names)
- 🗑️ Delete single item or user
- 📤 File uploads using `multer`
- 📅 Date-based data fetching
- 🌐 RESTful API support (tested with Postman)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (native driver)
- Multer (for file uploads)
- Body-parser
- dotenv

---

## 📦 Collections Used

- `userCollection`
- `folderCollection`
- `noteCollection`
- `imageCollection`
- `pdfCollection`
- `favoriteCollection`
- `privateCollection`

---

## 📮 API Endpoints

### 🔐 User APIs

- `POST /api/signup` – Create a new user
- `POST /api/signin` – Log in with email and password
- `PATCH /api/user/rename` – Rename username
- `DELETE /api/user/:id` – Delete user by ID


### 📁 Folder APIs

- `POST /api/folder` – Create a new folder
- `GET /api/folder/:id` – Get a single folder
- `PATCH /api/folder/rename/:id` – Rename a folder

### 📄 Notes, Images, PDFs APIs

- `POST /api/image/upload` – Upload an image (with email)
- `POST /api/pdf/upload` – Upload a PDF (with email)
- `POST /api/note/create` – Create a note
- `DELETE /api/:collection/:id` – Delete a single item by ID from specific collection
- `PATCH /api/rename/:collection/:id` – Rename an item from a collection

### 📥 Favorites API

- `POST /api/favorite/add` – Add to favorites
- `GET /api/favorite/:email` – Get all favorite items for a user

### 🔒 Private Collection (PIN Protected)

- `POST /api/private/access` – Validate PIN before accessing private data

### 📄 Duplicate APIs

- `POST /api/duplicate` – Duplicate item from any of the four collections (adds "copy" to name)

### 📅 Data Fetching APIs

- `GET /api/all-data` – Fetch data from all 4 collections
- `GET /api/all-data/date/:date` – Fetch all data by specific date

---

## 📤 File Upload Notes

- Image uploads are saved to `/uploads/` using `multer`
- Only image MIME types are allowed
- PDF uploads validated similarly

---

## 📘 Postman Sample JSON for User Signup

```json
{
  "username": "nahidn228",
  "email": "nahid@example.com",
  "password": "123456",
  "pin": "1234"
}
```
##  📋 Notes
- You must send Content-Type: application/json for all POST/PUT requests.
- Image and PDF uploads should be sent as form-data.

## 📦 Run Locally

```
git clone https://github.com/nahidn228/jotter_backend.git
cd jotter_backend
npm install
npm run dev
```






