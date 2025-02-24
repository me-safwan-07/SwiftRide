# SwiftRide

SwiftRide is a ride-hailing backend service built using Node.js and Express.js, with MongoDB as the database. It includes authentication for users and captains (drivers), map services for location-based functionalities, and a structured API for ride management.

## Features

- User and Captain authentication (JWT-based)
- Secure password storage using bcrypt
- Blacklist token functionality for logout security
- MongoDB database integration
- Middleware-based error handling and authentication
- Google Maps API integration for location services
- Modular MVC architecture

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcrypt
- **External APIs:** Google Maps API
- **Development Tools:** Nodemon, dotenv, eslint

## Project Structure

```
me-safwan-07-swiftride/
├── package.json
└── server/
    ├── app.js
    ├── package-lock.json
    ├── package.json
    ├── server.js
    ├── controllers/
    │   ├── captain.controller.js
    │   ├── map.controller.js
    │   └── user.controller.js
    ├── db/
    │   └── db.js
    ├── middlewares/
    │   ├── auth.middleware.js
    │   └── errorHandler.middleware.js
    ├── models/
    │   ├── blacklistToken.model.js
    │   ├── captain.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── captain.routes.js
    │   ├── map.routes.js
    │   └── user.routes.js
    └── services/
        ├── captain.service.js
        ├── maps.service.js
        └── user.service.js
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/swiftride.git
   cd swiftride
   ```
2. Install dependencies:
   ```sh
   cd server
   npm install
   ```
3. Create a `.env` file in the `server/` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/SwiftRide
   JWT_SECRET=your_secret_key
   GOOGLE_MAPS_API=your_google_maps_api_key
   ```

## Running the Project

1. Start the server:
   ```sh
   npm start
   ```
2. The backend will run on:
   ```
   http://localhost:5000
   ```

## API Routes

### User Authentication
- **POST /api/user/register** - Register a new user
- **POST /api/user/login** - Login user
- **GET /api/user/me** - Get user profile
- **POST /api/user/logout** - Logout user

### Captain Authentication
- **POST /api/captain/register** - Register a new captain
- **POST /api/captain/login** - Login captain
- **GET /api/captain/profile** - Get captain profile
- **GET /api/captain/logout** - Logout captain

### Map Services
- **GET /api/maps/get-coordinates?address=** - Get coordinates for an address

## License

This project is licensed under the ISC License.

## Author

Developed by Muhammed Safwan.

