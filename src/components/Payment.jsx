import React, { useState } from "react";
import { districts, regions } from "../data";

const Payment = () => {
    const [regionsData] = useState(regions);
    const [districtsData] = useState(districts);
    const [regionIndex, setRegionIndex] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState("Andijon");

    const [fullName, setFullName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const getMap = (e) => {
        let region = e.target.value;
        regionsData.map((item, index) => {
            if (item.region === region) {
                setRegionIndex(index);
                setSelectedRegion(region);
            }
            return null;
        });
    };

    return (
        <div className="w-full h-[77vh] bg-white p-5 flex justify-center">
            <div className="mt-16 flex flex-col gap-4 flex-1">
                <iframe
                    src={regionsData[regionIndex].map}
                    className="w-[80%] h-[80%] rounded-md shadow"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="flex gap-4">
                    <select
                        onChange={getMap}
                        value={selectedRegion}
                        className="w-[10vw] p-2 border rounded-md bg-gray-100"
                    >
                        {regionsData.map((item, index) => (
                            <option key={index} value={item.region}>
                                {item.region}
                            </option>
                        ))}
                    </select>

                    <select className="w-[10vw] p-2 border rounded-md bg-gray-100">
                        {districtsData[regionIndex].map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            <form className="mt-17 mr-16 w-[400px] h-[78%] bg-blue-500 text-white p-6 rounded-md shadow flex flex-col gap-4">
                <h2 className="text-center text-2xl font-bold">Card Info</h2>

                <input
                    className="p-3 border border-white rounded placeholder:text-white bg-transparent"
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <input
                    className="p-3 border border-white rounded placeholder:text-white bg-transparent"
                    type="text"
                    maxLength="16"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) =>
                        setCardNumber(e.target.value.replace(/\D/g, ""))
                    }
                />

                <input
                    className="p-3 border border-white rounded placeholder:text-white bg-transparent"
                    type="text"
                    maxLength="5"
                    placeholder="Card Exp Date (MM/YY)"
                    value={expiryDate}
                    onChange={(e) => {
                        let input = e.target.value.replace(/\D/g, "");
                        let value = "";
                        if (input.length > 2) {
                            value = input.slice(0, 2) + "/" + input.slice(2, 4);
                        } else {
                            value = input;
                        }
                        setExpiryDate(value);
                    }}
                />

                <input
                    className="p-3 border border-white rounded placeholder:text-white bg-transparent"
                    type="text"
                    maxLength="3"
                    placeholder="Card CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                />

                <button
                    className="w-full mt-10 py-3 rounded-md bg-red-500 hover:bg-red-600 font-semibold transition"
                    type="button"
                >
                    Pay
                </button>
            </form>
        </div>
    );
};

export default Payment;
