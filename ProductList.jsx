import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1ba6?w=300', cost: '$15' },
        { name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300', cost: '$12' },
        { name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300', cost: '$18' },
        { name: 'Boston Fern', image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300', cost: '$14' },
        { name: 'Rubber Plant', image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=300', cost: '$20' },
        { name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300', cost: '$10' },
      ],
    },
    {
      category: 'Aromatic Plants',
      plants: [
        { name: 'Lavender', image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300', cost: '$16' },
        { name: 'Rosemary', image: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=300', cost: '$11' },
        { name: 'Mint', image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300', cost: '$9' },
        { name: 'Lemon Balm', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300', cost: '$13' },
        { name: 'Eucalyptus', image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=300', cost: '$22' },
        { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=300', cost: '$19' },
      ],
    },
    {
      category: 'Low Light Plants',
      plants: [
        { name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300', cost: '$24' },
        { name: 'Cast Iron Plant', image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=300', cost: '$25' },
        { name: 'Pothos', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300', cost: '$12' },
        { name: 'Chinese Evergreen', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300', cost: '$21' },
        { name: 'Dracaena', image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=300', cost: '$17' },
        { name: 'Philodendron', image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=300', cost: '$15' },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      {/* Navbar common across Product & Cart pages */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setShowCart(false)}>Paradise Nursery</div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => window.location.reload()}>Home</button>
          <button className="nav-btn" onClick={() => setShowCart(false)}>Plants</button>
          <button className="nav-btn cart-btn" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-badge">{totalCartCount}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-list-container">
          {plantsArray.map((categoryGroup, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryGroup.category}</h2>
              <div className="plants-grid">
                {categoryGroup.plants.map((plant, plantIdx) => (
                  <div key={plantIdx} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-img" />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      disabled={addedNodes[plant.name] || cartItems.some((item) => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedNodes[plant.name] || cartItems.some((item) => item.name === plant.name)
                        ? 'Added'
                        : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
