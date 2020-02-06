import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAg0DoA_SSJp5uPodDYIXURXeVxQ1psk08",
    authDomain: "winery-fd3ae.firebaseapp.com",
    databaseURL: "https://winery-fd3ae.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;