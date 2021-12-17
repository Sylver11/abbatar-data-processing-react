import { useState, useEffect } from "react";
import jsonData from '../data/data.json';
import jsonGeo from '../data/geo.json';
import p3Data from '../data/p3Data.json';
import { validateDataJson, validateGeoJson} from '../utils/jsonschema';
import { reducer } from '../utils/reducer.js';


function validate(){
  let validationResults: { ok: boolean; message: string; } [] =[];
  jsonData.forEach(element => {
    validationResults.push(validateDataJson(element))
  });
  jsonGeo.forEach(element => {
    validationResults.push(validateGeoJson(element))
  });
  return validationResults;
}

// TODO
// move props into interface
// and move function into utils
function calcDistance(lat1: number, lat2: number, lon1: number, lon2: number){
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

// TODO
// this part needs lots of refactoring and imroved logic
// too many loops and need to move parts into utils
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
  // Not so sure about this one but these are the two inputs that the calcDistance
  // takes as a reference point to the locations supplied in the geo.json
  var lat1 = 0;
  var lon1 = 0;
  var withDistances: { distance: number; ipv4: string; }[] = [];
  for (let i = 0; i <  sortable.length; i++) {
    var distance = calcDistance(lat1, sortable[i]["lat"], lon1, sortable[i]["lon"]);
    withDistances.push({"distance": distance, "ipv4": sortable[i]["ipv4"]})
  } 
  // TODO 
  // need to create distance pairs and then feed it to the below method
  withDistances = withDistances.sort( compare ).slice(0,10);
  var regexIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  let arr:{ active: number; asn: number; countrycode: string; id: number; statecode: string|null; meta: string; ipv4: string;}[] = [];
  for (let i = 0; i <  jsonData.length; i++) {
    var metaString = jsonData[i]["meta"];
    var metaStringArray = metaString.match(regexIp);
    var testing ="";
    let grade ={};
    if(metaStringArray){
      testing = metaStringArray[0];
      grade = {
        ipv4: testing 
      };
    }
    arr.push({"active": jsonData[i].active, "asn": jsonData[i].asn, "countrycode":jsonData[i].countrycode, "id": jsonData[i].id, "statecode": jsonData[i].countrycode, "meta":jsonData[i].meta, "ipv4": testing})
  } 
  let final: { active: number; asn: number; countrycode: string; id: number; statecode: string|null; meta: string; ipv4: string;}[] = [];
  arr.map(function(x){ 
    var result=withDistances.filter(a1=> a1.ipv4==x.ipv4);
    if(result.length>0) {
      var index = withDistances.findIndex(y => y.ipv4 === x.ipv4);
      final[index] = x;
    }
  })
  return final;
}

function manipulate(){
  // the objects of each array must be merged based on the attribute "name"
  // however, the values of identical attribute names that are number types
  // of the two objects that are supposed to be merged must be summed
  // whereas objects that only hold the attribute "name" 
  // must be ignored (none in the given dataset)
  
  var testSet1 = p3Data["testSet1"];
  var testSet2 = p3Data["testSet2"];
  // TODO
  // bit of a hacky solution there 
  // eventually transfer to TS
  var result = reducer(testSet1, testSet2);
  return JSON.stringify(result);
}

// interface IValidationResults {
//   validationResults: { ok: false; message: string; }[];
// }

// interface IMetaData {
//   metaData: { file_name: string; count_total: number; count_valid: number; }[];
// }

interface ReturnValue {
  outputValidation: {
    ok: boolean;
    message: string;
  }[]
  output: string;
  outputCalculation: { active: number; asn: number; countrycode: string; id: number; statecode: string|null; meta: string; ipv4: string;}[]
  handleClick: (task: string) => void;
}

export default (): ReturnValue => {
  const [outputValidation, setValidation] = useState<
  Array<{
    ok: boolean;
    message: string;
  }>
  >([]);
  const [output, setOutput] = useState("");
  const [outputCalculation, setOutputCalculation] = useState<
    Array<{
        active: number,
        asn: number,
        countrycode: string,
        id: number,
        statecode: string|null,
        meta: string,
        ipv4: string
    }>
  >([])
  const handleClick = (task: string): void => {
    if (task == null) return;
    switch(task) {
      case "validate":
        setValidation(validate());
        break;
      case "calculate":
        setOutputCalculation(calculate());
        break;
      case "manipulate":
        setOutput(manipulate());
        break;
    }
  };
  return { outputValidation, output, outputCalculation, handleClick };
};
