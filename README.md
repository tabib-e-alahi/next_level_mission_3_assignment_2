# **Vehicle Rental System**

### **Live URL:** https://nextlevelassignment2.vercel.app/

## Project Overview

The **Vehicle Rental System** is a backend service built to manage vehicle rentals with role-based secure control on access between Admin and Customer. This project is based on vehicle rental management, customer accounts, bookings with automatic pricing, and booking lifecycle handling (active, cancelled, returned).

This system is designed using a **modular, feature-based architecture** with strict separation of concerns, following industry-standard backend practices.


## Key Features

###  Authentication & Authorization

*   Secure user registration and login
*   Password hashing using **bcrypt**
*   JWT-based authentication
*   Role-based access control:
    * **Admin**: Full system access
    * **Customer**: Limited to own profile and bookings

###  Vehicle Management

*   Add, view, update, and delete vehicles
*   Availability tracking (`available`, `booked`)
*   Vehicle deletion blocked if active bookings exist

###  User Management

*   Admin can view and manage all users
*   Customers can update their own profile only
*   User deletion blocked if active bookings exist

###  Booking Management

*   Create bookings with automatic price calculation
*   Vehicle availability validation
*   Booking cancellation rules enforced
*   Vehicle auto-status update on booking changes
*   Auto-return logic when fetching bookings


##  Technology Stack

* **Node.js**
* **TypeScript**
* **Express.js**
* **PostgreSQL**
* **bcrypt**
* **jsonwebtoken (JWT)**


##  Project Structure

This project follows a **modular pattern folder structure**:
```
📦 Project Root(/src) 
│
├── 📄 server.ts
│
├── 📄 app.ts
│
├── 📁 config/
│         ├── 📄 config.ts
│         └── 📄 db.ts
│
├── 📁 middleware/
│         ├── 📄 auth.ts
│                  └─ Token/JWT validation
│
├── 📁 modules/
│         |── 📁 users/
│         |        ├── 📄 users.route.ts
│         |        │        └─ Users API Route handling
│         |        │
│         |        ├── 📄 users.controller.ts
│         |        │        └─ Controller: Request → Response
│         |        │
│         |        ├── 📄 users.service.ts
│         |        │        └─ business Logic
│         |── 📁 auth/
│         |        ├── 📄 auth.route.ts
│         |        │        └─ auth API Route handling
│         |        │
│         |        ├── 📄 auth.controller.ts
│         |        │        └─ Controller: Request → Response
│         |        │
│         |        ├── 📄 auth.service.ts
│         |        │        └─ business Logic
│         |── 📁 vehicles/
│         |        ├── 📄 vehicles.route.ts
│         |        │        └─ vehicles API Route handling
│         |        │
│         |        ├── 📄 vehicles.controller.ts
│         |        │        └─ Controller: Request → Response
│         |        │
│         |        ├── 📄 vehicles.service.ts
│         |        │        └─ business Logic
│         |── 📁 bookings/
│                 ├── 📄 bookings.route.ts
│                  │        └─ bookings API Route handling
│                  │
│                  ├── 📄 bookings.controller.ts
│                  │        └─ Controller: Request → Response
│                  │
│                  ├── 📄 bookings.service.ts
│                  │        └─ business Logic
|
└── 📁 types/
|          └─ index.d.ts    
└── 📁 utils/
           └─ index.d.ts

```

##  API Endpoints information

### Authentication

| Method | Endpoint              | Access |
| ------ | --------------------- | ------ |
| POST   | `/api/v1/auth/signup` | Public |
| POST   | `/api/v1/auth/signin` | Public |

### Vehicles

| Method | Endpoint                      | Access |
| ------ | ----------------------------- | ------ |
| POST   | `/api/v1/vehicles`            | Admin  |
| GET    | `/api/v1/vehicles`            | Public |
| GET    | `/api/v1/vehicles/:vehicleId` | Public |
| PUT    | `/api/v1/vehicles/:vehicleId` | Admin  |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin  |

### Users

| Method | Endpoint                | Access      |
| ------ | ----------------------- | ----------- |
| GET    | `/api/v1/users`         | Admin       |
| PUT    | `/api/v1/users/:userId` | Admin / Own |
| DELETE | `/api/v1/users/:userId` | Admin       |

### Bookings

| Method | Endpoint                      | Access           |
| ------ | ----------------------------- | ---------------- |
| POST   | `/api/v1/bookings`            | Customer / Admin |
| GET    | `/api/v1/bookings`            | Role-based       |
| PUT    | `/api/v1/bookings/:bookingId` | Role-based       |

##  Setup Instructions

### 1️. Clone this Repository

```bash
git clone <repositary-url>
cd project_name
```

### 2️. Install Dependencies

```bash
npm install
```

### 3️. Environment Variables

Create a `.env` file:

```env
CONNECTION_STRING= your neon db connection string
JWT_SECRET=your jwt secret key
PORT = 5000
```

### 4. Start the Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```


##  Authorization Header Format

```http
Authorization: Bearer <jwt_token>
```
