import { useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
        const key = `recipe-${id}`;
        const recipe = localStorage.getItem(key);

        if(recipe) {
            setRecipe(JSON.parse(recipe));
            setLoading(false);
            return;
        }
        try {
            const apiKey = import.meta.env.VITE_RECIPE_APP_API_KEY;
            const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`);

            if(!res.ok) {
                throw new Error('Failed to fetch recipe data.');
            }
            
            const data = await res.json();
            setRecipe(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        } 
    };
    getRecipe();
  }, [id]);

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error}</p>

  return (
    <section className='mx-10 mb-10'>
        {recipe && (
            <>
                <div className=''>
                    <img src={recipe.image} alt={recipe.title} className="w-3/4 h-auto rounded-lg border mx-auto" />
                    <h1 className="text-2xl font-youngSerif my-4">{recipe.title}</h1>
                    <p> <div dangerouslySetInnerHTML={{ __html: recipe.summary }} /></p>
                </div>
                <div className="mt-8 bg-[#f8d9e3] p-8 rounded">
                    <h2 className="text-md font-youngSerif text-[#b63d6c]">Preparation Time</h2>
                    <ul className="list-disc ml-5">
                        <li> <span className='font-semibold'>Total:</span> Approximately {recipe.readyInMinutes} minutes</li>
                        {(recipe.preparationMinutes) ? <li><span className='font-semibold'>Preparation:</span>{recipe.preparationMinutes} minutes</li> : ""}
                        {(recipe.cookingMinutes) ? <li><span className='font-semibold'>Cooking:</span>{recipe.cookingMinutes} minutes</li> : ""}
                    </ul>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-youngSerif text-[#854532]">Ingredients</h2>
                    <ul className="list-disc ml-5">
                    {recipe.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.original}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-youngSerif">Cooking Instructions</h2>
                    <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                </div>
                <div className='my-8'>
                    <h2 className='text-xl font-youngSerif'>Health Information</h2>
                    <ul className="space-y-2 mb-4">
                        <li className={`flex items-center p-2 rounded-md ${recipe.glutenFree ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {recipe.glutenFree ? '\u2714' : '\u274C' }
                        &nbsp; &nbsp; Gluten Free
                        </li>
                        <li className={`flex items-center p-2 rounded-md ${recipe.ketogenic ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {recipe.ketogenic ? '\u2714' : '\u274C'}
                        &nbsp; &nbsp; Keto
                        </li>
                        <li className={`flex items-center p-2 rounded-md ${recipe.lowFodMap ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {recipe.lowFodMap ? '\u2714' : '\u274C'}
                        &nbsp; &nbsp; Low Fod Map
                        </li>
                        <li className={`flex items-center p-2 rounded-md ${recipe.vegan ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {recipe.vegan ? '\u2714' : '\u274C'}
                        &nbsp; &nbsp; Vegan
                        </li>
                        <li className={`flex items-center p-2 rounded-md ${recipe.diaryFree ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {recipe.diaryFree ?  '\u2714' : '\u274C'}
                        &nbsp; &nbsp; Dairy Free
                        </li>
                    </ul>
                </div>
            </>
        )}
    </section>
  )
}

export default RecipeDetails