import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import SignUp from '../routes/Signup'
import '../Design/Login.css'
import { signInWithGooglePopup, signInWithPopup , createUserDocFromAuth, signinAuthUserWithEmailAndPassword, signinAuthUserWithEmailAndPasswordWrapper} from '../utils/firebase';
const Login = (props) => {
const navigate = useNavigate(); 
const logGoogleUser = async () => 
{
  const {user}= await signInWithGooglePopup();
  const userDocRef = await createUserDocFromAuth(user)
}

  const [contact, setContact] = useState({
    email: '',
    password: ''
  });

  const {email, password} = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };


  const handleSubmit = async(event) =>
  {
      event.preventDefault();

      
      try {
          const response = await signinAuthUserWithEmailAndPassword(email, password);
          console.log(response)
          alert('Login Successful')
          navigate('/NavBar');
      }
      catch(error){
          console.log("error in login", error.message)
      }
  }


  return (
    <div className='header-container'>
        <div className='header'>
      <Input className = 'header-placeholder'
        name='email'
        type='text'
        placeholder='Your Email'
        onChange={handleChange}
        value={contact.email}
      /><br />

      <Input className = 'header-placeholder'
        name='password'
        type='password'
        placeholder='Your Password'
        onChange={handleChange}
        value={contact.password}
      /><br />

      <div className='login-button'>
                    <button className='create-button'onClick = {handleSubmit}>
                        Login
                    </button>
                </div>
      <br /><br />
      <button onClick = {logGoogleUser}>
        Login with Google
      </button>
      
      
      {/* <Button className ='google-button'
        type='submit'
        text='Login with Google'
      /> */}
        
      <br /><br />
      <Link to='/SignUp'>
      <button className='signup-button'>Sign Up</button>
      </Link>
    <Outlet/>
      </div>
    </div>
  );
};

export default Login;
