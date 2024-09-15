import React, { ChangeEvent, useState } from "react";
import popularIngredients from "./popularIngredients";
import { Ingredient } from "../types/Ingredient";

export const SearchIngredients: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(popularIngredients);
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        const results = popularIngredients.filter(ingredient =>
            ingredient.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredIngredients(results);
    };


    const toggleChipActive = (id: number) => {
        setFilteredIngredients(prevFilteredIngredients => {
            const updatedIngredients = prevFilteredIngredients.map(ingredient => (
                ingredient.id === id
                    ? { ...ingredient, hasIngredient: !ingredient.hasIngredient }
                    : ingredient
            ));

            // Update the selectedIngredients state based on hasIngredient
            setSelectedIngredients(updatedIngredients.filter(ingredient => ingredient.hasIngredient));

            return updatedIngredients;
        });
    };

    return (
        <div className="search-container">
            <input
                className="search-bar"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for ingredients..."
            />
            {searchTerm && (
                <div className="chips-container">
                    {filteredIngredients.map(ingredient => {
                        // Determine button colors based on the 'hasIngredient' state
                        const buttonColor = ingredient.hasIngredient ? 'white' : 'black';
                        const buttonBackgroundColor = ingredient.hasIngredient ? '#001f54' : '#f1f1f1';
                        
                        return (
                            <div className="chip" key={ingredient.id}>
                                <button 
                                    className="chip-button"
                                    style={{ color: buttonColor, backgroundColor: buttonBackgroundColor }}
                                    onClick={() => toggleChipActive(ingredient.id)}
                                >
                                    <span>{ingredient.name}</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
