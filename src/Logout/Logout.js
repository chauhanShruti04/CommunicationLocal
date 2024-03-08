import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../Common/Storage";


export const LogOut = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setLocalStorage("loggedInUser", []);
        navigate("/");
    }, [])

    return (
        <>

        </>
    )
}