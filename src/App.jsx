import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Ensure this CSS file is included

const API_URL = "http://localhost:5000/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(API_URL);
    setItems(response.data);
  };

  const createItem = async () => {
    if (!newItem.name.trim() || !newItem.description.trim()) {
      alert('Please enter both name and description.'); // Alert if fields are empty
      return;
    }
    await axios.post(API_URL, newItem);
    setNewItem({ name: '', description: '' });
    fetchItems();
  };

  const updateItem = async (id) => {
    if (!editItem.name.trim() || !editItem.description.trim()) {
      alert('Please enter both name and description.'); // Alert if fields are empty
      return;
    }
    await axios.put(`${API_URL}/${id}`, editItem);
    setEditItem(null);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  return (
    <div className="container">
      <h1>CRUD APP</h1>

      {/* Create Item Section */}
      <div className="section">
        <h2>Create Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={createItem}>Add Item</button>
      </div>

      {/* Items List Section */}
      <div className="section">
        <h2>Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {editItem?.id === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editItem.name}
                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editItem.description}
                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  />
                  <button onClick={() => updateItem(item.id)}>Save</button>
                </div>
              ) : (
                <div style={{ flex: 1 }}>
                  <span>{item.name}: {item.description}</span>
                </div>
              )}
              <div className="button-container">
                <button className="edit-button" onClick={() => setEditItem(item)}>Edit</button>
                <button className="delete-button" onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
