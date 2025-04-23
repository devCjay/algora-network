# 🌐 Algora – React Native App (Expo)

Algora is a Mining app for the algora network, built using **React Native** and **Expo**

## 🚀 Features

- 🔐 User Authentication
- 📝 User Profile
- 🎟️ Raffle System
- 💰 AGX Mining
- 👥 Referral System (`ref_username` support)
- 📱 Optimized for iOS & Android
- 📦 Backend API Integration
- ⚡ Real-time Feedback with Toasts & Haptics

---

## 📦 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) – Navigation
- [React Native Paper](https://callstack.github.io/react-native-paper/) – UI Components 
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – Local storage
- [EAS Build](https://docs.expo.dev/build/introduction/) – Production builds

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/devCjay/algora-network.git
cd algora-network
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Run the app

```bash
npx expo start
```

Use `--lan` or `--tunnel` depending on your device connection.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
API_BASE_URL=https://api-v1.algora.network
```

> Replace with your actual environment keys.

---

## 📱 Building the App

Use [EAS Build](https://docs.expo.dev/build/introduction/) for production-ready builds:

```bash
eas build --platform android
# or
eas build --platform ios
```

Make sure you have EAS CLI installed:

```bash
npm install -g eas-cli
```

---

## 📂 Folder Structure

```
/assets          → Static assets (icons, splash)
/components      → Reusable components
/screens         → All app screens
/routes          → Navigation config
/utils           → Utility functions
```

---


## 📄 License

MIT © [devCjay](https://github.com/devCjay)

---

