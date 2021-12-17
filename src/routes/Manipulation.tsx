import Stack from '@mui/material/Stack';
import ProcessButton from "../components/ProcessButton";
import OutputBox from "../components/OutputBox";
import Box from '@mui/material/Box';


interface Props {
  output: string;
  handleClick(task: string): void;  
}

function Manipulation(props: Props) {
  return (
    <Stack spacing={2}>
      <Box 
        component="div" 
        sx={{ display: 'inline' }}
        >
          Write a function that takes two arrays of objects as parameters, and returns a
          single array containing the union of the two arrays. The input object can be
          found in p3Data.json. The union is defined as follows:
          a. All objects must have unique names in the final array
          b. All other fields must be merged, ex: the union of 
          c. If two objects have the same field the values are summed
          d. Objects with name as the only field must be ignored, i.e 
          The array must be displayed in a table with each row containing the name of the
          object and a button to open a drop-down showing a list containing the individual
          fields and their values.
      </Box>
      <ProcessButton
          task="manipulate"
          handleClick={props.handleClick}
      />
      <OutputBox
          output={props.output}
      />
    </Stack>
  );
}

export default Manipulation;
