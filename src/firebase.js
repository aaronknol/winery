import React from 'react';
import firebase from 'firebase';

const firebaseApp  = firebase.initializeApp({
    apiKey: "AIzaSyAg0DoA_SSJp5uPodDYIXURXeVxQ1psk08",
    authDomain: "winery-fd3ae.firebaseapp.com",
    databaseURL: "https://winery-fd3ae.firebaseio.com"
});

const database = firebaseApp.database();

export { database };