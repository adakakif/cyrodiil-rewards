import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

export const scheduledFunctionCrontab = functions.pubsub.schedule('* * * * *')
    .onRun((context) => {
      console.log('Weekly timer reset!');
      db.doc(`/countdown/M5EnqlAa2Gp7R4Rle3lb`).update(
          {
              'weekly': Math.round(Date.now() / 1000),
          }
      );
      return null;
    });
