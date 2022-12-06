import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import NavBar from "../NavBar";
import App from "../App";
import MealCurator from "../pages/Meal-Curator";
import LogIn from "../pages/LogIn";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/NavBar">
                <NavBar/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/MealCurator">
                <MealCurator/>
            </ComponentPreview>
            <ComponentPreview path="/LogIn">
                <LogIn/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
