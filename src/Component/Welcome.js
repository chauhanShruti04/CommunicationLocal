import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../Common/Storage';


const Welcome = () => {

    const [userName, setUserName] = useState("");
    const loggedInUser = getLocalStorage("loggedInUser")
        ? JSON.parse(getLocalStorage("loggedInUser"))
        : [];

    useEffect(() => {
        if (loggedInUser && loggedInUser.length > 0) {
            setUserName(loggedInUser[0]?.username);
        }
    }, [loggedInUser]);


    return (
        <div >
            <div className='welcome'>
                <h1>Login Successful!!   Welcome!</h1>
            </div>
            <div className='username'>
                <p>{userName}</p>
            </div>
        </div>
    );
};

export default Welcome;



