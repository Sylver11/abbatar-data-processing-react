import Stack from '@mui/material/Stack';
import ProcessButton from "../components/ProcessButton";
import OutputBox from "../components/OutputBox";


interface Props {
  output: string;
  handleClick(task: string): void;  
}

function Manipulation(props: Props) {
  return (
    <Stack spacing={2}>
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
