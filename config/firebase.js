import * as firebase from 'firebase';
import CONFIG from './setting';

const config = {
  apiKey: CONFIG.API_KEY,
  authDomain: CONFIG.AUTH_DOMAIN,
  databaseURL: CONFIG.DATABASE_URL,
  projectId: CONFIG.PROJECT_ID,
  storageBucket: CONFIG.STORAGE_BUCKET,
  messagingSenderId: CONFIG.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

// 認証時のコールバック
firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.warn('We are authenticated now!')
  }
})

export default firebase;
