import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Main from './layout/Main';
import Footer from './layout/Footer';
import SelectedGoods from './components/SelectedGoods';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Contact from './components/Contact';
import About from './components/About';
import Payment from './components/Payment';
import Info from './components/Info';

const App = () => {
  const [goods, setGoods] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(data => setGoods(data.data))
      .catch(error => console.log(error));
  }, []);

  const addProduct = (id) => {
    let newProductList = [...selectedProducts];
    let existingIndex = newProductList.findIndex(item => item.id === id);
    if (existingIndex !== -1) {
      newProductList[existingIndex].quantity += 1;
    } else {
      let newGood = goods.find(good => good.id === id);
      newProductList.push({ ...newGood, quantity: 1 });
    }
    setSelectedProducts(newProductList);
  };

  const plusQuantity = (index) => {
    const plusMinus = [...selectedProducts];
    plusMinus[index].quantity += 1;
    setSelectedProducts(plusMinus);
  };

  const minusQuantity = (index) => {
    const plusMinus = [...selectedProducts];
    if (plusMinus[index].quantity > 1) {
      plusMinus[index].quantity -= 1;
      setSelectedProducts(plusMinus);
    }
  };

  const deleteProduct = (index) => {
    const plusMinus = [...selectedProducts];
    plusMinus.splice(index, 1);
    setSelectedProducts(plusMinus);
  };

  const deleteAllProducts = () => {
    setSelectedProducts([]);
  };

  const totalPrice = selectedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar selectedProducts={selectedProducts} user={user} setUser={setUser} setToken={setToken} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Main addProduct={addProduct} goods={goods} />} />
            <Route path="/products" element={<Main addProduct={addProduct} goods={goods} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn setToken={setToken} setUser={setUser} />} />
            <Route path="/signup" element={<SignUp setToken={setToken} setUser={setUser} />} />
            <Route
              path="/payment"
              element={token ? <Payment /> : <SignIn setToken={setToken} setUser={setUser} />} />
            <Route
              path="/info"
              element={token ? <Info /> : <SignIn setToken={setToken} setUser={setUser} />} />
            <Route
              path="/basket"
              element={
                <SelectedGoods
                  selectedProducts={selectedProducts}
                  plusQuantity={plusQuantity}
                  minusQuantity={minusQuantity}
                  deleteProduct={deleteProduct}
                  deleteAllProducts={deleteAllProducts}
                  totalPrice={totalPrice} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
