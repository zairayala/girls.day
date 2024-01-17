import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import { auth } from "./firebase-config";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        if (!loginEmail || !loginPassword) {
            setError('Por favor, complete todos los campos.');
            setTimeout(() => {
                setError('');
            }, 2000);
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(loginEmail)) {
            setError('Por favor, ingrese un email válido.');
            setTimeout(() => {
                setError('');
            }, 2000);
            return false
        }

        // Completar demas lógica de validación de email y contraseña aquí

        return true;
    };

    const login = async () => {
        let attempts = 5; // Número máximo de intentos
        setError('');
        try {
            if (validateForm()) {
                while (attempts > 0) {
                    const user = await signInWithEmailAndPassword(
                        auth,
                        loginEmail,
                        loginPassword
                    );
                    navigate('/');
                    break; // Salir del bucle while
                }
                if (attempts === 0) {
                    // Si se alcanza el límite de intentos, muestra un mensaje de error con alert
                    alert("Límite de intentos alcanzado");
                }
            }

        } catch (error) {
            alert(error.message); // Mostrar mensaje de error con alert
            attempts--; // Disminuir el contador de intentos en caso de error
            console.log("consulte a sistemas");
        }
    };


    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const box = document.getElementById('box');

        signUpButton.addEventListener('click', () => {
            box.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            box.classList.remove("right-panel-active");
        });
    }, [])
    return (
        <section id='login'>

            <div className="box" id="box">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h2>Create Account</h2>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h2>Iniciar sesión</h2>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>o usa tu correo electrónico</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">¿Olvidaste tu contraseña?</a>
                        <button>Ingresar</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h2>¿Ya tienes una cuenta?</h2>
                            <button className="ghost" id="signIn">Iniciar sesión</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <p>Registrate</p>
                            <h2>Hagamos de cada salida una experiencia inolvidable</h2>
                            <button className="button2" id="signUp">CREAR CUENTA</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*{error && <p className="text-danger">{error}</p>}
                    <div className='inputBox'>
                        <input
                            type="email"
                            value={loginEmail}
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }}
                        /><span>Correo electrónico</span>

                    </div>
                    <div className='inputBox'>
                        <input
                            type="text"
                            onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }}
                        /><span>Contraseña</span>

                    </div>
                    <div className="row-display buttons">
                        <div className="register-button">
                            <Link to="/register">
                                <button id="register-button" className="button2">
                                    REGISTRAR
                                </button>
                            </Link>
                        </div>
                        <div className="login-button">
                            <button onClick={login} type='submit'>
                                LOGIN
                            </button>
                        </div>
                        </div>*/}

        </section>
    )

}
export default Login;
