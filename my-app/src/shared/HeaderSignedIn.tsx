import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import logo from '../assets/LLMenu_logo.png'

export const HeaderSignedIn: React.FC = () => {
    return (
        <>
            <header className="navbar">
                <div className="nav-left">
                <SignedIn>
                    <a href="/shopping-cart">
                        <button>Shopping Cart</button>
                    </a>
                    <a href="/saved-recipes">
                        <button>Saved Recipes</button>
                    </a>
                </SignedIn>
                </div>
                <div className="logo">
                    <img src={logo} alt="LLMenu Logo" />
                </div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
        </>
    );
};