import React, {useEffect, useState} from 'react';
import {supabase} from "../lib/supabaseClient";
import RecipeCard from "../components/RecipeCard";
export default function MealCurator() {
  const [ingredients, setIngredients] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [recipes, setRecipes] = useState({})
  const [formError, setFormError] = useState('');
  const [minimumMatches, setMinimumMatches] = useState(0);
  const [allowedRecipes, setAllowedRecipes] = useState(null);
  const [bannedItems, setBannedItems] = useState('');
  let allowedRecipesId = new Array(0);
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
    let indexOfAllowedRecipes = 0;
    const bannedItemsArray = bannedItems.split(", ")
    console.log(bannedItemsArray)
    console.log(ingredientList)
    for (indexOfIngredients = 0; indexOfIngredients < numberOfIngredients; indexOfIngredients++) {
      for (indexOfRecipes = 0; indexOfRecipes < numberOfRecipes; indexOfRecipes++) {
        let {ingredients: ingredients1} = recipes[indexOfRecipes];
        let recipeIngredients = ingredients1;
        let indexOfRecipeIngredients;
        let recipePass = false

        //need to work on the logic of this >:(
        let indexOfBannedItemsArray
        for(indexOfBannedItemsArray = 0; indexOfBannedItemsArray <= recipeIngredients.length; indexOfBannedItemsArray++){
          if(!recipeIngredients.includes(bannedItemsArray[indexOfBannedItemsArray]) && indexOfBannedItemsArray === recipeIngredients.length){
            recipePass = true
          }
        }

        if(recipePass) {
          for (indexOfRecipeIngredients = 0; indexOfRecipeIngredients < recipeIngredients.length; indexOfRecipeIngredients++) {
            if (ingredientList[indexOfIngredients] === recipeIngredients[indexOfRecipeIngredients]) {
              if (!allowedRecipeArray.includes(recipes[indexOfRecipes])) {
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

          {formError && <p className='error'>{formError}</p>}
        </form>

        <div>
          <button onClick={usePantry}>use pantry</button>
        </div>


        {allowedRecipes && (
          <div className='recipe'>
            <div className='recipe-grid'>
              {allowedRecipes.map(allowedRecipe => (
                <RecipeCard key={allowedRecipe.id} recipe={allowedRecipe}/>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }
