# Workspace Reservation Management System

## Project Description

Workspace Reservation Management System is a Single Page Application (SPA) developed with JavaScript, Vite, TailwindCSS, and JSON Server. The application allows employees to reserve shared workspaces such as private offices, meeting rooms, coworking areas, and auditoriums.

The system implements authentication, role-based access control, session persistence, protected routes, and full CRUD operations for workspace reservations.

The project was developed as part of a JavaScript performance assessment focused on SPA architecture, API consumption, user authentication, authorization, and frontend development best practices.

---

## Features

### Authentication

* User login system
* Credential validation using JSON Server
* Authentication error handling
* Session persistence with Local Storage
* Automatic redirection based on user role

### Role Management

#### Administrator

* View all reservations
* Create reservations
* Edit any reservation
* Delete reservations
* Approve reservations
* Reject reservations
* Access administrative features

#### User

* Create reservations
* View only their own reservations
* Edit pending reservations
* Cancel personal reservations
* Restricted access to administrative views

### Reservation Management

* Create reservations
* Read reservations
* Update reservations
* Delete reservations
* Reservation status management:

  * Pending
  * Approved
  * Rejected
  * Cancelled

### Security

* Protected routes
* Role-based authorization
* Unauthorized access prevention
* Functional logout
* Session cleanup on logout

### SPA Navigation

* Dynamic page rendering
* Navigation without page reload
* History API routing
* Improved user experience

---

## Technologies Used

* JavaScript (ES6+)
* Vite
* TailwindCSS
* HTML5
* CSS3
* JSON Server
* Fetch API
* Local Storage

---

## Project Structure

```plaintext
src/
│
├── components/
│   └── Navbar.js
│
├── controllers/
│   ├── authController.js
│   └── reservationController.js
│
├── pages/
│   ├── login.js
│   ├── dashboard.js
│   └── admin.js
│
├── router/
│   └── router.js
│
├── services/
│   ├── authService.js
│   └── reservationService.js
│
├── utils/
│   └── guards.js
│
├── main.js
│
public/
│
db.json
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd workspace-reservation-system
```

Install dependencies:

```bash
npm install
```

---

## Running the Project

Start the development server:

```bash
npm run dev
```

The application will be available at:

```plaintext
http://localhost:5173
```

---

## Running JSON Server

Start the mock API:

```bash
npx json-server --watch db.json --port 3001
```

Available endpoints:

```plaintext
http://localhost:3001/users
http://localhost:3001/reservations
```

---

## Test Users

### Administrator

```plaintext
Email: admin@test.com
Password: 123456
Role: admin
```

### User 1

```plaintext
Email: user1@test.com
Password: 123456
Role: user
```

### User 2

```plaintext
Email: user2@test.com
Password: 123456
Role: user
```

---

## Reservation Data Structure

```json
{
  "id": 1,
  "userId": 2,
  "space": "Meeting Room A",
  "date": "2026-06-10",
  "startTime": "09:00",
  "endTime": "11:00",
  "reason": "Project Meeting",
  "status": "Pending"
}
```

---

## Role Permissions

| Action                | Admin | User         |
| --------------------- | ----- | ------------ |
| View all reservations | Yes   | No           |
| View own reservations | Yes   | Yes          |
| Create reservation    | Yes   | Yes          |
| Edit reservation      | Yes   | Pending only |
| Delete reservation    | Yes   | No           |
| Approve reservation   | Yes   | No           |
| Reject reservation    | Yes   | No           |
| Cancel reservation    | Yes   | Yes          |
| Access admin routes   | Yes   | No           |

---

## Technical Decisions

### SPA Architecture

The application follows a Single Page Application architecture to provide dynamic navigation without reloading the browser.

### Modular Structure

The project is organized into independent modules:

* Pages for UI rendering
* Services for API communication
* Controllers for business logic
* Router for navigation management
* Guards for route protection

This approach improves maintainability, scalability, and code readability.

### Session Management

Local Storage is used to persist user sessions and maintain authentication state after page refreshes.

### API Consumption

The application communicates with JSON Server through the Fetch API, implementing CRUD operations using:

* GET
* POST
* PATCH
* DELETE

### Route Protection

Custom route guards verify:

* Authentication status
* User role permissions

Unauthorized users are automatically redirected to the appropriate view.

---

## Future Improvements

* Workspace management module
* Reservation search functionality
* Date filtering
* Dashboard statistics
* Pagination
* Toast notifications
* Dark mode
* Deployment to Vercel or Netlify

---

## Author

**Jhonatan Sanchez**

JavaScript Developer

Riwi Performance Assessment Project
