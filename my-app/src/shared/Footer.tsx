import React from "react";

export const Footer: React.FC = () => {
    return (
        <>
           {/* Footer */}
           <footer className="footer">
                <div className="footer-logo">LLMenu</div>
                <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
                </nav>
                <p>© LLMenu 2024 All Rights Reserved</p>
            </footer>
        </>
    );
};
