import React, {useState} from 'react';
import {supabase} from "../lib/supabaseClient";
import RecipeCardMeal from "../components/RecipeCardMeal";
export default function MealCurator() {
  const [ingredients, setIngredients] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [recipes, setRecipes] = useState({})
  const [minimumMatches, setMinimumMatches] = useState(0);
  const [allowedRecipes, setAllowedRecipes] = useState([]);
  const [bannedItems, setBannedItems] = useState('');
  let allowedRecipeArray = new Array(0);

  const useCurrentList = async (e) => {
    e.preventDefault()
    setAllowedRecipes(null);
    const {data, error} = await supabase
      .from('recipes')
      .select()

    if (error) {
      setFetchError('Could not fetch recipes')
      setRecipes('null')
      console.log(error)
      return
    }
    if (data) {
      setRecipes(data)
      console.log(data)
    }

    //finds all the recipes that have the ingredients the user has for the time being it only checks for 1 matching item
    const ingredientList = ingredients.split(', ')
    const numberOfIngredients = ingredientList.length
    const numberOfRecipes = recipes.length
    let indexOfIngredients;
    let indexOfRecipes;
    const bannedItemsArray = bannedItems.split(", ")
    console.log(bannedItemsArray)
    console.log(ingredientList)
    for (indexOfIngredients = 0; indexOfIngredients < numberOfIngredients; indexOfIngredients++) {
      let matches = 0
      for (indexOfRecipes = 0; indexOfRecipes < numberOfRecipes; indexOfRecipes++) {
        let {ingredients: ingredients1} = recipes[indexOfRecipes];
        let recipeIngredients = ingredients1;
        let indexOfRecipeIngredients;
        let recipePass = false
        let subRecipePass = true

        //removes recipe if it contains any contraband
        let indexOfBannedItemsArray
        for(indexOfBannedItemsArray = 0; indexOfBannedItemsArray <= recipeIngredients.length; indexOfBannedItemsArray++){
          if(recipeIngredients.includes(bannedItemsArray[indexOfBannedItemsArray])){
            console.log('naughty recipe')
            subRecipePass = false
          }
          else if(indexOfBannedItemsArray === recipeIngredients.length && subRecipePass){
            recipePass = true
          }
        }

        if(recipePass) {
          for (indexOfRecipeIngredients = 0; indexOfRecipeIngredients < recipeIngredients.length; indexOfRecipeIngredients++) {
            if (ingredientList[indexOfIngredients] === recipeIngredients[indexOfRecipeIngredients]) {
              matches++
              if (!allowedRecipeArray.includes(recipes[indexOfRecipes]) && (matches >= minimumMatches)) {
                allowedRecipeArray.push(recipes[indexOfRecipes])
                setAllowedRecipes(allowedRecipeArray);
              }
            }
          }
        }
      }
    }
  }
    const usePantry = async () => {
      setIngredients(await fetchPantry())
    }
  const fetchPantry = async () => {
    const {data, error} = await supabase
      .from('Pantry')
      .select('id, pantry')
      .eq('user_id', localStorage.getItem('id'))
    if (error) {
      alert('ERROR')
    }
    if (data) {
      const {pantry: pantry1} = data[0];
      return pantry1
    }
  }

    return (
      <>
        <form onSubmit={useCurrentList}>
          <label htmlFor='ingredients'>enter ingredients</label>
          <input
            type="text"
            id='ingredients'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          Matches<input
          type="number"
          id="minimumMatches"
          value={minimumMatches}
          onChange={(e) => setMinimumMatches(parseInt(e.target.value))}
        />
          Banned Items<input
          type='text'
          id='bannedItems'
          value={bannedItems}
          onChange={(e) => setBannedItems((e.target.value))}
        />

          <button>Submit</button>

          {fetchError && <p className= 'error'>{fetchError}</p>}
        </form>

        <div>
          <button onClick={usePantry}>use pantry</button>
        </div>


        {allowedRecipes && (
          <div className='recipe'>
            <div className='recipe-grid'>
              {allowedRecipes.map(allowedRecipe => (
                <RecipeCardMeal key={allowedRecipe.id} recipe={allowedRecipe}/>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }
