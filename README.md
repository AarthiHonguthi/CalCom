# 📅 CalCom – Scheduling and Booking Platform

**CalCom** is a full-stack scheduling and booking application inspired by **Cal.com**.  
It enables users to define event types, configure weekly availability, and allow external users to book meetings through a public booking page.

This project demonstrates **real-world scheduling logic**, **clean database design**, and **frontend–backend integration** using modern web technologies.

---

## 🚀 What This Project Does

CalCom solves the problem of scheduling meetings without back-and-forth communication.

The system allows:
- **Creating reusable event types** (meeting templates)
- **Configuring weekly availability**
- **Dynamically generating available time slots**
- **Public booking without login**
- **Preventing double bookings**
- **Displaying booking confirmation details**

The application assumes **a single authenticated user (admin)** to focus on core scheduling functionality.

---

## 🧱 Application Architecture

The project follows a **clean separation of concerns**:

- **Frontend** → User interface and interactions  
- **Backend** → Business logic and scheduling rules  
- **Database** → Persistent storage for availability and bookings  

Each layer is independently maintainable and scalable.

---

## 🛠 Tech Stack

### Frontend
- **React**
- **Tailwind CSS**
- **React Router**
- **Axios**

### Backend
- **Node.js**
- **Express.js**

### Database
- **PostgreSQL**
- **NeonDB compatible**

---

## ⭐ Core Features

### 📌 Event Types
Users can define multiple event types such as:
- Introductory calls
- Technical discussions
- Project review meetings

Each event type includes:
- **Title**
- **Public booking slug**
- **Duration (minutes)**
- **Description**

---

### 📆 Availability Management
Users can configure availability:
- **Per day of the week**
- **Multiple time ranges per day**
- **Stored using PostgreSQL JSONB** for flexibility
- **Editable from the frontend UI**

This structure closely mirrors how real scheduling platforms work.

---

### 🔗 Public Booking Flow
External users can:
- View available time slots
- Select a slot
- Enter name and email
- Book a meeting

The backend:
- **Validates availability**
- **Prevents overlapping bookings**
- **Stores confirmed bookings**

---

### ✅ Booking Confirmation
After successful booking:
- A confirmation page is shown
- Booking details are displayed:
  - **What**
  - **When**
  - **Who**
  - **Where**
- Navigation is provided back to the bookings page

---
## 🗄 Database Design

<img width="996" height="588" alt="image" src="https://github.com/user-attachments/assets/e5be4fb2-a4c4-44a1-b91a-42bca3ee1672" />

---

## 🧠 Backend Responsibilities

- **Convert availability into valid slots**
- **Validate booking requests**
- **Prevent double bookings**
- **Persist bookings and availability**
- **Expose REST APIs for frontend consumption**

---

## 🎨 Frontend Responsibilities

- Availability editor UI
- Event type display
- Booking flow UI
- Booking success page
- Routing and navigation

---

## 🌍 Deployment

- **Frontend** deployed on Vercel
- **Backend** deployed on Render
- **PostgreSQL** hosted on NeonDB

---


## 🔮 Possible Extensions

- Authentication and multi-user support
- Email notifications
- Rescheduling and cancellation flows
- Role-based access control

---

### ✨ Made by Aarthi
