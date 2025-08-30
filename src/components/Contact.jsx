import React from 'react';

const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-15 bg-white">
            <div className="w-full max-w-lg p-8 rounded shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
                <p className="mb-2">Email: shopmate@gmail.com</p>
                <p className="mb-2">Phone: +998 94 606 25 75</p>
                <p className="mb-2">Address: Andijon, Uzbekistan</p>
                <form className="flex flex-col gap-4 mt-6">
                    <input type="text" placeholder="Your Name" className="border rounded px-3 py-2" required />
                    <input type="email" placeholder="Your Email" className="border rounded px-3 py-2" required />
                    <textarea placeholder="Your Message" className="border rounded px-3 py-2" rows={4} required />
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;