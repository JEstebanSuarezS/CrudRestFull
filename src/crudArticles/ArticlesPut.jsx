import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function PutArticles() {
    const [datos, setDatos] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [UserId, setUserId] = useState("");
    const [article, setArticleData] = useState([]);
    const { id } = useParams();

    console.log('ID recibido articles:', id);


    useEffect(() => {
        const url = 'https://restful-api-project-7zvg.onrender.com/api/v1/articles'

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


    const getArticle = async () => {
        try {
            const response = await fetch(`https://restful-api-project-7zvg.onrender.com/api/v1/articles/${id}`, {
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
            setArticleData(data.data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getArticle();
    }, []);

    const putArticles = async (id, title, content, UserId) => {
        const requestBody = {};
        if (title) requestBody.name = title;
        if (content) requestBody.content = content;
        if (UserId) requestBody.UserId = UserId;

        let response = await fetch(`https://restful-api-project-7zvg.onrender.com/api/v1/articles/${id}`, {
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

        setTitle("");
        setContent("");
        setUserId("");

        window.location.href = '/articles';
    }

    const controladorDelEnvio = (e) => {
        e.preventDefault();
        putArticles(id, title, content, UserId);
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen dark:bg-gray-900">
                <div class="w-full max-w-xs">
                    <form class="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={controladorDelEnvio}>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Title
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={`Title: ${article.title}`} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Content
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder={`Content: ${article.content}`} value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
                                UserId
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder={`UserId: ${article.UserId}`} value={UserId} onChange={(e) => setUserId(e.target.value)} />
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