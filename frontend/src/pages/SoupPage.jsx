import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const soupItems = [
  { id: 1, name: "Tomato Soup", price: 6.99, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd" },
  { id: 2, name: "Chicken Noodle Soup", price: 8.99, image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853" },
  { id: 3, name: "Vegetable Soup", price: 7.49, image: "https://media.istockphoto.com/id/1092632832/photo/vegetable-soup.webp?a=1&b=1&s=612x612&w=0&k=20&c=zdF1uKCjEvjjpViMNUh5iO9OraZduu_25qzamq5ov7E=" },
  { id: 4, name: "Mushroom Soup", price: 7.99, image: "https://media.istockphoto.com/id/466583781/photo/mushroom-soup.webp?a=1&b=1&s=612x612&w=0&k=20&c=hpO4z2aYsBQkxNTPjU1AFyz-NMqr2YliQGAJS95YRA4=" },
  { id: 5, name: "ramen", price: 9.99, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFtZW58ZW58MHx8MHx8fDA%3D" },
];

const SoupPage = () => {
  const [quantities, setQuantities] = useState(soupItems.map(() => 1));
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

  const filteredSoups = soupItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="soup-page">
      <h2>Soup Menu</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for soups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredSoups.length > 0 ? (
          filteredSoups.map((item, index) => (
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
            <p>No soups match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoupPage;