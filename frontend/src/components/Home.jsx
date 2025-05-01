import { useState, useContext } from 'react';
import { CartContext } from './CartContext';

const foodItems = [
  { id: 1, name: "Fresh Pizza", price: 12.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop" },
  { id: 2, name: "Cake", price: 8.99, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2R8ZW58MHx8MHx8fDA%3D" },
  { id: 3, name: "pancake", price: 10.99, image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D" },
  { id: 4, name: "Kebab", price: 15.99, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 5, name: "Pasta Carbonara", price: 13.99, image: "https://media.istockphoto.com/id/1581084025/photo/plate-with-spaghetti-carbonara-on-a-laid-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=jltdMvmObL0P3WhAr36EBm4MC0agmJPEwd7sAEfwNF4=" },
  { id: 6, name: "Fish & Chips", price: 11.99, image: "https://images.unsplash.com/photo-1576777647209-e8733d7b851d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RmlzaCUyMCUyNiUyMENoaXBzfGVufDB8fDB8fHww" },
  { id: 7, name: "Chicken Briyani", price: 12.99, image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biriyani.webp?a=1&b=1&s=612x612&w=0&k=20&c=a8j_p9BkWtsSX7WkcqeetigH8PYWXGayIGto9GiehNY=" },
  { id: 8, name: "Ice Cream", price: 8.99, image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww" },
  { id: 9, name: "Chicken Salad", price: 10.99, image: "https://media.istockphoto.com/id/169986941/photo/chicken-salad.webp?a=1&b=1&s=612x612&w=0&k=20&c=87GlI56blQdgfEzBxfl2SmVIKZAuz5G1-rJcXnfnmGw=" },
  { id: 10, name: "Ramen", price: 15.99, image: "https://plus.unsplash.com/premium_photo-1664475934279-2631a25c42ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFtZW58ZW58MHx8MHx8fDA%3D" },
  { id: 11, name: "Burger", price: 13.99, image: "https://media.istockphoto.com/id/511484502/photo/double-cheese-and-bacon-cheeseburger.webp?a=1&b=1&s=612x612&w=0&k=20&c=Us0joN2d51ced9vo3zcDjJLID_p_INwtS2rTa-SLWZQ=" },
  { id: 12, name: "Souse", price: 11.99, image: "https://media.istockphoto.com/id/846972992/photo/grilled-salmon-steak-with-spinach-mash-potato-souse.webp?a=1&b=1&s=612x612&w=0&k=20&c=c76yY7VOMORpJk2e1j0B2Z7-zlDS6rHqy26IAw_IJDM=" }
];

const Home = () => {
  const [quantities, setQuantities] = useState(foodItems.map(() => 1));
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

  // Filter food items based on search term
  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for food items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
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
            <p>The item was not available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;