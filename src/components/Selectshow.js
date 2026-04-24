import React, { useEffect, useState } from "react";
import { getStates, getCity, getLandmark } from "../data/StateData";

const Selectshow = () => {
  const states = getStates();

  const [selectedSt, setSelectedSt] = useState(states[0].name);
  const [ct, setCt] = useState([]);
  const [selectedCt, setSelectedCt] = useState("");
  const [ldm, setLdm] = useState([]);
  const [selectedLdm, setSelectedLdm] = useState("");
  const selectedStateObj = states.find(s => s.name === selectedSt);

const selectedCityObj = ct.find(c => c.name === selectedCt);

const selectedLandmarkObj = ldm.find(l => l.name === selectedLdm);

  // When state changes
  useEffect(() => {
  const cities = getCity(selectedSt) || [];
  setCt(cities);

  const firstCity = cities[0]?.name || "";
  setSelectedCt(firstCity);

  const landmarks = firstCity
    ? getLandmark(selectedSt, firstCity)
    : [];

  setLdm(landmarks);
  setSelectedLdm(landmarks[0]?.name || "");
}, [selectedSt]);
  // When city changes
  useEffect(() => {
    if (selectedCt) {
      const landmarks = getLandmark(selectedSt, selectedCt);
      setLdm(landmarks);
      setSelectedLdm(landmarks[0]?.name || "");
    }
  }, [selectedCt, selectedSt]);

  return (
    <div>
      <div id="state-title">
      <select
      id="state"
        value={selectedSt}
        onChange={(e) => setSelectedSt(e.target.value)}
      >
        {states.map((item, ind) => (
          <option key={ind} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <div id="state-description">
        <p>{selectedStateObj?.description}</p>
      </div>
      </div>
      <div id="city-name">
      
      <select
      id="city"
        value={selectedCt}
        onChange={(e) => setSelectedCt(e.target.value)}
      >
        {ct.map((item, ind) => (
          <option key={ind} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <div id="city-description">
    <p>{selectedCityObj?.description}</p>
      </div>
      </div>
     <div id="landmark-name">
      <select
      id="landmark"
        value={selectedLdm}
        onChange={(e) => setSelectedLdm(e.target.value)}
      >
        {ldm.map((item, ind) => (
          <option key={ind} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <div id="landmark-description"><p>{selectedLandmarkObj?.description}</p></div>
      </div>
    </div>
  );
};

export default Selectshow;