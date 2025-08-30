import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const SignUp = ({ setToken, setUser }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError("Parollar mos emas!");
            return;
        }
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz. Endi tizimga kiring!");
            navigate('/signin');

        } catch (err) {
            setError(err.message);
        }
    };
    const handleGoogleSignUp = async () => {
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
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="border rounded px-3 py-2"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        required
                    />
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border rounded px-3 py-2"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
                </form>
                <div className="flex justify-center mt-4">
                    <GoogleButton onClick={handleGoogleSignUp} />
                </div>
                <p className="text-sm text-center mt-4">
                    Account bormi?
                    <Link to="/signin" className="text-blue-500 hover:underline"> Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
