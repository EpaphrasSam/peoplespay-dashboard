import React from "react";

export default function FooterAdmin() {
    return (
        <>
            <footer className="block py-4 mt-12">
                <div className="container mx-auto px-4">
                    <hr className="mb-4 border-b-1 border-blueGray-200" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4">
                            <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                                Copyright © {new Date().getFullYear()}{" "}
                                <a
                                    href="https://www.creative-tim.com?ref=nr-footer-admin"
                                    className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
                                >
                                    Peoplespay
                                </a>
                            </div>
                        </div>
                        <div className="w-full md:w-8/12 px-4 text-xm text-gray-400">
                            <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                                <li>
                                    <img className='w-12' src='/assets/footer.png' alt='bsystems'/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}