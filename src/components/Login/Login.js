import React, { useContext, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import './Login.css'
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../../App';

initializeApp(firebaseConfig);

const Login = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [newUser, setNewUser] = useState(false);
    const [signedInUser, setSignedInUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        errorMessage: '',
        created: false,
    })

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const { displayName, email, photoURL } = user;

                const signedIn = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setSignedInUser(signedIn);
                console.log('signed in successfully');
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const handleBlur = (event) => {
        let isValid = true;
        if (event.target.name === 'email') {
            const email = event.target.value;
            isValid = /\S+@\S+\.\S+/.test(email);
            console.log(isValid, email);
        }
        if (event.target.name === 'password') {
            const password = event.target.value;
            const passwordLengthValidation = password.length > 7;
            const passwordHasNumberValidation = /\d{1}/.test(password);
            isValid = passwordLengthValidation && passwordHasNumberValidation;
            console.log(isValid, password);
        }
        if (isValid) {
            const newUserInfo = { ...signedInUser };
            newUserInfo[event.target.name] = event.target.value;
            setSignedInUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && signedInUser.email && signedInUser.password) {
            createUserWithEmailAndPassword(auth, signedInUser.email, signedInUser.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const newUser = {
                        name: signedInUser.name,
                        email: signedInUser.email,
                        password: signedInUser.password,
                        created: true,
                        errorMessage: ''
                    }
                    setSignedInUser(newUser);
                    console.log(signedInUser)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const newUser = { ...signedInUser };
                    newUser.errorMessage = "Error 400 Email already in use";
                    setSignedInUser(newUser);
                    // ..
                });
        }

        if (!newUser && signedInUser.email && signedInUser.password) {
            signInWithEmailAndPassword(auth, signedInUser.email, signedInUser.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const newInfo = {...signedInUser}
                    newInfo.isSignedIn = true;
                    newInfo.errorMessage = '';
                    setSignedInUser(newInfo)
                    setLoggedInUser(newInfo);

                    // logged in user will redirect to the destination page
                    if(location.state?.from){
                        navigate(location.state.from)
                    }
                    console.log('signed in successfully');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const newInfo = {...signedInUser};
                    newInfo.errorMessage = errorMessage;
                    setSignedInUser(newInfo);
                });
        }
        event.preventDefault();
    }

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            const signedIn = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            };
            setSignedInUser(signedIn);
            console.log('Signed out successfully');
        }).catch((error) => {
            // An error happened.
        });
    }

        return (
            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                                {
                                    newUser ? <h2 className="fw-bold mb-2 text-center">Sign Up</h2> :
                                        <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                                }

                                <br />

                                {
                                    newUser && <input onBlur={handleBlur} className="mb-4 border border-secondary rounded" type="text" name='name' label="name" placeholder='input your name' />
                                }

                                <input onBlur={handleBlur} className="mb-4 border border-secondary rounded" type="text" name='email' label="Email" placeholder='input your email' />
                                <input onBlur={handleBlur} className="mb-4 border border-secondary rounded" type="text" name='password' label="Password" placeholder='input your password' />

                                {
                                    !newUser && <Button onClick={handleSubmit} variant="primary">Login</Button>
                                }

                                {
                                    signedInUser.isSignedIn && <p>Signed In</p>
                                }

                                <br />

                                {
                                    newUser ? <Button onClick={handleSubmit} variant="primary">Sign Up</Button> :
                                        <Button onClick={() => setNewUser(true)} variant="primary">New User??</Button>
                                }

                                {
                                    signedInUser.errorMessage && <p>{signedInUser.errorMessage}</p>
                                }

                                {
                                    !newUser && <hr className="my-4" />
                                }

                                {
                                    !newUser && <Button onClick={handleGoogleSignIn} variant="danger">Sign in with google</Button>

                                }

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        );
    };

    export default Login;