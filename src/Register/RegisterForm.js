import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {
    Validation,
    isConfirmPasswordValid,
    isEmailValid,
    isPasswordValid,
    isUserValid,
} from '../LoginValidation/Validation';
import { getLocalStorage, setLocalStorage } from '../Common/Storage';



export const RegisterForm = () => {


    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        conpassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        conpassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
    };

    const handleRegister = (e) => {

        if (
            isUserValid(values) &&
            isEmailValid(values) &&
            isPasswordValid(values) &&
            isConfirmPasswordValid(values)
        ) {
            let userData = getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')) : [];
            const userid = userData.filter(e => e.email === values.email);
            if (userid?.length > 0) {
                swal('Oops!', "User Already Exists!!", 'error');
                return;
            }
            const finalData = { ...values, id: userData.length + 1 };
            userData.push(finalData);
            setLocalStorage('userData', userData);

            swal("Congrats!", "You have sucessfully registered!", "success");
            navigate('/');
        }

    };



    return (
        <div className='register-box'>
            <div className='loginFormBox'>
                <div className='loginTitle'>
                    <h1>WELCOME</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='loginform'>
                        <label for="exampleInputEmail1">Username</label>
                        <input name='username' type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" value={values.username} onChange={handleChange} />
                    </div>

                    {errors.username && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors.username}</p>
                    )}

                    <br></br>
                    <div className='loginform'>

                        <label for="exampleInputEmail1">Email address</label>
                        <input name='email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={values.email} onChange={handleChange} />
                    </div>

                    {errors.email && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors.email}</p>
                    )}

                    <br></br>
                    <div className='loginform'>

                        <label for="exampleInputPassword1">Password</label>
                        <input name='password' type="password" class="form-control" id="exampleInputPassword1" value={values.password} onChange={handleChange} />
                    </div>

                    {errors.password && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors.password}</p>
                    )}

                    <br></br>
                    <div className='loginform'>

                        <label for="exampleInputPassword1">Confirm Password</label>
                        <input name='conpassword' type="password" class="form-control" id="exampleInputPassword1" value={values.conpassword} onChange={handleChange} />
                    </div>

                    {errors.conpassword && (
                        <p style={{ color: 'red', fontSize: '13px' }}>
                            {errors.conpassword}
                        </p>
                    )}

                    <br></br>
                    <div className='loginForm'>

                        <button type="submit" class="btn btn-primary " onClick={handleRegister} >Register</button>
                        <p>
                            Already have an account?
                            <Link to='/' class='link'>
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
