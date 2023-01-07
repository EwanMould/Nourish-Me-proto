import React from 'react';
import {supabase} from "../lib/supabaseClient";
import {useState} from "react";

export default function MealCurator() {
  const [ingredients, setIngredients] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [recipe, setRecipe] = useState(null)
  const [formError, setFormError] = useState('');

    const fetchRecipe = async () => {
      const {data, error} = await supabase
        .from('Recipes')
        .select()
      if (error) {
        setFetchError('Could not fetch recipes')
        setRecipe('null')
        console.log(error)
      }
      if (data) {
        setRecipe(data)
        setFetchError(null)
      };

    };

    return (
      <>
        <form onSubmit={fetchRecipe}>
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
        <button>use pantry</button>
        </div>
      </>

    )
}
