// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};
let firebaseInitialized = false;
let db, realtimeDb, storage, auth;
try {
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  db = getFirestore(app);

  // Initialize Realtime Database
  realtimeDb = getDatabase(app);

  // Initialize Storage
  storage = getStorage(app);

  // Initialize Auth
  auth = getAuth(app);
} catch (error) {
  if (!firebaseInitialized) {
    firebaseInitialized = true;
    throw new Error(
      'Xảy ra lỗi cài đặt và cấu hình SDK của Firebase. Điều này có thể xảy ra do:\n - Chưa tạo tệp tin .env hay .env.local\n - Nội dung trong tệp tin .env hay .env.local không hợp lệ\n - Chưa điền thông tin cấu hình SDK của Firebase vào tệp tin .env hay .env.local\n - Thông tin cấu hình SDK của Firebase không hợp lệ\nVui lòng kiểm tra và thử lại sau!',
    );
  }
}

// Exporting the services outside the try block
export { db, realtimeDb, storage, auth };
