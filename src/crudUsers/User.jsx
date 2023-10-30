import React, { useState, useEffect } from "react";

export default function User() {
    const [datos, setDatos] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const url = 'https://restful-api-project-7zvg.onrender.com/api/v1/users'

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
    const addUser = async (name, email, phone, password) => {
        let response = await fetch("https://restful-api-project-7zvg.onrender.com/api/v1/users", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                password: password
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
        setEmail("");
        setPhone("");
        setPassword("");

        window.location.href = '/';
    };


    const controladorDelEnvio = (e) => {
        e.preventDefault();
        addUser(name, email, phone, password);
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
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Email
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
                                Phone
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} />
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