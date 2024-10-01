import * as fs from 'fs';
import admin from 'firebase-admin';

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_REALTIME_DB_URL,
});

const db = admin.database();
const firestore = admin.firestore();
const messaging = admin.messaging();

export { db, firestore, messaging };
