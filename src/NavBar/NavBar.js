import React from 'react';
import { Outlet, Link } from 'react-router-dom';



export const NavBar = () => {

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active" style={{ marginRight: "90px", marginLeft: "160px" }}>
                            <Link to='/groupchat' className='nav-link '>
                                Group Chat
                            </Link>
                        </li>
                        <li class="nav-item active" style={{ marginRight: "160px" }}>
                            <Link to='/manageuser' className='nav-link '>
                                Manage Users
                            </Link>
                        </li>
                        <li class="nav-item active" style={{ marginRight: "160px" }}>
                            <Link to='/managedocument' className='nav-link '>
                                Manage Documents
                            </Link>
                        </li>
                        <li class="nav-item active" style={{ marginRight: "160px" }}>
                            <Link to='/logout' className='nav-link '>
                                LogOut
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>

    );
};
