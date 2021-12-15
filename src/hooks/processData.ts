import { useState, useEffect } from "react";
import jsonData from '../data/data_fake.json';
import dataSchema from '../utils/schemas/data.json';
import { handleObject } from '../utils/jsonschema.js';

interface ReturnValue {
    output: string;
    handleClick: (task: string) => void;
}

function validate(){
  // TODO
  // need to loop over data set more efficiently using some sort of map + ano function
  jsonData.forEach(element => {
    handleObject(element,dataSchema )
});
  return "dummy";
}

function calculate(){}

function manipulate(){}

export default (): ReturnValue => {
    const [output, setOutput] = useState("");
    const handleClick = (task: string): void => {
      if (task == null) return;
      switch(task) {
          case "validate":
            setOutput(validate());
            break;
      }
    };
    return { output, handleClick };
  };
  