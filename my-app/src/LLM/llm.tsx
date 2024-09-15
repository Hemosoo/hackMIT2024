import React, { useState } from 'react';
import axios from 'axios';
import './../App.css';
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/clerk-react";
import { Ingredient } from '../types/Ingredient';



export const LLM: React.FC = () => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const SINGLE_INPUT = (ingredients: String) => {

    return(
      `Come up with as many popular recipe using a combination of some of these ingredients: <ingredients> ${ingredients} </ingredients>. You do not need to use every ingredient given, especially if the combination is not well-known. Return in this format: 

      "---
      Recipe Title: 
      
      Time to Cook:
      
      Ingredients: 
      
      How to Make: 
      
      Number of Servings:
      
      Ingredients used from <ingredients>:
      
      Ingredients not used from <ingredients>:
      
      Ingredients needed not in <ingredients>:"
      `
    )
  };

  const ingredients: Ingredient[] = [
    {id: 1, name: "chicken", foodGroup: "meat"},
    {id: 2, name: "beef", foodGroup: "meat"},
    {id: 3, name: "pork", foodGroup: "meat"},
    {id: 4, name: "lamb", foodGroup: "meat"},
  ]

  const ingredientNames = ingredients.map(ingredient => ingredient.name).join(", ");

  interface Recipe {
    "Recipe Title": string;
    "Time to Cook": string;
    "Ingredients": string[];
    "How to Make": string[];
    "Number of Servings": string;
    "Ingredients used from <ingredients>": string;
    "Ingredients not used from <ingredients>": string;
    "Ingredients needed not in <ingredients>": string;
  }
  
  function parseRecipeText(text: string): Recipe[] {
    const recipes: Recipe[] = [];
    const recipeTexts: string[] = text.split('---').slice(1); // Split by '---' and remove the first empty element
  
    for (const recipeText of recipeTexts) {
      const recipe: Partial<Recipe> = {};
      const lines: string[] = recipeText.trim().split('\n');
  
      let currentKey: keyof Recipe | null = null;
  
      for (let i = 0; i < lines.length; i++) {
        const line: string = lines[i].trim();
        
        if (line.includes(':')) {
          const [key, value] = line.split(':').map(part => part.trim());
          currentKey = key as keyof Recipe;
          
          switch (currentKey) {
            case "Recipe Title":
            case "Time to Cook":
            case "Number of Servings":
            case "Ingredients used from <ingredients>":
            case "Ingredients not used from <ingredients>":
            case "Ingredients needed not in <ingredients>":
              recipe[currentKey] = value;
              break;
            case "Ingredients":
            case "How to Make":
              recipe[currentKey] = [];
              if (value) {
                recipe[currentKey]!.push(value);
              }
              break;
          }
        } else if (currentKey) {
          if (currentKey === "Ingredients" && line.startsWith('-')) {
            recipe[currentKey]!.push(line.substring(1).trim());
          } else if (currentKey === "How to Make" && /^\d+\./.test(line)) {
            recipe[currentKey]!.push(line.replace(/^\d+\.\s*/, '').trim());
          }
        }
      }
  
      recipes.push(recipe as Recipe);
    }
  
    return recipes;
  }


  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o",
          messages: [
            { role: "system", content: "" },
            { role: "user", content: SINGLE_INPUT(ingredientNames) }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setResponse(result.data.choices[0].message.content);
      setResponse(response.replace("*", ""));
    } catch (error) {
      console.error('Error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setResponse(`Error ${error.response.status}: ${error.response.data.error.message}`);
        } else if (error.request) {
          setResponse('No response received from the server. Please check your internet connection.');
        } else {
          setResponse('An error occurred while setting up the request.');
        }
      } else {
        setResponse('An unexpected error occurred.');
      }
    }

    setIsLoading(false);
  };
  
  console.log(parseRecipeText(response));
  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton />
        </SignedIn>
      </header>
      <main>
        <h1>ChatGPT Static Prompt App</h1>
        <SignedIn>
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Essay'}
          </button>
          {response && (
            <div className="response">
              <h2>Response:</h2>
              <p>{response}</p>
            </div>
          )}
        </SignedIn>
        <SignedOut>
          <p>Please sign in to use the ChatGPT app.</p>
        </SignedOut>
      </main>
    </div>
  );
}