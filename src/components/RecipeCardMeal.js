import {useState} from "react";
const RecipeCardMeal = ({recipe}) => {
  const[expandRecipeCard, setExpandRecipeCard] = useState(false)
  const[recipeInstructions, setRecipeInstructions] = useState(0)
  const[error, setError] = useState('')
  const[information, setInformation] = useState('more information')
  function expandRecipe(){
    setExpandRecipeCard(true)
    setInformation('hide recipe')
    if(expandRecipeCard === true){
      setExpandRecipeCard(false)
      setInformation('more information')
    }
  }

  function previousInstruction(){
    if(recipeInstructions === 0){
      setError('cant go back')
    }
    else{
      setRecipeInstructions(prevState => prevState-1)
      setError('')
    }
  }

  function nextInstruction(){
    if(recipeInstructions === recipe.recipe.length){
      setError('no more steps')
    }
    else{
      setRecipeInstructions(prevState => prevState + 1)
      setError('')
    }
  }

  return(
    <div className='recipe-card-meal'>
      <h3><a href={recipe.source}>{recipe.name}</a> </h3>
      <p>{recipe.description}</p>
      <div className='serves'> Serves {recipe.serves}</div>
      <div className='calories'>Calories per serving: {recipe.nutrition[0]}</div>
      <button onClick={expandRecipe}>{information}</button>
      {expandRecipeCard && (
        <div className= 'recipe-instructions'>
          Ingredients:
          {recipe.ingredients.map(ingredient => (
            <div>{recipe.ingredients[ingredient]}</div>
          ))}
          <p>Recipe, Step {recipeInstructions + 1}:
            <div>{recipe.recipe[recipeInstructions]}
            {error && (
              <div className='bubble'>{error}</div>
            )}
              </div>
          </p>
          <button onClick={previousInstruction}> back </button><button onClick={nextInstruction}> next </button>
          <p className='nutrition'>fat: {recipe.nutrition[1]}g saturates: {recipe.nutrition[2]}g carbs: {recipe.nutrition[3]}g sugars: {recipe.nutrition[4]}g fibre: {recipe.nutrition[5]}g protein: {recipe.nutrition[6]}g salt: {recipe.nutrition[7]}g</p>
        </div>
      )}
    </div>
  )
}
export default RecipeCardMeal
