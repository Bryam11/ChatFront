import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cyber.svg";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoute";
function Login() {
  const navigate = useNavigate();

  //creamos las variables que vamos a usar para guardar los datos del usuario
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // variable para el logueo del usuario
  const [isLoading, setIsLoading] = useState(true);



  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

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
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        setIsLoading(false);
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        setIsLoading(false);
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  // metodo para validar los datos del usuario
  const handleValidations = () => {
    const { password, username } = values;
    if (password === "" || username.length === "") {
      toast.error("Correo y contraseña incorrecta", toastOptions);
      return false;
    }
    return true;
  };

  //Capturamos los valores del formulario
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register.</Link>
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
export default Login;
