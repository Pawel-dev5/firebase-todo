import "./App.scss";
import firebase from "firebase/app";
import "firebase/database";
import { useState, useEffect } from "react";
import { Add } from "./components/Add";
import { List } from "./components/List";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function App() {
  const [appState, setAppState] = useState({
    isLoading: true,
  });
  const [data, setData] = useState([]);
  console.log(data);
  const [item, setItem] = useState("");
  console.log(item);
  // const user = `pawelnoo`;
  // const email = "p.nowecki@gmail.com";
  const [lists, setLists] = useState([]);
  console.log(lists);

  // READ DATA FROM FIREBASE
  useEffect(() => {
    const ref = firebase.database().ref();
    ref.on("value", (snapshot) => {
      const fetchData = snapshot.val();
      setData(fetchData);
      setAppState({
        isLoading: false,
      });
      setLists(fetchData.users.pawelnoo.database.list);
    });
    // Clean-up function
    return () => ref.off("value");
  }, []);

  return (
    <>
      {!appState.isLoading ? (
        <div className="App">
          <h2>To Do Aplication</h2>
          <List lists={lists} />
          <Add
            data={data}
            lists={lists}
            setItem={setItem}
            item={item}
          />
        </div>
      ) : (
        <>
          <div className="App">
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
