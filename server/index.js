const express = require('express')
const mongoose = require("mongoose")
const Router = require("./routes")
const {User, Promo} = require("./models")
const { spawn } = require("child_process")
var admin = require("firebase-admin");

var serviceAccount = require("./privateKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express()
app.use(express.json())

// This registration token comes from the client FCM SDKs.

async function main(){
    mongoose.connect(
        "mongodb+srv://mohamedalaa:av52o7RYvWDZ3b74@cluster0.qedvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
        }
    );

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
    console.log("Connected successfully");
    });

    app.use(Router);

    app.listen(5000, () => {
    console.log("Server is running at port 5000");
    });

    const changeStream = db.watch()

    changeStream.on('change', data =>{
        switch(data.ns.coll){
            case 'users':
                sendIndMessage(data); break;
            case 'promos':
                if(data.operationType === 'insert')
                    sendGroupMessages(data); break;
            default:
                console.log('NONE')
        }
    })
}
main().catch(console.error);

async function sendGroupMessages(data){
    var promoGroups = data.fullDocument.promoGroups
    var promoName = data.fullDocument.name
    promoGroups.forEach(element => {
        User.find({"promoGroup": element}, function(err, res){
            console.log(res)
            if(err) 
            console.log(err)
            else {
              res.forEach(e => {
                        var userMessage = e.lang?'SWVL':'سويفل' + promoName
                        spawn('python3', ['./alert.py', e.lang?'SWVL':'سويفل', promoName, e.email]),
                        pushNot(e, userMessage)
              })
            }
        })
    });
}

async function sendIndMessage(data){
    var userData = await User.findById(data.documentKey).exec()
    console.log(userData)
    var userMessage = userData.lang?`Your drop off station is next, ${userData.name}`:`محطتك هي الجية`
    if(userData.requireAlert){
        await spawn('python3', ['./alert.py', 'SWVL', userMessage, userData.email])
        pushNot(userData, userMessage)
        try {
            let doc = await User.findByIdAndUpdate(data.documentKey, {"requireAlert": false})
          } catch (error) {
            response.status(500).send(error);
          }
        }
}

async function pushNot(data, userMessage){

  const registrationToken = data.userToken;
  
  const message = {
    data: {
      text: userMessage,
    },
    token: registrationToken
  };
  
  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}