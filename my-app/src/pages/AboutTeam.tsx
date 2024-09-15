import React from "react";
import { PageFormat } from "../shared/PageFormat";
import ProfileGrid from "../shared/ProfileGrid";
import team from '../assets/team.png';

export const AboutTeamPage: React.FC = () => {
    const mainContent = <>
        <div>
            <h1>Meet the LLMenu Team</h1>
            <p> At LLMenu, we're passionate about making your cooking experience 
            both delightful and sustainable. Here's a peek behind the scenes 
            at the team dedicated to helping you reduce food waste and create 
            delicious meals:</p>
            <img src={team} alt="Team" />
        </div>
        <ProfileGrid></ProfileGrid>
    </>
    return (
        <>
            <PageFormat mainContent={mainContent}/>
        </>
    );
};
