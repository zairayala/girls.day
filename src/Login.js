import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import { auth, db } from "./firebase-config";
import { useNavigate } from 'react-router-dom';
import logo from "./assets/logo2.png"
import { doc, setDoc } from 'firebase/firestore';

const Login = (action) => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerNames, setRegisterNames] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

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
                await saveUserData(uid);
                navigate("/");
            }
        } catch (error) {
            alert(error.message)
        }

    };

    const saveUserData = async (uid) => {
        const userData = {
            name: registerNames,
            email: registerEmail,
            myMeetings: [],
            meetings: [],
            uid: uid
        };
        await setDoc(doc(db, "users", uid), userData);
    }

    const displayLoginAndRegister = (action) => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const box = document.getElementById('box');


        if (action.action === "register") {
            box.classList.add("right-panel-active");
        }

        signUpButton.addEventListener('click', () => {
            box.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            box.classList.remove("right-panel-active");
        });

    }
    useEffect(() => {
        displayLoginAndRegister(action);
    }, [action])

    return (
        <section id='login'>

            <div className="box" id="box">
                <div className="form-container sign-up-container">
                    <div className='form-box' action="#">
                        <p>Crear cuenta</p>
                        <input type="text"
                            placeholder="Nombres"
                            value={registerNames}
                            onChange={(event) => {
                                setRegisterNames(event.target.value);
                            }}
                        />
                        <input type="email"
                            placeholder="Email"
                            value={registerEmail}
                            onChange={(event) => {
                                setRegisterEmail(event.target.value);
                            }}
                        />
                        <input type="password"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(event) => {
                                setRegisterPassword(event.target.value);
                            }}

                        />
                        <div className="social-container">
                            o
                            <div className="social-icons">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>

                            </div>
                        </div>

                        <button onClick={register} type='submit'>Registrar</button>
                    </div>
                </div>
                <div className="form-container sign-in-container">
                    <div className='form-box' action="#">
                        <p style={{ marginBottom: "1rem" }}>Iniciar sesión</p>
                        <input type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }}
                        />
                        <input type="password" placeholder="Password"
                            value={loginPassword}
                            onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }}
                        />
                        <div className="social-container">
                            o
                            <div className='social-icons'>
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>

                            </div>
                        </div>

                        <a href="#" style={{ margin: ".5rem 0rem" }}>¿Olvidaste tu contraseña?</a>
                        <button className='button2' style={{ marginTop: "1rem" }} onClick={login} type='submit'>Ingresar</button>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <p>¿Ya tienes una cuenta?</p>
                            <button className="ghost" id="signIn">Iniciar sesión</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <div style={{ width: "30%" }} className='d-flex align-self-end'>
                                <img src={logo} alt="" className='img-fluid' />
                            </div>
                            <div>
                                <p style={{ marginBottom: "0rem" }}>Registrar</p>
                                <h2 style={{ marginBottom: "2rem", marginTop: "2rem", fontSize: "50px" }}>Tu próxima aventura esta por comenzar</h2>
                                <button className="button2" id="signUp">CREAR CUENTA</button>

                            </div>
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
