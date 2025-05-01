import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const burgerItems = [
  { id: 1, name: "Chicken Burger", price: 22.5, image: "https://plus.unsplash.com/premium_photo-1683655058728-415f4f2674bf?w=600&auto=format&fit=crop&q=60" },
  { id: 2, name: "Double Chicken Burger", price: 66.1, image: "https://plus.unsplash.com/premium_photo-1695758787769-71259d0514c7?w=600&auto=format&fit=crop&q=60" },
  { id: 3, name: "Veg Burger", price: 2.4, image: "https://images.unsplash.com/photo-1557130597-9e5e0aac11a2?w=600&auto=format&fit=crop&q=60" },
  { id: 4, name: "Cheese Burger", price: 6.3, image: "https://images.unsplash.com/photo-1552913902-366e726db79e?w=600&auto=format&fit=crop&q=60" },
  { id: 5, name: "Plain Burger", price: 1.2, image: "https://images.unsplash.com/photo-1530216657255-616bc9be214f?w=600&auto=format&fit=crop&q=60" },
  { id: 6, name: "Chicken Burger", price: 6.8, image: "https://media.istockphoto.com/id/2162298291/photo/hands-holding-fried-chicken-burger-in-brioche-potato-bun-in-queso-sauce.webp?a=1&b=1&s=612x612&w=0&k=20&c=LwdERwnvRFvrmVhM0B7I8YSUOLvyA1sES0cQefkoSmI=" },
  { id: 7, name: "Veg Burger", price: 2.2, image: "https://media.istockphoto.com/id/1429334731/photo/chicken-tasty-burger-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=c78nG6AVWR9tOH0HrUByE-CaJN6CffJ_HuLt7EJxFzs=" },
  { id: 8, name: "Chili Chicken Burger", price: 12.0, image: "https://media.istockphoto.com/id/1134613434/photo/burger-on-a-red-gradient-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=LixSGH4WdnIDkdEOWH2RS7iRo5VLXx38tlAfxp7imAo=" },
  { id: 9, name: "Veg Burger", price: 1.9, image: "https://media.istockphoto.com/id/1429334731/photo/chicken-tasty-burger-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=c78nG6AVWR9tOH0HrUByE-CaJN6CffJ_HuLt7EJxFzs=" },
  { id: 10, name: "Mushroom Burger", price: 3.5, image: "https://images.unsplash.com/photo-1549892898-79ac97b31fb2?w=600&auto=format&fit=crop&q=60" },
  { id: 11, name: "Veg Burger", price: 3.8, image: "https://media.istockphoto.com/id/157685880/photo/turkey-burger-with-spinach-and-salsa.webp?a=1&b=1&s=612x612&w=0&k=20&c=20mY4dEGUylNYwf41wWgSBZQLKgkR_kzW3e5QaS4Ugs=" },
  { id: 12, name: "War Burger", price: 8.2, image: "https://images.unsplash.com/photo-1650553452861-41b0caa38e61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNoaWNrZW4lMjBidXJnZXJzfGVufDB8fDB8fHww" }
];

const BurgerPage = () => { 
  const [quantities, setQuantities] = useState(burgerItems.map(() => 1));
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

  const filteredBurgers = burgerItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="burger-page">
      <h2>Burger Menu</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for burgers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredBurgers.length > 0 ? (
          filteredBurgers.map((item, index) => (
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
            <p>No burgers match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerPage;
