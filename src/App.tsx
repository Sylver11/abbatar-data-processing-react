import React from 'react';
import {
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';
import Container from '@mui/material/Container';
import Validation from './routes/Validation';
import Calculation from './routes/Calculation';
import Manipulation from './routes/Manipulation';
import ProcessData from './hooks/processData';


function Layout() {
  return (
    <>
      <Container maxWidth="sm">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/validation">Validation</Link>
            </li>
            <li>
              <Link to="/calculation">Calculation</Link>
            </li>
            <li>
              <Link to="/manipulation">Manipulation</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </Container>
    </>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to Abbatar</h2>
        <p>Talk about project experieince here.</p>
        <p>
          This app is build following the instructions supplied by Ingo available for download 
          <b><a href='/React-Programming-Challenge.pdf' download>here</a></b>.
        </p>
      </main>
    </>
  );
}

function App() {
  const processData = ProcessData();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="validation" element={<Validation output={processData.output} handleClick={processData.handleClick}  />} />
          <Route path="calculation" element={<Calculation output={processData.output} handleClick={processData.handleClick} />} />
          <Route path="manipulation" element={<Manipulation output={processData.output} handleClick={processData.handleClick} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
