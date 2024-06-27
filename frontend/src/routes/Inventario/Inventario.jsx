import { useState, useEffect } from 'react';

const Inventario = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        // Fetch inventory data from API or database
        // and update the inventory state
        fetchInventoryData();
    }, []);

    const fetchInventoryData = async () => {
        try {
            // Make API request to fetch inventory data
            const response = await fetch('/api/inventory');
            const data = await response.json();

            // Update the inventory state with fetched data
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    return (
        <div>
            <h1>Inventory Management</h1>
            {/* Render inventory data */}
            {inventory.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
        </div>
    );
};

export default Inventario;