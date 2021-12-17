import Stack from '@mui/material/Stack';
import ProcessButton from "../components/ProcessButton";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface Props {
  outputCalculation: { active: number; asn: number; countrycode: string; id: number; statecode: string|null; meta: string; ipv4: string;}[];
  handleClick(task: string): void;  
}

function Calculation(props: Props) {
  return (
    <Stack spacing={2}>
      <Box 
        component="div" 
        sx={{ display: 'inline' }}
        >Write a function that takes in latitude and longitude as parameters, and returns
        a sorted list of the 10 rows from data.json with the shortest distance from the
        latitude and longitude, in a nicely formatted table
      </Box>
      <ProcessButton
          task="calculate"
          handleClick={props.handleClick}
      />
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Country Code</TableCell>
              <TableCell align="right">State Code</TableCell>
              <TableCell align="right">Meta</TableCell>
              <TableCell align="right">ASN</TableCell>
              <TableCell align="right">IP</TableCell>
          </TableRow>   
        </TableHead>
        <TableBody>
          {props.outputCalculation.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.active}</TableCell>
              <TableCell align="right">{row.countrycode}</TableCell>
              <TableCell align="right">{row.statecode}</TableCell>
              <TableCell align="right">{row.meta}</TableCell>
              <TableCell align="right">{row.asn}</TableCell>
              <TableCell align="right">{row.ipv4}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Stack>
  );
}

export default Calculation;
