import React from 'react';
import {supabase} from "../lib/supabaseClient";
import {useState} from "react";

export default function MealCurator() {
  /*
  const [fetchError, setFetchError] = useState(null)
  const [recipe, setRecipe] = useState(null)

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

     */
    return (
      <>
        <form>
          <label>Enter ingredients</label>
          <input type={"text"}></input>
          <button>search</button>
        </form>
      </>

    )
}
