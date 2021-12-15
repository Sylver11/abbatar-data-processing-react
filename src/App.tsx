import React from 'react';
import {
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';
import Container from '@mui/material/Container';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FunctionsIcon from '@mui/icons-material/Functions';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Validation from './routes/Validation';
import Calculation from './routes/Calculation';
import Manipulation from './routes/Manipulation';
import ProcessData from './hooks/processData';


// const RefLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
//   <Link innerRef={ref as any} {...props} />
// ));

// function BottomNavBar(){
//   const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
//   const [value, setValue] = React.useState(pathname);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//       <BottomNavigation value={value} onChange={handleChange} showLabels={true} >
//         <BottomNavigationAction label="home" value="/" icon={<HomeIcon />} component={Link} to='/'/>
//         <BottomNavigationAction label="resources" value="/resources" icon={<ResourcesIcon /> } component={Link} to='/resources'/>                
//         <BottomNavigationAction label="Q&A" value="/qna" icon={<QnAIcon />}  component={Link} to='/qna'/>
//         <BottomNavigationAction label="profile" value="/profile" icon={<ProfileIcon />} component={Link} to='/profile'/>
//       </BottomNavigation>
//     );
// }

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
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

      {/* <BottomNavigation value={value} onChange={this.handleChange}>
            <BottomNavigationAction
                component={Link}
                to="/signal"
                label="signal"
                value="signal"
                icon={<FunctionsIcon />}
                // className={classes.content}
            />
        </BottomNavigation>
        {/* <BottomNavigation
          showLabels
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        >
          <BottomNavigationAction value="validation" to="/validation" label="Validation" icon={<CheckCircleOutlineIcon />} />
          <BottomNavigationAction label="Calculation" icon={<FunctionsIcon />} />
          <BottomNavigationAction label="Manipulate" icon={<ShuffleIcon />} />
        </BottomNavigation> */} 
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
          <Route path="calculation" element={<Calculation />} />
          <Route path="manipulation" element={<Manipulation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
