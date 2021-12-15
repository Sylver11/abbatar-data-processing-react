import Button from '@mui/material/Button';


interface Props {
    task: string;
    handleClick(task: string): void;
}

const ProcessButton = (props: Props) => {
    return (
      <Button variant="contained" onClick={() => props.handleClick(props.task)}>
        {props.task}
      </Button>
    );
};

export default ProcessButton;  
