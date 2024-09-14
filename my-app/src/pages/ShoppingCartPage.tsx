import React from "react";
import { PageFormat } from "../shared/PageFormat";

export const ShoppingCartPage: React.FC = () => {
    const mainContent = <main className="main-content">
            <h1>Welcome to LLMenu</h1>
                <p><strong>Transform Your Ingredients into Delicious Meals</strong></p>
                <p>
                Got leftovers or random items in your fridge? LLMenu is here to help! Simply input the scraps and ingredients you have on hand, and our advanced AI recipe engine will suggest tasty dishes you can make with what you already have.
                </p>
                <p>Why LLMenu?</p> 
                <ul>
                <li>Cut Food Waste: Use up what you've got and save money.</li>
                <li>Sustainable Living: Reduce waste and support a greener planet.</li>
                <li>Creative Recipes: Discover new ways to cook with your ingredients.</li>
                </ul>
                <p>Start cooking smarter and sustainably today with LLMenu!</p>
        </main>
    return (
        <>
        <PageFormat mainContent={mainContent}/>
        </>
    );
};
