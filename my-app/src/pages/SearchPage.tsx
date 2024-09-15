import React from "react";
import { PageFormat } from "../shared/PageFormat";
import { SearchIngredients } from "../shared/SearchIngredients";

export const SearchPage: React.FC = () => {
    const mainContent = <>
    <h1>Welcome to LLMenu</h1>
    <button className="search-page-saved-recipes">
        Saved Recipes
    </button>
    <SearchIngredients></SearchIngredients>
    </>
    return (
        <>
        <PageFormat mainContent={mainContent}/>
        </>
    );
};
