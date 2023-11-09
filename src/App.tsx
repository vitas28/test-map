import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyD5ayGKPBW79SN5fVdqhLQkO7zKRhcoHxs",
  authDomain: "map-project-f59c8.firebaseapp.com",
  databaseURL:
    "https://map-project-f59c8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "map-project-f59c8",
  storageBucket: "map-project-f59c8.appspot.com",
  messagingSenderId: "275039291251",
  appId: "1:275039291251:web:28474527dc64ce708ba706",
  measurementId: "G-S94HQKZFK1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [quests, setQuests] = useState<any>([]);
  const [position, setPosition] = useState<any>(null);

  const handleMapClick = (e: any) => {
    const newQuest = {
      location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      timestamp: new Date(),
    };

    setQuests([...quests, newQuest]);

    const locationsCollection = collection(db, "Locations");

    addDoc(locationsCollection, newQuest)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="main__title">React Map</h1>
        <LoadScript googleMapsApiKey="AIzaSyBAUXx2vOKx-o2pT6fkcw3NnSP2D2POBds">
          <GoogleMap
            id="map"
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: 0, lng: 0 }}
            zoom={4}
            onClick={handleMapClick}>
            {quests.map((quest: any, index: number) => (
              <Marker
                key={index}
                position={quest.location}
                label={`${index + 1}`}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default App;
