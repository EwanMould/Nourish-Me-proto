import NavBar from "./NavBar";
import Pantry from "./pages/Pantry";
import LogIn from "./pages/LogIn";
import MealCurator from "./pages/Meal-Curator";
import HomePage from "./pages/HomePage";
import Tracking from "./pages/Tracking";
import React from 'react';
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
