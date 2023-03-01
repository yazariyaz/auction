import React from "react";

export default function PageHeading({title, desc}){

    return (
        <header className="pt-6">
            <h1 className="text-center text-3xl text-gray-800 font-semibold mb-3 text-center">
                {title}
            </h1>

            {
                desc && (
                    <div className="tracking-wide text-gray-500 text-center">{desc}</div>
                )
            }
        </header>
    )
}
