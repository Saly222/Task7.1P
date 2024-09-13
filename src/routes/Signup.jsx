import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import '../Design/Signup.css';
import { createAuthUserWithEmailAndPasswordWrapper, createUserDocFromAuth} from '../utils/firebase';
import { getAdditionalUserInfo } from 'firebase/auth';

const SignUp = (props) => {
    const navigate = useNavigate(); 
    const [contact, setContact] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const {displayName, email, password, confirmPassword} = contact;
    console.log(contact);

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    };
    

    const handleSubmit = async(event) =>
    {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPasswordWrapper(email, password)
            await createUserDocFromAuth(user, {displayName});
            alert('Signup Completed')
            navigate('/Login');
        }
        catch(error){
            console.log("error in creating user", error.message)
        }
    }


    return (
        <div className='signup-container'>
            <h2 className='signup-title'>Create a DEV@Deakin Account</h2>
            <div className='signup-header'>
                <Input className='signup-placeholder'
                    name='displayName'
                    type='text'
                    placeholder='Name*'
                    onChange = {handleChange}
                    value = {contact.displayName}
                /><br />

                <Input className='signup-placeholder'
                    name='email'
                    type='text'
                    placeholder='Email*'
                    onChange = {handleChange}
                    value = {contact.email}
                /><br /> 

                <Input className='signup-placeholder'
                    name='password'
                    type='password'
                    placeholder='Password*'
                    onChange={handleChange}
                    value={contact.password}
                /><br />

                <Input className='signup-placeholder'
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm password*'
                    onChange={handleChange}
                    value = {contact.confirmPassword}
                /><br />

                <div className='button-container'>
                    <button className='create-button'onClick = {handleSubmit}>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
