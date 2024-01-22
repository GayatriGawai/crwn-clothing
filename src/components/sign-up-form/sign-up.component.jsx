import { useState } from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };
    const handleChnage = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not matched');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already exists, creation failed');
            } else {
                console.error('User creation encountered an error', error);
            }
        }
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display name</label>
                <input
                    type="text"
                    required
                    onChange={handleChnage}
                    name="displayName"
                    value={displayName}
                />

                <label>Email</label>
                <input
                    type="email"
                    required
                    onChange={handleChnage}
                    name="email"
                    value={email}
                />

                <label>Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChnage}
                    name="password"
                    value={password}
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChnage}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};
export default SignUpForm;
