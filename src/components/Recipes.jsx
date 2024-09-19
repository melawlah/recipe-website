import { useState, useEffect } from 'react';
import cuisinesData from '../data/cuisines.json';
import { Link } from 'react-router-dom';

const Recipes2 = () => {
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setCuisine] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [page, setPage] = useState(1);
  const resultsPerPage = 5; 

  const apiKey = import.meta.env.VITE_RECIPE_APP_API_KEY;

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&number=${resultsPerPage}&offset=${(page - 1) * resultsPerPage}&cuisine=${cuisine}`);
      const data = await res.json();
      setRecipes(data.results);

    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();  
  }, [cuisine, searchQuery, page]);

  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRecipes(); 
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='container mx-auto p-4'>
      <form onSubmit={handleSearchSubmit} className='flex flex-col md:flex-row justify-center gap-4 mb-4'>
        <input 
          type="text"
          placeholder="Search for a recipe"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border focus:outline-none rounded-lg p-2 w-full md:w-1/3"
        />
        <button type="submit" className='bg-[#b63d6c] rounded w-full md:w-1/6 text-white'>
          Search
        </button>
        <select onChange={handleCuisineChange} value={cuisine} className="border rounded-lg p-2 w-full md:w-1/4 mt-4 md:mt-0">
          <option value="">Filter Cuisine</option>
          {cuisinesData.cuisines.map((cuisineOption) => (
            <option key={cuisineOption} value={cuisineOption}>
              {cuisineOption}
            </option>
          ))}
        </select> 
      </form>
      
      {loading ? <p className='text-center'>Loading...</p> : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-4 gap-6 mt-10'>
          {recipes.map(recipe => (
            <div key={recipe.id} className="border rounded-lg p-4 text-center"> 
                <Link to= {'/recipedetails/'+recipe.id} className="">
                    <img src={recipe.image} alt='Food Picture' className='w-full h-48 object-cover mb-2 rounded-md'/>
                    <p className='font-semibold'>{recipe.title} </p>
                </Link>
            </div>
          ))}
        </div>
      )}
      <div className='flex justify-between mt-6'>
        <button onClick={handlePreviousPage} className='bg-gray-500 text-white rounded-lg p-2 disabled:bg-gray-300' disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} className='bg-[#b63d6c] text-white rounded-lg p-2'>Next</button>
      </div>
    </div>
  );
}

export default Recipes2;
