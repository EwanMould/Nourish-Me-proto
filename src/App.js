import NavBar from "./NavBar";
import Pantry from "./pages/Pantry";
import LogIn from "./pages/LogIn";
import MealCurator from "./pages/Meal-Curator";
import HomePage from "./pages/HomePage";
import Tracking from "./pages/Tracking";


function App() {
    let Component
      switch (window.location.pathname){
        case "/":
            Component = App;
          break
        case "/pantry":
            Component = Pantry;
          break
        case "/meal-curator":
            Component = MealCurator;
          break
        case "/login":
            Component = LogIn;
          break
        case "/tracking":
            Component = Tracking;
          break
        case "/homepage":
          Component = HomePage
          break
        default:
            Component = App;
      }
    return(
        <>
          <NavBar />
            <Component />
        </>
  );
}

export default App;
