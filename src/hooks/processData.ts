import { useState, useEffect } from "react";
import jsonData from '../data/data_fake.json';
import jsonGeo from '../data/geo_fake.json';
import dataSchema from '../utils/schemas/data.json';
import { handleObject } from '../utils/jsonschema.js';



function validate(){
  // TODO
  // need to loop over data set more efficiently using some sort of map + ano function
  jsonData.forEach(element => {
    handleObject(element,dataSchema )
});
  return "dummy";
}


// TODO
// move props into interface
// and move function into utils
function calcDistance(lat1: number, lat2: number, lon2: number, lon1: number){
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // in metres
  return d;
}

// TODO 
// move props into interface
// and move function into utils
function compare( a: { distance: number; }, b: { distance: number; } ) {
  if ( a.distance < b.distance ){
    return -1;
  }
  if ( a.distance > b.distance ){
    return 1;
  }
  return 0;
}

function calculate(){
  // TODO
  // move props into interface
  var sortable: { lat: number; lon: number; ipv4: string; geo: string; }[] = [];
  // TODO
  // this will rather be a map
  var newArray = jsonGeo.filter(function (el) {
    var location = el.geo.split(",");
    var lat = parseFloat(location[0]);
    var lon = parseFloat(location[1])
    sortable.push({"lat": lat, "lon": lon, "ipv4": el.ipv4,"geo": el.geo});
  });
  // TODO 
  // need to create distance pairs and then feed it to the below method
  // sortable.sort( compare ).slice(0,10);
  return "dummy";
}

function manipulate(){
  return "dummy";
}

interface ReturnValue {
  output: string;
  handleClick: (task: string) => void;
}

export default (): ReturnValue => {
  const [output, setOutput] = useState("");
  const handleClick = (task: string): void => {
    if (task == null) return;
    switch(task) {
      case "validate":
        setOutput(validate());
        break;
      case "calculate":
        setOutput(calculate());
        break;
      case "manipulate":
        setOutput(manipulate());
        break;
    }
  };
  return { output, handleClick };
};
  