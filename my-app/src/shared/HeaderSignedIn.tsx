import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import logo from '../assets/LLMenu_logo.png'

export const HeaderSignedIn: React.FC = () => {
    return (
        <>
            {/* Navigation Bar */}
            <header className="navbar">
                <div className="nav-left"></div> {/* Empty div to keep the sign-in button on the right */}
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