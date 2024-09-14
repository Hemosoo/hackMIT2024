import React from "react";
import { PageFormat } from "../shared/PageFormat";

export const SearchPage: React.FC = () => {
    const mainContent = <main className="main-content"></main>
    return (
        <>
        <PageFormat mainContent={mainContent}/>
        </>
    );
};
