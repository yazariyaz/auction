import React, { useState } from 'react';
import Header from "@/Components/Header";

export default function Authenticated({ auth, children }) {

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="">{children}</main>
        </div>
    );
}
