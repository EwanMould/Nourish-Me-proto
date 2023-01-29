import React, {useState} from 'react';
import {supabase} from "../lib/supabaseClient";
export default function MealCurator() {
  const [ingredients, setIngredients] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [recipes, setRecipes] = useState({})
  const [formError, setFormError] = useState('');
  const [pantry, setPantry] = useState('');

  const useCurrentList = async () => {
      const {data, error} = await supabase
        .from('Recipes')
        .select()

      if (error) {
        setFetchError('Could not fetch recipes')
        setRecipes('null')
        console.log(error)
      }
      if (data) {
        setRecipes(data)
        setFetchError(null)
      }


      //finds all the recipes that have the ingredients the user has for the time being it only checks for 1 matching item
    const ingredientList = ingredients.split(',').sort()
    const numberOfIngredients = ingredientList.length
    const numberOfRecipes = recipes.length
    let indexOfIngredients;
    let indexOfRecipes;
    let allowedRecipes = new Array(numberOfRecipes)
    console.log(ingredientList)
    for(indexOfIngredients = 0; indexOfIngredients< numberOfIngredients; indexOfIngredients++){
      for(indexOfRecipes = 0 ; indexOfRecipes < numberOfRecipes; indexOfRecipes++){
        const {ingredients: ingredients1} = recipes[indexOfRecipes];
        let recipeIngredients = ingredients1;
        let indexOfRecipeIngredients;
        for (indexOfRecipeIngredients = 0; indexOfRecipeIngredients < recipeIngredients.length; indexOfRecipeIngredients++){
          if (ingredientList[indexOfIngredients] === recipeIngredients[indexOfRecipeIngredients]){
            allowedRecipes.push(indexOfRecipes)
            indexOfRecipeIngredients = recipeIngredients.length
          }
        }
      }
    }

    let indexOfAllowedRecipes;
    for(indexOfAllowedRecipes = 0; indexOfAllowedRecipes < allowedRecipes.length; indexOfAllowedRecipes++){
      let {data} = await supabase
        .from('recipes')
        .select()
        .eq('id', allowedRecipes[indexOfAllowedRecipes])
      console.log(data)
    }
  }

  const fetchPantry = async () => {
    const {data,error} = await supabase
      .from('Pantry')
      .select('id, pantry')
      .eq('user_id', localStorage.getItem('id'))
    if (error){
      alert('ERROR')
    }
    if (data){
      const {pantry: pantry1} = data[0];
      return pantry1
    }
  }

  const usePantry = async () => {
    setIngredients(await fetchPantry())


  }

    return (
      <>
        <form onSubmit={useCurrentList}>
          <label htmlFor='ingredients'>enter ingredients</label>
          <input
            type="text"
            id = 'ingredients'
            value = {ingredients}
            onChange= {(e) => setIngredients(e.target.value)}
          />
          <button>Submit</button>

          {formError && <p className='error'>{formError}</p>}
        </form>

        <div>
        <button onClick={usePantry}>use pantry</button>
        </div>
      </>

    )
}
