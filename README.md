This is a chatbot built using Gemini. Clone the repository to start.
Installation:
Node.js
npm
install dependencies using npm install
set up a firebase backend at Firebase Console and enable Firestore and Authentication(Google sign-in).
Create a .env file in the root directory and add your Firebase config environment variables:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Run the application:
npm run dev.

Usage
Login: Navigate to the login page and sign in with your Google account.
Chat: Interact with the chatbot and ask questions related to SOX compliance.
View History: Access your chat history from the "All History" page.
Packages
Here are the main packages used in this project:

react
react-dom
react-router-dom
react-bootstrap
react-firebase-hooks
firebase
react-toastify
framer-motion
vite
eslint
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the [MIT License].
