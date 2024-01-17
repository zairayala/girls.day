import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase-config";
import "./Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!registerEmail || !registerPassword) {
      setError('Por favor, complete todos los campos.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(registerEmail)) {
      setError('Por favor, ingrese un email válido.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return false
    }

    // Completar demas lógica de validación de email y contraseña aquí

    return true;
  };

  const register = async () => {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      if (userCredential && userCredential.user) {
        const { uid } = userCredential.user;
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }

  };
  return (
    <section id='register'>
      <div className='container'>
        <div className='form-box'>
          {error && <p className="text-danger">{error}</p>}
          <div className='inputBox'>
            <input
              type="email"
              value={registerEmail}
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            /><span>Correo electrónico</span>

          </div>
          <div className='inputBox'>
            <input
              type="text"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            /><span>Contraseña</span>

          </div>
          <div className="row-display buttons">
            <div className="register-button">
              <button onClick={register} type='submit'>
                REGISTRAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}
export default Register;