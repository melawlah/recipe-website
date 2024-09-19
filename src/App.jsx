import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Nav from "./components/Nav";
import Recipes2 from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";

const App = () => (
  <Router>
      <div className="w-full sm:w-2/4 mx-auto my-32 bg-white border-3 rounded">
        <Nav />
        <main>
          <Routes>
            <Route path ="/" element={<Recipes2 />} />
            <Route path ="/recipedetails/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
    </div>
  </Router>
)

export default App;