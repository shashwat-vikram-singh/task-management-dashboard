# 🚀 TaskFlow – Task Management Dashboard

TaskFlow is a modern and responsive **task management dashboard** built using **React**, **Redux Toolkit**, **Vite**, and **Tailwind CSS**.
It helps users manage daily tasks efficiently with progress tracking, filtering, search, and a clean UI.

---

## ✨ Features

* Add, edit, and delete tasks
* Mark tasks as completed or pending
* Filter tasks (All / Pending / Completed)
* Search tasks in real time
* Progress overview with completion percentage
* Light & Dark mode toggle
* Clean, modern, and responsive UI
* Centralized state management using Redux Toolkit

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS + PostCSS
* **Icons:** Lucide React
* **Mock API:** Async simulation using Promises

---

## 📁 Project Structure

```text
TASK-MANAGEMENT-DASHBOARD/
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   └── store.js
│   ├── components/
│   │   ├── Filters.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   └── ThemeToggle.jsx
│   ├── features/
│   │   └── tasks/
│   │       ├── tasksAPI.js
│   │       └── tasksSlice.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup & Run Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/shashwat-vikram-singh/task-management-dashboard
cd task-management-dashboard
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

---

## 🧠 State Management Overview

* Redux Toolkit is used for global state management
* `store.js` configures the Redux store
* `tasksSlice.js` manages:

  * Task list
  * Filters
  * Search query
* `createAsyncThunk` is used for async actions
* `tasksAPI.js` simulates backend CRUD operations

---

## 📌 Notes

* This project uses a **mock API** to simulate server interactions
* Architecture is **scalable** and easy to integrate with a real backend
* Components follow the **single-responsibility principle**

---

## 🙌 Author

**Shashwat Vikram Singh**
Frontend Developer | React | Redux Toolkit | Tailwind CSS

---

