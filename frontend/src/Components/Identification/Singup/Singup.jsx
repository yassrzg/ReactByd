import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import './Singin.css';


export default function Signup() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const surnameRegex = /^[a-zA-Z]+$/;

    function handleSurnameChange(event) {
        const surnameValue = event.target.value;
        setSurname(surnameValue);
        if (!surnameRegex.test(surnameValue)) {
            setSurnameError('Veuillez entrer un nom valide (lettres alphabétiques uniquement).');
        } else {
            setSurnameError('');
        }
    }

    function handlePhoneChange(event) {
        const phoneValue = event.target.value;
        setPhone(phoneValue);
        if (!phoneRegex.test(phoneValue)) {
            setPhoneError('Veuillez entrer un numéro de téléphone valide (10 chiffres).');
        } else {
            setPhoneError('');
        }
    }

    function handleEmailChange(event) {
        const emailValue = event.target.value;
        setEmail(emailValue);
        if (!emailRegex.test(emailValue)) {
            setEmailError('Veuillez entrer une adresse e-mail valide.');
        } else {
            setEmailError('');
        }
    }

    function handleNameChange(event) {
        const nameValue = event.target.value;
        setName(nameValue);
        if (!nameRegex.test(nameValue)) {
            setNameError('Veuillez entrer un nom valide (lettres alphabétiques uniquement).');
        } else {
            setNameError('');
        }
    }

    function handleConfirmPasswordChange(event) {
        const confirmationPassword = event.target.value;
        setConfirmPassword(confirmationPassword);
        if (password !== confirmationPassword) {
            setPasswordError('Les mots de passe ne correspondent pas.');
        } else {
            setPasswordError('');
        }
    }

    const history = useNavigate();
    const url = '/api/register';

    const data = {
        email: email,
        password: password
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(url, data, {
                withCredentials: true,

            });
            console.log(response.data); // Traitez ici la réponse si nécessaire
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div id="form">
            <div id="form-content">
                <div className="form-box-right">
                    <div className="form-content">
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <input
                                    onChange={handleNameChange}
                                    value={name}
                                    type="text"
                                    id="name"
                                    required
                                />
                                <label htmlFor="name" className="label-signup">
                                    Prénom
                                </label>
                                {nameError && <span className="error-message">{nameError}</span>}
                            </div>

                            <div className="input-box">
                                <input
                                    onChange={handleEmailChange}
                                    value={email}
                                    type="email"
                                    id="email"
                                    required
                                />
                                <label htmlFor="email" className="label-signup">
                                    Email
                                </label>
                                {emailError && <span className="error-message">{emailError}</span>}
                            </div>

                            <div className="input-box">
                                <input
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                    type="password"
                                    id="password"
                                    required
                                />
                                <label htmlFor="password" className="label-signup">
                                    Mot de passe
                                </label>
                                {passwordError && <span className="error-message">{passwordError}</span>}
                            </div>

                            <div className="input-box">
                                <input
                                    onChange={handleConfirmPasswordChange}
                                    value={confirmPassword}
                                    type="password"
                                    id="confirmPassword"
                                    required
                                />
                                <label htmlFor="confirmPassword" className="label-signup">
                                    Confirmer le mot de passe
                                </label>
                                {passwordError && <span className="error-message">{passwordError}</span>}
                            </div>

                            <div>
                                <button type="submit">Inscription</button>
                            </div>
                        </form>
                        <div className="linkContainer">
                            <Link className="link-login" to="/login">
                                Déjà inscrit? Connectez-vous.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
