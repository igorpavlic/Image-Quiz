# 🧠 Image Quiz

An interactive web-based quiz game that challenges players to identify AI-generated images. Built with Vue.js 3 and powered by Firebase for authentication and data storage.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-9.x-FFCA28?style=flat&logo=firebase&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🎮 How It Works

Players are presented with AI-generated images and must guess what object or concept the image represents. The game uses DeepAI's text-to-image API to generate unique images based on a curated word list stored in Firebase.

## ✨ Features

- 🔐 **User Authentication** - Secure login/register system via Firebase Auth
- 🎨 **AI Image Generation** - Dynamic image creation using DeepAI API
- 🏆 **Highscore System** - Global leaderboard with player rankings
- ⚡ **Real-time Scoring** - Instant feedback and score updates
- 👨‍💼 **Admin Panel** - Easy word management for administrators
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎯 **Interactive UI** - Clean, intuitive interface with loading animations

## 🚀 Live Demo

[Play the game here!](#) <!-- Add your deployment URL -->

## 🛠️ Tech Stack

- **Frontend**: Vue.js 3 (Composition API)
- **Backend**: Firebase (Firestore Database, Authentication)
- **AI Service**: DeepAI Text-to-Image API
- **Styling**: Custom CSS with responsive design
- **Build Tool**: Vite

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project
- DeepAI API key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/igorpavlic/image-quiz.git
   cd image-quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

   # DeepAI API
   VITE_DEEPAI_API_KEY=your_deepai_api_key
   ```

4. **Firebase Setup**
   - Create collections in Firestore:
     - `words` - for storing quiz words
     - `users` - for user profiles and scores
   
   Sample word document structure:
   ```json
   {
     "word": "example_word"
   }
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### For Players
1. **Register/Login** with email and password
2. **Start Playing** - Images will be generated automatically
3. **Type Your Answer** and press Enter or click Check
4. **Track Your Score** - Points are saved in real-time
5. **View Leaderboard** - See how you rank against other players

### For Administrators
- Admin access is granted to the configured owner email
- Use the **Admin Panel** to add new words to the quiz database
- Words can be added in bulk, separated by commas or spaces

## 📁 Project Structure

```
src/
├── components/
│   ├── AdminPanel.vue      # Admin word management
│   ├── DataProvider.vue    # Data fetching and API calls
│   ├── Footer.vue          # App footer
│   ├── Header.vue          # App header
│   ├── Highscore.vue       # Leaderboard display
│   ├── Login.vue           # User login form
│   ├── QuizView.vue        # Main game interface
│   └── Register.vue        # User registration form
├── assets/
│   └── main.css           # Global styles
├── firebase.js            # Firebase configuration
├── App.vue               # Root component
└── main.js              # App entry point
```

## 🔧 Configuration

### Admin Access
Set the owner email in `App.vue`:
```javascript
const ownerEmail = 'your-admin-email@domain.com'
```

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // For leaderboard
    }
    match /words/{wordId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.email == 'your-admin-email@domain.com';
    }
  }
}
```

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🎨 Customization

### Styling
The app uses custom CSS with CSS custom properties. Key classes:
- `.container` - Main app wrapper
- `.wrapper` - Quiz content container  
- `.spinner-circle` - Loading animation
- `.score-item` - Leaderboard entries

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Igor Pavlić**
- GitHub: [@igorpavlic](https://github.com/igorpavlic)
- Email: ipavlic@hotmail

## 🙏 Acknowledgments

- [DeepAI](https://deepai.org/) for the image generation API
- [Firebase](https://firebase.google.com/) for backend services
- [Vue.js](https://vuejs.org/) for the reactive framework
- The open-source community for inspiration and resources