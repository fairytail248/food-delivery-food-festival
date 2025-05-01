import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const cakeItems = [
  { id: 1, name: "Chocolate Cake", price: 25.99, image: "https://media.istockphoto.com/id/501125914/photo/chocolate-cake-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=-0ZeY9Xf_FZ9DAPWCxCxCzJeaPw58R-52fJyp01QJ5k=" },
  { id: 2, name: "Vanilla Cake", price: 22.99, image: "https://media.istockphoto.com/id/1247903563/photo/passion-fruit-birthday-cake.webp?a=1&b=1&s=612x612&w=0&k=20&c=laCi0TuXya9rLwJjYoK9rcoU5TpNugb3nnE0MSFgkVs=" },
  { id: 3, name: "Red Velvet Cake", price: 28.99, image: "https://plus.unsplash.com/premium_photo-1713920189815-876dbdf5f56e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UmVkJTIwVmVsdmV0JTIwQ2FrZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 4, name: "Lemon Cake", price: 24.99, image: "https://images.unsplash.com/photo-1602351447937-745cb720612f" },
  { id: 5, name: "Carrot Cake", price: 26.99, image: "https://plus.unsplash.com/premium_photo-1714669899928-eb0b28430295?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2Fycm90JTIwQ2FrZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 6, name: "pan Cake", price: 25.99, image: "https://images.unsplash.com/photo-1547318643-84d5cec56519?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 7, name: "panda cake", price: 12.99, image: "https://media.istockphoto.com/id/480740701/photo/image-of-home-baking-cupcake-decoration-ideas.webp?a=1&b=1&s=612x612&w=0&k=20&c=LRANZFWyHIAscJVty1QstjL_W3OA2CN5h0YElcK3HpQ=" },
  { id: 8, name: "Strawberry Cake", price: 18.99, image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3RyYXdiZXJyeSUyMENha2V8ZW58MHx8MHx8fDA%3D" },
  { id: 9, name: "Blueberry Cake", price: 14.99, image: "https://media.istockphoto.com/id/1267290806/photo/vanilla-blueberry-cheesecake-decorated-with-fresh-berries-on-a-gray-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=NxCH_ZZtkTEO8IRvnJx6-LiPEuuXw_d5pXGekWPcLfE=" },
  { id: 10, name: "Donots", price: 16.99, image: "https://media.istockphoto.com/id/149282990/photo/a-pile-of-glazed-doughnuts-with-sprinkles.webp?a=1&b=1&s=612x612&w=0&k=20&c=IDssBehFntSW1FPma-UwHR563ZsMXYSZE2R5H94jrHM=" },
];

const CakePage = () => {
  const [quantities, setQuantities] = useState(cakeItems.map(() => 1));
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

  const filteredCakes = cakeItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cake-page">
      <h2>Cake Menu</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for cakes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredCakes.length > 0 ? (
          filteredCakes.map((item, index) => (
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
            <p>No cakes match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakePage;