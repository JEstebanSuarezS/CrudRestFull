import React, { useState, useEffect } from "react";
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');


export default function Home() {
    const [datos, setDatos] = useState([])

    useEffect(() => {
        const url = 'https://restful-api-project-7zvg.onrender.com/api/v1/categories'

        fetch(url)
            .then((response => response.json()))
            .then((response) => {
                setDatos(response.data)
                
            })
            .catch((error) => {
                console.log(error);
            })

    })



    const destroyCategories = async (id) => {
        let response = await fetch(
            `https://restful-api-project-7zvg.onrender.com/api/v1/categories/${id}`,
            {
                method: "DELETE"
            }
        );
        if (response.status === 200) {
            setDatos(
                datos.filter((elemento) => {
                    return elemento.id !== id;
                })
            );
        } else {
            return;
        }
    };

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }





    return (
        <>
            <div class="relative overflow-x-auto shadow-md h-screen dark:bg-gray-900">
                <h1 className="text-center text-[2em] whitespace-nowrap dark:text-white">List of Categories!</h1>
                <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                    <div>
                        <button
                            id="dropdownActionButton"
                            onClick={openModal}
                            type="button"
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                            More Tables
                        </button>

                        <Modal
                            isOpen={modalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Modal"
                            className="custom-modal"
                            overlayClassName="custom-overlay"
                        >
                            <div className="modal-content">
                                <div className="flex flex-col items-center gap-[1em]">
                                    <h1 className="">Routes more tables!</h1>
                                    <a
                                        class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-gray-900 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                                        href="/" id="dropdownCloseButton" onClick={closeModal}
                                    >
                                        Users!
                                    </a>
                                    <a
                                        class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-gray-900 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                                        href="/articles" id="dropdownCloseButton" onClick={closeModal}
                                    >
                                        Articles!
                                    </a>
                                    <a
                                            class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-gray-900 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                                            href="/categories" id="dropdownCloseButton" onClick={closeModal}
                                        >
                                            Categories!
                                        </a>
                                </div>
                            </div>
                        </Modal>

                        <style jsx>{`
                .custom-modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: #fff;
                    border: 1px solid #ccc;
                    padding: 20px;
                    max-width: 400px; /* Ajusta el ancho máximo según tus necesidades */
                    width: 100%;
                    heigth: auto;
                    border-radius: 0.5em;
                    z-index: 1000;
                }

                .custom-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 999;
                }

                .modal-content {
                    text-align: center;
                }
            `}</style>

                        <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                            </div>
                        </div>
                    </div>
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">

                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {datos.map((elemento) => (

                            <>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="w-4 p-4">
                                        <div class="flex items-center">

                                        </div>
                                    </td>
                                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div class="pl-3">
                                            <div class="text-base font-semibold">{elemento.id}</div>
                                        </div>
                                    </th>
                                    <td class="px-6 py-4">
                                        {elemento.name}
                                    </td>
                                    <td class="px-6 pt-4">
                                        <Link
                                            to={`/putCategories/${elemento.id}`}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-[1.2em]"
                                        ><HiPencil /></Link>
                                    </td>
                                    <td class="px-6 pt-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline text-[1.2em]" onClick={() => destroyCategories(elemento.id)}><HiOutlineTrash /></a>
                                    </td>
                                </tr >
                            </>

                        ))}

                    </tbody>
                </table>
                <div className="text-center mt-12">

                    <a
                        class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                        href="/createCategories"
                    >
                        Create more Categories!
                    </a>
                </div>

            </div >
        </>
    )
}