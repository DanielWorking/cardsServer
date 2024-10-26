# Business Card Backend Server

This backend server is built in JavaScript with Node.js, Express, and MongoDB, and it powers the business cards web app. The server handles user authentication, manages business card data, and facilitates all API interactions for the frontend, which is built in React.

## Features

- User authentication and authorization (JWT, bcryptjs)
- CRUD operations for business card management
- Centralized configuration management
- Data validation with Joi
- Logging and debugging support
- Cross-origin resource sharing (CORS) enabled for safe access

## Tech Stack

- **Node.js** and **Express**: For server creation and API management
- **MongoDB** and **Mongoose**: For database and schema modeling
- **JWT**: For secure user sessions
- **Joi**: For data validation
- **dotenv**: To manage environment variables securely
- **morgan** and **chalk**: For request logging and better terminal output
- **config**: To manage environment-based configuration

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/business-card-backend.git
   cd business-card-backend

2. Install dependencies:
   ```bash
    npm install

3. Configure environment variables:
- Create a .env file in the root directory.
- Add your MongoDB URI and JWT secret:<br>
    MONGO_URI=your_mongodb_uri<br>
    JWT_SECRET=your_jwt_secret

4. Run the server:
   ```bash
    npm start

## Scripts

- **npm start**: Starts the server in production mode.
- **npm run dev**: Starts the server with nodemon for development mode.
- **npm test**: Runs tests (if implemented).

## Project Structure

CARDSSERVER/<br>
├── auth/ **# Authentication services and providers**<br>
│   ├── providers/<br>
│   │   └── jwt.js                       
│   └── authService.js                   
├── cards/ **# Card-related functionality**<br>
│   ├── helpers/<br>
│   │   ├── generateBizNumber.js         
│   │   └── normalizeCard.js             
│   ├── models/<br>
│   │   └── mongodb/<br>
│   │       └── card.js **# Mongoose schema and model for cards**<br>
│   ├── routes/<br>
│   │   └── cardsRestController.js **# Card-related route handlers**<br>
│   └── validation/ **# Card validation**<br>
│       ├── joi/<br>
│       │   └── validateCardWithJoi.js   
│       └── cardValidationService.js     
├── config/ **# Configuration files for different environments**<br>
│   ├── default.json                     
│   ├── development.json                 
│   └── production.json                  
├── db/ **# Database connections**<br>
│   ├── mongodb/<br>
│   │   ├── connectToAtlas.js            
│   │   └── connectToMongodbLocally.js   
│   └── dbService.js                     
├── helpers/                             
│   └── mongodb/ **# Mongoose schema and model for users**<br>
│       ├── Address.js                   
│       ├── Image.js                     
│       ├── mongooseValidators.js        
│       └── Name.js                      
├── logger/                              
│   ├── loggers/<br>
│   │   └── morganLogger.js **# Configured morgan logger for HTTP requests**<br>
│   └── loggerService.js **# Logger service for application-level logs**<br>
├── middlewares/<br>
│   └── cors.js **# CORS configuration middleware**<br>
├── router/<br>
│   └── router.js **# Main router that integrates all route modules**<br>
├── users/ **# User-related functionality**<br>
│   ├── helpers/<br>
│   │   └── bcrypt.js **# Password hashing and comparison using bcrypt**<br>
│   ├── models/<br>
│   │   └── mongodb/<br>
│   │       └── User.js **# Mongoose schema and model for users**<br>
│   ├── routes/<br>
│   │   └── usersRestController.js **# User-related route handlers**<br>
│   └── validation/<br>
│       ├── Joi/<br>
│       │   ├── loginValidation.js       
│       │   └── registerValidation.js    
│       └── userValidationService.js     
├── utils/ **# Utility functions used across the project**<br>
│   ├── handleErrors.js                  
│   └── timeHelper.js                    
├── .env                                 
├── .gitignore                           
├── app.js **# Main application file**<br>
├── package-lock.json                    
└── package.json                         

## API Documentation

Detailed API documentation is available in Postman. You can view and interact with it [here](https://web.postman.co/workspace/17eaf1e8-3848-4823-8975-4cbd6c4f972c/overview).
