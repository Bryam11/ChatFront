import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cyber.svg";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoute";

function Register() {

    const navigate = useNavigate();

    //creamos las variables que vamos a usar para guardar los datos del usuario
    const[values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false);


    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    // metodo para validar el login del usuario
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
          navigate("/");
        }
      }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidations()) {
      setIsLoading(true);
        const {password, confirmPassword, username, email} = values;
        const {data} =  await axios.post(registerRoute, {
            username,
            password,
            email,
        });
        if(data.status === false){
            setIsLoading(false);
            toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
            setIsLoading(false);
            localStorage.setItem('chat-app-user', JSON.stringify(data.user));
            navigate("/");
        }
       
    }
    };


  // metodo para validar los datos del usuario
   const handleValidations = () => {
    const {password, confirmPassword, username, email} = values;
    if(password !== confirmPassword){
        toast.error("Las contraseñas no coinciden", toastOptions);
        return false;
    } else if(username.length < 3){
        toast.error("El nombre de uusario debe tener mas de tres caracteres", toastOptions);
        return false;
    }
    else if(password.length < 8){
        toast.error("la contraseña debe tener mas de 8 caracteres", toastOptions);
        return false;
    }else if(email === ""){
        toast.error("El correo no puede estar vacio", toastOptions);
    }
    return true;
   }


  //Capturamos los valores del formulario
  const handleChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value});
  };


  return (
    <>
    { 
        isLoading && (
            <div className="loader">
                <div className="loader-container">
                    <div className="loader-circle"></div>
                    <div className="loader-circle"></div>
                </div>
            </div>
        )
    }
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="Logo" />
            <h1>cyber</h1>
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
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            already have an account? <Link to="/login">Login.</Link>
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
loader {
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader-container {
    display: flex;
    gap: 1rem;
    .loader-circle {
      height: 1rem;
      width: 1rem;
      background-color: #4e0eff;
      border-radius: 50%;
      animation: loader 0.5s infinite alternate;
      &:nth-child(2) {
        animation-delay: 0.5s;
      }
    }
  }
}
`;
export default Register;
