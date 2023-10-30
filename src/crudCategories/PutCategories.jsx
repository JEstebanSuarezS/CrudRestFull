import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function PutCategories() {
    const [datos, setDatos] = useState([]);
    const [name, setName] = useState("");
    const [categories, setCategoriesData] = useState("");
    const { id } = useParams();

    console.log('ID recibido:', id);


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

    },[])


    const getCategories = async () => {
        try {
            const response = await fetch(`https://restful-api-project-7zvg.onrender.com/api/v1/categories/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Aquí puedes agregar otros encabezados si es necesario, como token de autorización, etc.
                },
            });

            if (!response.ok) {
                throw new Error(`Error al obtener el usuario. Código de estado: ${response.status}`);
            }

            const data = await response.json();
            setCategoriesData(data.data);
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    const putCategories = async (id, name) => {
        const requestBody = {};
        if (name) requestBody.name = name;

        let response = await fetch(`https://restful-api-project-7zvg.onrender.com/api/v1/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el usuario. Código de estado: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);

        setDatos((datos) => [data, ...datos]);

        setName("");

        window.location.href = '/categories';
    }

    const controladorDelEnvio = (e) => {
        e.preventDefault();
        putCategories(id, name);
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen dark:bg-gray-900">
                <div class="w-full max-w-xs">
                    <form class="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={controladorDelEnvio}>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Name
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={categories.name}  value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div class="flex items-center justify-center">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Actualizar Datos
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