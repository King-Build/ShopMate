import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const SelectedGoods = ({ selectedProducts, plusQuantity, minusQuantity, deleteProduct, deleteAllProducts, totalPrice }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const handleBuyNow = () => {
        navigate('/payment');
    }
    return (
        <div className="w-full h-[77vh] overflow-auto bg-white p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Your Basket</h2>
            <div className="flex-1 space-y-4">
                {selectedProducts.length ? (
                    selectedProducts.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 border-b pb-3">
                            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                            <div className="flex-1">
                                <h3 className="font-medium text-sm">{item.title}</h3>
                                <p className="text-blue-600 font-bold">$ {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => minusQuantity(index)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                <span className="font-bold">{item.quantity}</span>
                                <button onClick={() => plusQuantity(index)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                            </div>
                            <MdDelete onClick={() => deleteProduct(index)} className="text-red-500 cursor-pointer text-xl hover:text-red-700" />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Your Bag is Empty.</p>
                )}
            </div>
            {selectedProducts.length > 0 && (
                <div className="pt-6 mt-6 flex flex-col gap-4">
                    <button onClick={handleBuyNow}
                        className="w-full cursor-pointer px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Buy Now</button>
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-bold text-2xl">Total : </span>
                            <span className="text-blue-600 font-bold text-2xl">$ {totalPrice.toFixed(2)}</span>
                        </div>
                        <button onClick={() => setShowConfirm(true)} className='cursor-pointer border px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500 transition'>Delete All</button>
                    </div>
                </div>)}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white p-6 rounded shadow flex flex-col items-center gap-4">
                        <p>Are you sure you want to delete all?</p>
                        <div className="flex gap-4">
                            <button onClick={() => { deleteAllProducts(); setShowConfirm(false); }} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">Yes</button>
                            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer">No</button>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default SelectedGoods;
