import React, { useState, useEffect } from "react";

export default function Articles() {
    const [datos, setDatos] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [UserId, setUserId] = useState("");

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

    })
    const addArticle = async (title, content, UserId) => {
        let response = await fetch("https://restful-api-project-7zvg.onrender.com/api/v1/articles", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                content: content,
                UserId: UserId
                // userId: Math.random().toString(36).slice(2)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let data = await response.json();
        console.log(data)
        setDatos((datos) => [data, ...datos]);
        setTitle("");
        setContent("");
        setUserId("");

        window.location.href = '/articles';
    };


    const controladorDelEnvio = (e) => {
        e.preventDefault();
        addArticle(title, content, UserId);
    };





    return (
        <>
            <div className="flex justify-center items-center h-screen dark:bg-gray-900">
                <div class="w-full max-w-xs">
                    <form class="bg-indigo-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={controladorDelEnvio}>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Title
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Content
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
                                UserId
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone" value={UserId} onChange={(e) => setUserId(e.target.value)} />
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