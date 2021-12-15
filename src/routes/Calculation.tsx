import Stack from '@mui/material/Stack';
import ProcessButton from "../components/ProcessButton";
import OutputBox from "../components/OutputBox";


interface Props {
  output: string;
  handleClick(task: string): void;  
}

function Calculation(props: Props) {
  return (
    <Stack spacing={2}>
      <ProcessButton
          task="calculate"
          handleClick={props.handleClick}
      />
      <OutputBox
          output={props.output}
      />
    </Stack>
  );
}

export default Calculation;
