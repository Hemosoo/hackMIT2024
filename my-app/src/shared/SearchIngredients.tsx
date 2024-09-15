import React, { ChangeEvent, useState } from "react";
import popularIngredients from "./popularIngredients";

export const SearchIngredients:React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState(popularIngredients);
  
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      setSearchTerm(term);
  
      const results = popularIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredRecipes(results);
    };
  
    return (
      <div>
        <input
          className="search-bar"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for recipes..."
        />
        { searchTerm ?
        <ul>
          {filteredRecipes.map(ingredient => (
            <button key={ingredient.id}>{ingredient.name}</button>
          ))}
        </ul>
        : <></>
        }
      </div>
    );
  };