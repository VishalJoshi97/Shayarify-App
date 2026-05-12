# Shayarify 🌙✍️

A full-stack poetry social media application where users can share shayaris, join discussion rooms, interact with communities, and connect through creative expression.

---

## 🚀 Features

- 🔐 JWT Authentication & Authorization
- 📝 Create and Share Shayaris
- 💬 Community Discussion Rooms
- 👥 User Profiles and Community Interaction
- ⚡ RESTful APIs with Spring Boot
- 📱 Responsive Mobile UI with React Native
- ☁️ Cloud Deployment using Railway & Render
- 🔄 Branch-Based Deployment Workflow (`main`, `beta`, `feature`)
- 📡 Real-time style chat and room interactions

---

## 🛠️ Tech Stack

### Frontend
- React Native
- Expo
- Axios
- React Navigation

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL

### Deployment & Tools
- Railway
- EAS Build
- Git & GitHub

---

## 📂 Project Structure

```bash
Shayarify/
│
├── backend/        # Spring Boot Backend
├── frontend/       # React Native Frontend
└── README.md
```

---

## ⚙️ Backend Setup

### 1. Clone Repository

```bash
git clone https://github.com/VishalJoshi97/Shayarify-App.git
```

### 2. Configure MySQL

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shayarify
spring.datasource.username=root
spring.datasource.password=yourpassword
```

### 3. Run Backend

```bash
./mvnw spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

## 📱 Frontend Setup

### 1. Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Expo Server

```bash
npx expo start
```

---

## ☁️ Deployment

### Backend
- Deployed using Railway / Render

### Frontend
- Built and tested using EAS Build

---

## 🌿 Branch Workflow

| Branch | Purpose |
|---|---|
| `main` | Production Stable |
| `beta` | Testing Environment |
| `feature/*` | Feature Development |

---

## 📈 Achievements

- Built scalable full-stack mobile architecture
- Implemented secure JWT authentication and room management system
- Optimized API fetching workflows for smoother user experience
- Configured separate deployment environments for streamlined CI/CD workflow

---

## 🤝 Contributing

Contributions are welcome!

```bash
fork → clone → create branch → commit → push → pull request
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

Developed by Vishal Joshi 🚀
