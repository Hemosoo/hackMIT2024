npm install convex
npm install @clerk/clerk-react
npm install react-router-dom
npm install openai


add this key to .env.local:
to run the app: npm run dev


LLM Prompt: 
Come up with as many popular recipe using a combination of some of these ingredients: <ingredients>garlic, butter, chives, onions, pasta, lobster, chicken, shrimp </ingredients>. You do not need to use every ingredient given, especially if the combination is not well-known. Return in the format. 

"Recipe Title: 

Time to Cook:

Ingredients: 

How to Make: 

Number of Servings:

Ingredients used from <ingredients>:

Ingredients not used from <ingredients>:

Ingredients needed not in <ingredients>:
"