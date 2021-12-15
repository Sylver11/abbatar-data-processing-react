import Card from '@mui/material/Card';

interface Props {
    output?: string;
}

const OutputBox = (props: Props) => {
    return (
      <Card variant="outlined">
        {props.output}
      </Card>
    );
};

export default OutputBox;
  