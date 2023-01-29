const RecipeCard = ({recipe}) => {
  return(
    <div className='recipe-card'>
      <h3><a href={recipe.source}>{recipe.name}</a></h3>
      <p>{recipe.description}</p>
      <div className='serves'> serves {recipe.serves}</div>
    </div>
  )
}
export default RecipeCard
