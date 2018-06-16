import * as firebaseApp from 'firebase';
import CONFIG from './setting';

const config = {
  apiKey: CONFIG.API_KEY,
  authDomain: CONFIG.AUTH_DOMAIN,
  databaseURL: CONFIG.DATABASE_URL,
  projectId: CONFIG.PROJECT_ID,
  storageBucket: CONFIG.STORAGE_BUCKET,
  messagingSenderId: CONFIG.MESSAGING_SENDER_ID
};

firebaseApp.initializeApp(config);

export const firebase = firebaseApp;

export const evaluationDbUrl = (uid) => {
  return uid + '/evaluations';
};

export const userDbUrl = (uid) => {
  return uid + '/user';
}

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};
