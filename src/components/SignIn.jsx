import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const SignIn = ({ setToken, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userCredential.user));
            setToken(token);
            setUser(userCredential.user);
            navigate('/info');
        } catch {
            setError('Email yoki parol xato!');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setToken(token);
            setUser(user);
            navigate('/info');
        } catch (err) {
            setError('Google orqali kirishda xatolik yuz berdi: ' + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[77vh]">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border rounded px-3 py-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border rounded px-3 py-2"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign In</button>
                </form>

                <div className="flex justify-center mt-4">
                    <GoogleButton onClick={handleGoogleSignIn} />
                </div>

                <p className="text-sm text-center mt-4">
                    Account yo‘qmi?
                    <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
