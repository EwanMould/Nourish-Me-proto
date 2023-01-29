import React, {useState} from 'react';
import {supabase} from "../lib/supabaseClient";
export default function Pantry() {
    const [ingredients, setIngredients] = useState('');
    const [formError, setFormError] = useState(null);
  const handleSubmit = async (e) => {
    const id = localStorage.getItem('id')
    e.preventDefault()

    if (!ingredients) {
      setFormError('please fill in the box')
    }

    const {data, error} = await supabase
      .from('Pantry')
      .update({pantry: ingredients})
      .eq('user_id', id)
      .select()

    if (error) {
      setFormError('please fill in the box')
      console.log(error)
    }
    if (data) {
      setFormError('updated')
      console.log(data)

    }
  }
    return (
      <>
        <h1>Pantry</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='ingredient'>enter ingredients</label>
            <input
              type="text"
              id = 'ingredient'
              value = {ingredients}
              onChange= {(e) => setIngredients(e.target.value)}
                />
            <button>Submit</button>

            {formError && <p className='error'>{formError}</p>}
          </form>

        </div>
      </>
    );
}
