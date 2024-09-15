import React, { ChangeEvent, useEffect, useState } from "react";
import popularIngredients from "./popularIngredients";
import { Ingredient } from "../types/Ingredient";

interface SearchIngredientsProps {
    onSelectedIngredientsChange: (ingredients: Ingredient[]) => void; // Callback prop type
}

export const SearchIngredients: React.FC<SearchIngredientsProps> = ({ onSelectedIngredientsChange }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(popularIngredients);
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        // Call the callback function whenever selectedIngredients changes
        onSelectedIngredientsChange(selectedIngredients);
    }, [selectedIngredients, onSelectedIngredientsChange]);


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

    const groupedIngredients = filteredIngredients.reduce((groups, ingredient) => {
        if (!groups[ingredient.foodGroup]) {
            groups[ingredient.foodGroup] = [];
        }
        groups[ingredient.foodGroup].push(ingredient);
        return groups;
    }, {} as Record<string, Ingredient[]>);

    const hasIngredients = Object.keys(groupedIngredients).length > 0;

    return (
        <div className="search-container">
            <input
                className="search-bar"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for ingredients..."
            />
            {selectedIngredients && (
                <div className="chip-container">
                    {selectedIngredients.map(ingredient => (
                        <button 
                            className="hasIngredients"
                            style={{ color: "white", backgroundColor: '#001f54', display: 'flex', overflow: 'auto'}}
                            onClick={() => toggleChipActive(ingredient.id)}
                        >
                            <span>{ingredient.name}</span>
                        </button>
                    )
                )}
                </div>
            )}
            {searchTerm && (
                <div className="chips-container">
                    {hasIngredients ? (
                        Object.keys(groupedIngredients).map(foodGroup => (
                            <div key={foodGroup} className="food-group">
                                <h3>{foodGroup}</h3>
                                {groupedIngredients[foodGroup].map(ingredient => {
                                    const buttonColor = ingredient.hasIngredient ? 'white' : 'black';
                                    const buttonBackgroundColor = ingredient.hasIngredient ? '#001f54' : '#f1f1f1';
                                    
                                    return (
                                        <button 
                                            key={ingredient.id}
                                            className="chip-button"
                                            style={{ color: buttonColor, backgroundColor: buttonBackgroundColor }}
                                            onClick={() => toggleChipActive(ingredient.id)}
                                        >
                                            <span>{ingredient.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <p>No Ingredients Found...</p>
                    )}
                </div>
            )}
        </div>
    );
};