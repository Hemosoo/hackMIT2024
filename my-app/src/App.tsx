import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./home/home";
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/clerk-react";

function App() {
  const tasks = useQuery(api.tasks.get);

  return (
    <header>
    <SignedOut>
        <SignInButton />
    </SignedOut>
    <SignedIn>
            <UserButton />
            <SignOutButton />
      </SignedIn>
    </header>
  )
}

export default App
