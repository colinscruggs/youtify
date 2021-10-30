import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <>
      {
        code ? 
        <Dashboard code={code} /> : <Login />
      }
    </>
    // TODO: figure out routing situation
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       <Login />
    //     </Route>
    //     <Route path="/home">
    //       {
    //         code ?
    //         <Dashboard code={code} />
    //         : <p>Please login</p>
    //       }
    //     </Route>
    //   </Switch>
    // </Router>
  );
}

export default App;
