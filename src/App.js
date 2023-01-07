import NavBar from "./NavBar";
import LogIn from "./pages/LogIn";
import MealCurator from "./pages/Meal-Curator";
import HomePage from "./pages/HomePage";
import Tracking from "./pages/Tracking";
import React from 'react';
import Pantry from "./pages/Pantry";
import SignUp from "./pages/SignUp";
function App() {
  let Component
      switch (window.location.pathname){
        case "/Pantry.js":
            Component = Pantry;
          break
        case "/Meal-Curator.js":
            Component = MealCurator;
          break
        case "/LogIn.js":
            Component = LogIn;
          break
        case "/Tracking.js":
            Component = Tracking;
          break
        case "/Homepage.js":
          Component = HomePage
          break
        case "/SignUp.js":
          Component = SignUp
          break
        default:
            Component = HomePage;
      }
    return(
        <>
          <NavBar />
          <div className="container"><Component/></div>
        </>
  );
}

export default App;
