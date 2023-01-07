import React, {useState} from 'react';
import {supabase} from "../lib/supabaseClient";
export default function Pantry() {
    const [ingredients, setIngredients] = useState('');
    const [formError, setFormError] = useState(null);
    const [user, setUser] = useState({});



  const handleSubmit = async (e) => {
      e.preventDefault()

    const userInfo = await supabase.auth.getUser();

      if(!ingredients){
        setFormError('please fill in the box')
      }

      const { data, error } = await supabase
        .from('Pantry')

      if (data) {
        console.log(data)
        setFormError(null)
      }

      if(error){
        console.log(error)
        setFormError('please fill in the box')
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
