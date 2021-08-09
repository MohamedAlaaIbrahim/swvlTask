import React from 'react'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBK7D4qEqUrZljstnuHdf8L2QqzWL7usbk",
  authDomain: "swvl-task-17fe5.firebaseapp.com",
  projectId: "swvl-task-17fe5",
  storageBucket: "swvl-task-17fe5.appspot.com",
  messagingSenderId: "404361908780",
  appId: "1:404361908780:web:b8c544a03d19d30ab2f789",
  measurementId: "G-J489JD9Q7K"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(firebaseApp);

export default function App() {
      messaging.onMessage((payload) => {
        console.log(payload)
    })
    React.useEffect(() => {
        messaging.getToken({
            vapidKey: 'BIqcXGijA1PrToDRShPEs3A8XVVEY6SjvLpFtQZ420hPpj1wS_i-sifTzMmFEP6conkmKjQ6F-mxOaYmRuVsEc4'
        })
            .then((FCMToken) => {
                console.log(FCMToken);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div>

        </div>
    )
}