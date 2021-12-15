import { useState, useEffect } from "react";

interface ReturnValue {
    output: string;
    handleClick: (task: string) => void;
}

function validate(){
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
  