# ArtForge - AI Text-to-Image Generator

ArtForge is a full-stack web application that transforms textual descriptions into high-quality images using AI technology. Create stunning, realistic images from simple text prompts with just a few clicks.

![ArtForge Logo](./client/src/assets/logo.svg)

## 🌟 Features

- **Text-to-Image Generation**: Convert text descriptions into detailed images
- **User Authentication**: Secure login and registration system
- **Credit System**: Each account comes with 5 free credits to start
- **Credit Management**: Use credits for each image generation
- **Payment Integration**: Purchase credits via Razorpay payment gateway
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations and transitions
- **Axios** - Promise-based HTTP client
- **React Router** - Navigation and routing
- **React Toastify** - Toast notifications
- **Vite** - Fast development and build tool
- **Razorpay** - Payment gateway integration

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication via JSON Web Tokens
- **bcrypt** - Password hashing
- **ClipDrop API** - AI image generation service
- **Razorpay API** - Payment processing

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB account
- ClipDrop API key
- Razorpay account with API keys

## 🚀 Installation & Setup

### Clone the repository
```bash
git clone https://github.com/yourusername/artforge.git
cd artforge
```

### Backend Setup
```bash
cd server
npm install

# Create a .env file with the following variables:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# CLIPDROP_API_KEY=your_clipdrop_api_key
# RAZORPAY_KEY_ID=your_razorpay_key_id
# RAZORPAY_KEY_SECRET=your_razorpay_key_secret
# PORT=3000

# Start the server
npm run server
```

### Frontend Setup
```bash
cd client
npm install

# Create a .env file with:
# VITE_BACKEND_URL=http://localhost:3000

# Start the development server
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `CLIPDROP_API_KEY`: API key for ClipDrop's image generation service
- `RAZORPAY_KEY_ID`: Razorpay API key ID
- `RAZORPAY_KEY_SECRET`: Razorpay API key secret
- `PORT`: Port for the Express server (default: 3000)

### Frontend (.env)
- `VITE_BACKEND_URL`: URL of the backend API

## 📱 Application Flow

1. **User Registration/Login**: Create an account or log in to access the application
2. **Check Credits**: View available credits in the navbar
3. **Generate Images**: Enter a text prompt and click "Generate" to create an image
4. **View Results**: See the generated image and download if desired
5. **Buy Credits**: Purchase additional credits when needed

## 🔍 API Endpoints

### User Routes
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login existing user
- `GET /api/user/credits` - Get user credit balance

### Image Routes
- `POST /api/image/generate-image` - Generate image from text prompt

### Payment Routes
- `POST /api/payment/order` - Create a Razorpay order
- `POST /api/payment/verify` - Verify Razorpay payment

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Upon successful login, a token is generated and stored in localStorage. This token is sent with subsequent API requests to authenticate the user.

## 💵 Credit System

- New users receive 5 free credits upon registration
- Each image generation costs 1 credit
- Additional credits can be purchased via Razorpay payment gateway

## 🖼️ Image Generation

The application uses ClipDrop's API to generate images based on text prompts. The process works as follows:

1. User enters a text description
2. Request is sent to the backend
3. Backend verifies user has sufficient credits
4. Request is forwarded to ClipDrop API
5. Generated image is returned to the user
6. 1 credit is deducted from the user's balance

## 🧩 Project Structure

```
artforge/
├── client/                 # Frontend React application
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── assets/         # Images and static files
│   │   ├── Components/     # Reusable UI components
│   │   ├── context/        # React Context for state management
│   │   └── pages/          # Application pages
│   └── package.json        # Frontend dependencies
│
└── server/                 # Backend Node.js application
    ├── config/             # Configuration files
    ├── controllers/        # Request handlers
    ├── middlewares/        # Custom Express middlewares
    ├── models/             # Mongoose models
    ├── routes/             # API route definitions
    └── package.json        # Backend dependencies
```

## 🚧 Future Improvements

- User profile management
- Image history and gallery
- Advanced generation options (size, style, etc.)
- Social sharing capabilities

## 🌐 Deployment

### Frontend
- The React application can be deployed on Vercel, Netlify, or similar platforms
- Build the project using `npm run build` before deployment

### Backend
- The Node.js application can be deployed on platforms like Heroku, Render, or Railway
- Configure environment variables in the deployment platform's dashboard
- Set up proper CORS configuration for production

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created by [Sangamesh](https://github.com/Sangamesh8892)

---

Feel free to contribute to this project by submitting issues or pull requests!

