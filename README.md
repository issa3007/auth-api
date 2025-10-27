# 🔐 Auth API (NestJS + TypeORM + MySQL)

A fully functional **authentication and authorization API** built with **NestJS**, **TypeORM**, and **MySQL**.  
This project demonstrates clean architecture, secure user authentication, JWT tokens, validation, and modular design following best backend practices.

---

## 🚀 Tech Stack

- **NestJS** – Progressive Node.js framework for building scalable server-side apps  
- **TypeORM** – Object Relational Mapper for database interaction  
- **MySQL** – Relational database for persistent data storage  
- **JWT (JSON Web Token)** – Authentication and authorization  
- **class-validator / class-transformer** – Data validation and transformation  
- **bcrypt** – Password hashing  
- **Swagger** – API documentation

---

## ⚙️ Features

- 🔐 User registration and login  
- 🔑 JWT-based authentication and refresh tokens  
- 🧾 Input validation using DTOs  
- 🧱 Modular architecture (Controller, Service, Repository, Entity, DTO)  
- 🧰 Built-in global validation pipes  
- 📘 Swagger API documentation  
- 🗑️ Soft delete support (via `@DeleteDateColumn`)

---

## 📦 Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/issa3007/auth-api.git
cd auth-api
