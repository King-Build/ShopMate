import React from 'react';

const Main = ({ goods, addProduct }) => {
    return (
        <div className="px-6 pt-4 pb-10 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {goods?.length
                    ? goods.map((item, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
                            <img src={item?.image} alt={item?.title} className="w-full h-48 object-contain p-4" />
                            <div className="px-4 pb-4">
                                <h2 className="text-lg font-semibold line-clamp-1">{item.title}</h2>
                                <p className="text-blue-600 font-bold text-lg">${item.price}</p>
                                <span className="text-sm text-gray-500">{item.category}</span>
                                <button onClick={() => addProduct(item.id)} type="button" className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition" >Buy</button>
                            </div>
                        </div>
                    ))
                    : ""}
            </div>
        </div>
    );
};

export default Main;
