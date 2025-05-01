import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

// Pizza-only items (filtered from your Home.js foodItems)
const pizzaItems = [
  { id: 1, name: "Fresh Pizza", price: 13.44, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop" },
  { id: 2, name: "mushroom pizza", price: 12.99, image: "https://media.istockphoto.com/id/2065615123/photo/assorted-types-of-pizza-on-a-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=pbMgCILWrcg3nc4EITJpkV4wjSeYS_v3fUGqxPof4q8=" },
  { id: 3, name: "masala Pizza", price: 11.99, image: "https://media.istockphoto.com/id/1412492973/photo/butter-chicken-pizza-with-raw-cherry-tomato-black-pepper-garlic-and-mushroom-isolated-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=rMpYwLExK_tT5ehFlZ3qqIbvG3tCdKzH7wftWRhfJuA=" },
  { id: 4, name: "rosted Pizza", price: 32.99, image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlY2tlbiUyMHBpenphfGVufDB8fDB8fHww" },
  { id: 5, name: "butter Pizza", price: 42.99, image: "https://media.istockphoto.com/id/153444470/photo/pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=wmp-5NGZUXWag2EGOiwfXQN3Q4TvBYcYJBb8AXFaybo=" },
  { id: 6, name: "chicken Pizza", price: 52.99, image: "https://media.istockphoto.com/id/1043604390/photo/butter-chicken-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZPtRBbcQDKIGQEdtAGaH4BwzshBFIL-IlIuRXXjzXYQ=" },
  { id: 7, name: "tomato Pizza", price: 2.99, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlY2tlbiUyMHBpenphfGVufDB8fDB8fHww" },
  { id: 8, name: "piece of pastha", price: 2.59, image: "https://media.istockphoto.com/id/1190420565/photo/calzone-pizza-with-chicken-and-cheese.webp?a=1&b=1&s=612x612&w=0&k=20&c=iySgsK5EyuX_JOY6te104KVrEhL6ZcCTObjqSamcwhA=" },
  { id: 9, name: "cream pizza", price: 1.99, image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlY2tlbiUyMHBpenphfGVufDB8fDB8fHww" },
  { id: 10, name: "veg Pizza", price: 1.29, image: "https://images.unsplash.com/photo-1589187151053-5ec8818e661b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoZWNrZW4lMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 11, name: "tomato  Pizza", price: 14.99, image: "https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoZWNrZW4lMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 12, name: "veg-masala Pizza", price: 16.99, image: "https://images.unsplash.com/photo-1528830984461-4d5c3cc1abf0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNoZWNrZW4lMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D" }
 

];

const PizzaPage = () => {
  const [quantities, setQuantities] = useState(pizzaItems.map(() => 1));
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

  // Filter pizza items based on search term
  const filteredPizzas = pizzaItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pizza-page">
      <h2>Pizza Menu</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for pizzas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((item, index) => (
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
            <p>No pizzas match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PizzaPage;