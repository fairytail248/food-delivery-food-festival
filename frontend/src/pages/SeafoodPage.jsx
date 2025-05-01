import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const seafoodItems = [
  { id: 1, name: "Grilled Salmon", price: 22.99, image: "https://media.istockphoto.com/id/1214416414/photo/barbecued-salmon-fried-potatoes-and-vegetables-on-wooden-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=AgidLz6RYOwAgDjKVOfDQhR6ePaRIRR6fcIM5Fp9P0A=" },
  { id: 2, name: "Shrimp Scampi", price: 19.99, image: "https://media.istockphoto.com/id/483571809/photo/shrimp-scampi.webp?a=1&b=1&s=612x612&w=0&k=20&c=UuHNEXlupLdDp8ZWpy2xjC9KEbc3c_JTnn2rz54XXrg=" },
  { id: 3, name: "Fish and Chips", price: 16.99, image: "https://media.istockphoto.com/id/182690390/photo/a-close-up-of-a-fish-and-chips-platter-with-dipping-sauce.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ts8Ro7bM31ItlkpazPLXd6JVaNON9i7bhBg6-MvJBPM=" },
  { id: 4, name: "Lobster Tail", price: 34.99, image: "https://media.istockphoto.com/id/526720776/photo/lobster-dinner-with-lemon-and-lettuce.webp?a=1&b=1&s=612x612&w=0&k=20&c=wN1Y5FGRS8g0aJmpTD00oDBQSkAZ2dLRcYFV5WqQPjo=" },
  { id: 5, name: "Crab Cakes", price: 24.99, image: "https://media.istockphoto.com/id/645777598/photo/crispy-golden-fish-cakes.webp?a=1&b=1&s=612x612&w=0&k=20&c=CuZIvokhWf5zKgr8QaZ8s8eb5IRLTXXllcuFTHd7Bbo=" },
];

const SeafoodPage = () => {
  const [quantities, setQuantities] = useState(seafoodItems.map(() => 1));
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

  const filteredSeafood = seafoodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seafood-page">
      <h2>Seafood Menu</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for seafood..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredSeafood.length > 0 ? (
          filteredSeafood.map((item, index) => (
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
            <p>No seafood items match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeafoodPage;