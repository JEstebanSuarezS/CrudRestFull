import React, { useState, useEffect } from "react";

export default function Categories() {
    const [datos, setDatos] = useState([]);
    const [name, setName] = useState("");


    useEffect(() => {
        const url = 'https://restful-api-project-7zvg.onrender.com/api/v1/categories'

        fetch(url)
            .then((response => response.json()))
            .then((response) => {
                setDatos(response.data)
                // console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })

    })
    const addCategories = async (name) => {
        let response = await fetch("https://restful-api-project-7zvg.onrender.com/api/v1/categories", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                // userId: Math.random().toString(36).slice(2)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let data = await response.json();
        console.log(data)
        setDatos((datos) => [data, ...datos]);
        setName("");


        window.location.href = '/categories';
    };


    const controladorDelEnvio = (e) => {
        e.preventDefault();
        addCategories(name);
    };





    return (
        <>
            <div className="flex justify-center items-center h-screen dark:bg-gray-900">
                <div class="w-full max-w-xs">
                    <form class="bg-indigo-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={controladorDelEnvio}>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Name
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div class="flex items-center justify-center">
                            <button class="dark:bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Create
                            </button>
                        </div>
                    </form>
                    <p class="text-center text-gray-500 text-xs">
                        &copy;2023 RestFull.
                    </p>
                </div>
            </div>
        </>
    )
}