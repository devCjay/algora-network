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
```

### 3. Login to Expo

```bash
expo login
If you don't have an account, sign up at https://expo.dev
```


## 📱 Building the App for iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS CLI
eas build:configure

# Login to Apple Developer
eas credentials
# Follow the prompts to set up provisioning profile and certificates.

# Start Build
eas build -p ios --profile production

````

## Kindly note - you need java jdk-17 installed on your machine to build the app for iOS.

## 📂 Folder Structure

```
/assets          → Static assets (icons, splash)
/components      → Reusable components
/screens         → All app screens
/routes          → Navigation config
/utils           → Utility functions
```

---



