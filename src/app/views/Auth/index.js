import React, { useState } from 'react';
import authSvg from '../assests/login.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Login = ({ history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password1: '',
        textChange: 'Sign In'
    });
    const { email, password1, textChange } = formData;
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };


    const handleSubmit = e => {
        e.preventDefault();
        if (email && password1) {
            setFormData({ ...formData, textChange: 'Submitting' });
            axios
                .post(`${process.env.REACT_APP_API_URL}/login`, {
                    email,
                    password: password1
                })
                .then(res => {
                    authenticate(res, () => {
                        setFormData({
                            ...formData,
                            email: '',
                            password1: '',
                            textChange: 'Submitted'
                        });
                        isAuth() && isAuth().role === 'admin'
                            ? history.push('/admin')
                            : history.push('/private');
                        toast.success(`Hey ${res.data.user.name}, Welcome back!`);
                    });
                })
                .catch(err => {
                    setFormData({
                        ...formData,
                        email: '',
                        password1: '',
                        textChange: 'Sign In'
                    });
                    console.log(err.response);
                    toast.error(err.response.data.errors);
                });
        } else {
            toast.error('Please fill all fields');
        }
    };
    return (
        <div >
            {isAuth() ? <Redirect to='/Private' /> : null}
            <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
            >
                <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    type='email'
                    placeholder='Email'
                    onChange={handleChange('email')}
                    value={email}
                />
                <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='password'
                    placeholder='Password'
                    onChange={handleChange('password1')}
                    value={password1}
                />
                <button
                    type='submit'
                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                    <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                    <span className='ml-3'>Sign In</span>
                </button>
                <Link
                    to='/users/password/forget'
                    className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
                >
                    Forget password?
                </Link>
            </form>
        </div>
    );
};

export default Login;
