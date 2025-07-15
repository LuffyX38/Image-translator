# 🖼️ Image Translator Website

A web application that allows users to upload an image, extract text from it using OCR (Optical Character Recognition), and translate the extracted text into a chosen language. Logged-in users have the ability to edit the extracted text before retranslation.

---

## 📝 Project Description

This project showcases how OCR and translation APIs can be combined in a full-stack web application. Users can upload an image with embedded text, extract the text via an OCR API, and translate it to any language using a translation API. Logged-in users have additional privileges, such as editing the extracted text before initiating a new translation.

---

## 🚀 Features

- 📤 Upload images with text
- 🔍 Extract text from image using OCR
- 🌐 Translate extracted text into multiple languages
- 🖋️ Logged-in users can edit extracted text and retranslate
- 🔐 User authentication system (Login & Signup)
- 🖥️ Responsive UI built with Bootstrap
- 🧾 Display original, edited, and translated text

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS
- Bootstrap
- Handlebars (HBS)

**Backend:**
- Node.js
- Express.js

**Database:**
- MySQL  
  - Used for storing user credentials and managing authentication

**APIs Used:**
- OCR API 
- Translation API 

---

## ⚙️ How It Works

1. User signs up or logs in.
2. Uploads an image through the interface.
3. OCR API extracts the text from the image.
4. The extracted text is shown on the screen.
5. Logged-in users can edit the text.
6. Translated output is generated using a translation API and displayed.

---

## 🔐 Authentication

- User signup/login using email and password
- Sessions maintained using express-session
- Authenticated users have extra permissions:
  - Edit extracted text
  - Retranslate edited content

---

