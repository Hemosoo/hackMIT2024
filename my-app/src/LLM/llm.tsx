import React, { useState } from 'react';
import axios from 'axios';
import './../App.css';
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/clerk-react";



export const LLM: React.FC = () => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const SINGLE_INPUT = `Come up with as many popular recipe using a combination of some of these ingredients: <ingredients>garlic, butter, chives, onions, pasta, lobster, chicken, shrimp </ingredients>. You do not need to use every ingredient given, especially if the combination is not well-known. Return in the format. 

  "Recipe Title: 
  
  Time to Cook:
  
  Ingredients: 
  
  How to Make: 
  
  Number of Servings:
  
  Ingredients used from <ingredients>:
  
  Ingredients not used from <ingredients>:
  
  Ingredients needed not in <ingredients>:
  `;
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o",
          messages: [
            { role: "system", content: "" },
            { role: "user", content: SINGLE_INPUT }
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