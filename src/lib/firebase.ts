import { FirebaseApp, initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

export const init = () => {
  let app: FirebaseApp;
  const apps = getApps();
  if (apps.length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
    // getAnalytics(app);
  }
  return app;
};

export const getFirebaseApp = () => {
  let app: FirebaseApp;
  const apps = getApps();
  if (apps.length > 0) {
    app = getApp();
  } else {
    app = init();
  }
  return app;
};

export const getCloudMessaging = () => {
  const app = getFirebaseApp();
  return getMessaging(app);
};

export const getFCMToken = async () => {
  try {
    const status = await Notification.requestPermission();
    if (status && status === "granted") {
      const messaging = getCloudMessaging();
      const token = await getToken(messaging, {
        vapidKey: ""
      });
      return token;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
