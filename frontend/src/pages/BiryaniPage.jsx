import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const biryaniItems = [
  { id: 1, name: "Chicken Biryani", price: 15.99, image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biriyani.webp?a=1&b=1&s=612x612&w=0&k=20&c=a8j_p9BkWtsSX7WkcqeetigH8PYWXGayIGto9GiehNY= " },
  { id: 2, name: "Mutton Biryani", price: 18.99, image: "https://media.istockphoto.com/id/1486585184/photo/mutton-biryani-close-up-image-in-a-restaurant-food-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=zD0hKbESFjyIt7S40AGQkw4jHhuUWkIuEYeiSS9Mq1I=" },
  { id: 3, name: "Veg Biryani", price: 12.99, image: "https://media.istockphoto.com/id/1292442851/photo/traditional-hyderabadi-vegetable-veg-dum-biryani-with-mixed-veggies-served-with-mixed-raita.webp?a=1&b=1&s=612x612&w=0&k=20&c=YTQkdUfr2PCncJmxsaijhxi2xQ7gtfQFB5_EGmC1NF4=" },
  { id: 4, name: "Fish Biryani", price: 17.99, image: "https://media.istockphoto.com/id/1334383300/photo/fish-biryani-spicy-and-delicious-malabar-biryani-or-hydrabadi-biryani-dum-biriyani.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZqTAGd2qFYQHDxhmvWC5XSwKLIQSPEGFDOEz9wK9SEE=" },
  { id: 5, name: "Prawn Biryani", price: 19.99, image: "https://media.istockphoto.com/id/1334383289/photo/prawn-or-shrimp-biryani-fish-biryani-spicy-and-delicious-malabar-biryani-pulao-basmati-rice.webp?a=1&b=1&s=612x612&w=0&k=20&c=dKyw0WKP83K5vtkOfHa0f8oOkTrOsI5pYzv3HLGG6G8=" },
];


const ekieteItems =[
    
]

const BiryaniPage = () => {
  const [quantities, setQuantities] = useState(biryaniItems.map(() => 1));
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

  const filteredBiryanis = biryaniItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="biryani-page">
      <h2>Biryani Menu</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for biryanis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredBiryanis.length > 0 ? (
          filteredBiryanis.map((item, index) => (
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
            <p>No biryanis match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiryaniPage;