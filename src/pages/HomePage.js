import React, {useEffect, useState} from 'react';
import {supabase} from "../lib/supabaseClient";
import RecipeCard from "../components/RecipeCard";

export default function HomePage() {
  const [fetchError, setFetchError] = useState(null);
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    const fetchRecipe = async() => {
      const {data,error} = await supabase
        .from('recipes')
        .select()

      if (error){
        setFetchError('')
        setRecipes(null)
        console.log(error)
      }
      if(data){
        console.log(data);
        setRecipes(data)
        setFetchError(null)
      }
    }
    fetchRecipe().then()
  },
  [])


    return(
        <>
          <h1>Hello, {localStorage.getItem('name')}</h1>
          {fetchError && (<p>{fetchError}</p>)}
          <div>
            <h2>Here are the recipes we have :)</h2>
          {recipes&& (
            <div className='recipe'>
              <div className='recipe-grid'>
                {recipes.map(recipe => (
                  <RecipeCard key = {recipe.id} recipe={recipe}/>
                ))}
              </div>
            </div>
          )}
          </div>


        </>
    )
}
