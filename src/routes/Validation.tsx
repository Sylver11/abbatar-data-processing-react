import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ProcessButton from "../components/ProcessButton";


function getNumberOfErrors(outputValidation: {
  ok: boolean;
  message: string;
}[]){
  var res = outputValidation.filter(val => {
    return val.ok == false;
  })
  return res.length
}


interface Props {
  outputValidation: {
    ok: boolean;
    message: string;
  }[]
  handleClick(task: string): void;  
}

function Validation(props: Props) {
  return (
    <Stack spacing={2}>
      <Box 
        component="div" 
        sx={{ display: 'inline' }}
        >
          Write a function that performs some validity checks on two JSON files, geo.json
          and data.json. The page must count the number of valid objects in the given
          files/input and display it to the user. Validation should be performed on the fields
          and values of the objects contained in the two json files mentioned above.
      </Box>
      <ProcessButton
        task="validate"
        handleClick={props.handleClick}
      />
      <Box>
        Total number of items checked: {Object.keys(props.outputValidation).length}
        &nbsp;and {getNumberOfErrors(props.outputValidation)} have errors.
      </Box>
    </Stack>
  );
}

export default Validation;
