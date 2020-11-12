import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCuPTjTdB3yqbj3UPdsuh4IVnkVRaWmvDI',
  authDomain: 'eghl-firebase.firebaseapp.com',
  databaseURL: 'https://eghl-firebase.firebaseio.com',
  projectId: 'eghl-firebase',
  storageBucket: 'eghl-firebase.appspot.com',
  messagingSenderId: '653704141441',
  appId: '1:653704141441:ios:c26670653667def6f8cb80',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };