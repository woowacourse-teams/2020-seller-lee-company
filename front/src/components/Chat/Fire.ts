import firebase from "firebase";
import { firebaseSecret } from "../../secret";
import { Alert } from "react-native";

class Fire {
  static shared: Fire;
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
      apiKey: firebaseSecret.apiKey,
      authDomain: "seller-lee-chat.firebaseapp.com",
      databaseURL: "https://seller-lee-chat.firebaseio.com",
      projectId: "seller-lee-chat",
      storageBucket: "seller-lee-chat.appspot.com",
      messagingSenderId: firebaseSecret.messagingSenderId,
      appId: firebaseSecret.appId,
      measurementId: firebaseSecret.measurementId,
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user: any) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        Alert.alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("messages");
  }

  parse = (snapshot: { val?: any; key?: any }) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      createdAt: timestamp.getTime(),
      text,
      user,
    };
    return message;
  };

  on = (callback: (message: never[]) => void) =>
    this.ref
      .limitToLast(20)
      // @ts-ignore
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  send = (messages: string | any[]) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = (message: any) => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
