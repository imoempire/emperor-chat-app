import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { signUp } from "../Utils/APIs";


function SignUp() {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastStyles = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const toastSuccess = {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("ConfirmPassword & Password must be same", toastStyles);
      return false;
    }else if(username.length ===  "" ){
       toast.error("Username is required", toastStyles);
       return false;
      }else if(username.length < 5){
       toast.error("Username must be at least 5 characters", toastStyles);
      return false;
    }else if(email.length === ""){
      toast.error("Email is required", toastStyles);
      return false;
    } else if(password.length < 8){
      toast.warn("password must be at least 8 characters", toastStyles);
      return false;
    } else{
      toast.success('Successful!', toastSuccess );
      return true 
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('emperor')){
      navigate('/')
    }
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      const {username, email, password, confirmPassword} = values
      const {data} = await axios.post(signUp, {
        username,
        email,
        password
      });
      // Check if error
      if(data.status === false){
         toast.error(data.msg, toastStyles)
      }
      // Check for success
      if(data.status === true){
        localStorage.setItem('emperor', JSON.stringify(data.newUser))
        navigate('/')
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>Emperor Notes</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="ConfirmPassword"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Sign Up</button>
          <span>
            Already have an acaount ? <Link to="/signin">SignIn</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default SignUp;
