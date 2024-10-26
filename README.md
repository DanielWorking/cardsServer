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
    npm install

3. Configure environment variables:
- Create a .env file in the root directory.
- Add your MongoDB URI and JWT secret:
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

4. Run the server:
    npm start

## Scripts

- **npm start**: Starts the server in production mode.
- **npm run dev**: Starts the server with nodemon for development mode.
- **npm test**: Runs tests (if implemented).

## Project Structure

CARDSSERVER/
├── auth/                                # Authentication services and providers
│   ├── providers/
│   │   └── jwt.js                       
│   └── authService.js                   
├── cards/                               # Card-related functionality
│   ├── helpers/
│   │   ├── generateBizNumber.js         
│   │   └── normalizeCard.js             
│   ├── models/
│   │   └── mongodb/
│   │       └── card.js                  # Mongoose schema and model for cards
│   ├── routes/
│   │   └── cardsRestController.js       # Card-related route handlers
│   └── validation/                      # Card validation
│       ├── joi/
│       │   └── validateCardWithJoi.js   
│       └── cardValidationService.js     
├── config/                              # Configuration files for different environments
│   ├── default.json                     
│   ├── development.json                 
│   └── production.json                  
├── db/                                  # Database connections
│   ├── mongodb/
│   │   ├── connectToAtlas.js            
│   │   └── connectToMongodbLocally.js   
│   └── dbService.js                     
├── helpers/                             
│   └── mongodb/                         # Mongoose schema and model for users
│       ├── Address.js                   
│       ├── Image.js                     
│       ├── mongooseValidators.js        
│       └── Name.js                      
├── logger/                              
│   ├── loggers/
│   │   └── morganLogger.js              # Configured morgan logger for HTTP requests
│   └── loggerService.js                 # Logger service for application-level logs
├── middlewares/
│   └── cors.js                          # CORS configuration middleware
├── router/
│   └── router.js                        # Main router that integrates all route modules
├── users/                               # User-related functionality
│   ├── helpers/
│   │   └── bcrypt.js                    # Password hashing and comparison using bcrypt
│   ├── models/
│   │   └── mongodb/
│   │       └── User.js                  # Mongoose schema and model for users
│   ├── routes/
│   │   └── usersRestController.js       # User-related route handlers
│   └── validation/
│       ├── Joi/
│       │   ├── loginValidation.js       
│       │   └── registerValidation.js    
│       └── userValidationService.js     
├── utils/                               # Utility functions used across the project
│   ├── handleErrors.js                  
│   └── timeHelper.js                    
├── .env                                 
├── .gitignore                           
├── app.js                               # Main application file
├── package-lock.json                    
└── package.json                         

## API Documentation

Detailed API documentation is available in Postman. You can view and interact with it [here](https://web.postman.co/workspace/17eaf1e8-3848-4823-8975-4cbd6c4f972c/overview).
