import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const iceCreamItems = [
  { id: 1, name: "Vanilla Ice Cream", price: 5.0, image: "https://media.istockphoto.com/id/1456234806/photo/mango-ice-cream-served-in-cup-isolated-on-grey-background-top-view-of-indian-and-bangladesh.webp?a=1&b=1&s=612x612&w=0&k=20&c=-AMw3wM-DpIdEPuS58ZqV4BAd-VKTmN6tFUtmo1degg=" },
  { id: 2, name: "Chocolate Ice Cream", price: 6.0, image: "https://media.istockphoto.com/id/157472912/photo/ice-cream-composition-on-a-bowl.webp?a=1&b=1&s=612x612&w=0&k=20&c=e1yPCusQJl2scx955yuv9LUcbx5e7OcARC_VgEDdz5Y=" },
  { id: 3, name: "Strawberry Ice Cream", price: 5.5, image: "https://plus.unsplash.com/premium_photo-1678198786424-c2cc6593f59c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aWNlJTIwY3JlYW1zfGVufDB8fDB8fHww" },
  { id: 4, name: "Mango Ice Cream", price: 7.0, image: "https://images.unsplash.com/photo-1591677445540-08028eeb3021?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFuZ28lMjBJY2UlMjBDcmVhbXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 5, name: "Blueberry Ice Cream", price: 6.5, image: "https://media.istockphoto.com/id/1314953337/photo/homemade-ice-cream-with-blueberry-berry-fruit-in-a-cup.webp?a=1&b=1&s=612x612&w=0&k=20&c=62WSsM4epqOlZqwO3tTo4_4bGC_cmG6unRjM8ExBAvM=" },
  { id: 6, name: "Cookies & Cream", price: 8.0, image: "https://images.unsplash.com/photo-1616863858589-9e04f2728c86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q29va2llcyUyMCUyNiUyMENyZWFtfGVufDB8fDB8fHww" },
  { id: 7, name: "banana Ice Cream", price: 5.5, image: "https://media.istockphoto.com/id/538479594/photo/banana-ice-cream.webp?a=1&b=1&s=612x612&w=0&k=20&c=e4uE1TLt7AhzCj6IqBsumATV1kYkPsEY_3PFH2vSkhM=" },
  { id: 8, name: " Ice Cream", price: 7.0, image: "https://media.istockphoto.com/id/2050545699/photo/three-flavors-of-ice-cream.webp?a=1&b=1&s=612x612&w=0&k=20&c=mKUteq1rav-Yloitue4guYT6u3yh8mxQHcD3mi9AkLg=" },
  { id: 9, name: "curde Ice Cream", price: 6.5, image: "https://media.istockphoto.com/id/134987000/photo/snow-ice-cup-cold-fresh-dessert.webp?a=1&b=1&s=612x612&w=0&k=20&c=-f0hpmtDu4TZhy51j_tahwiilJ3v_938E_q432YvRpg=" },
  { id: 10, name: "Orange Cream", price: 8.0, image: "https://plus.unsplash.com/premium_photo-1705346737952-fc78a46dc4f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG9yYW5nZSUyMGljZSUyMGNyZWFtfGVufDB8fDB8fHww" },
];

const IceCreamPage = () => { 
  const [quantities, setQuantities] = useState(iceCreamItems.map(() => 1));
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useContext(CartContext);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value > 0 ? value : 1;
    setQuantities(newQuantities);
  };

  const handleAddToCart = (item, quantity) => {
    addToCart({ ...item, quantity });
    alert(`${quantity} ${item.name}(s) added to cart!`);
  };

  const filteredIceCreams = iceCreamItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="icecream-page">
      <h2>Ice Cream Menu</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for ice creams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredIceCreams.length > 0 ? (
          filteredIceCreams.map((item, index) => (
            <div key={item.id} className="food-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(index, quantities[index] - 1)}>-</button>
                <span>{quantities[index]}</span>
                <button onClick={() => handleQuantityChange(index, quantities[index] + 1)}>+</button>
              </div>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(item, quantities[index])}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="not-available">
            <p>No ice creams match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IceCreamPage;
