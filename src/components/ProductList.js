import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './productList.css'; // Ensure you create this CSS file for styling

const ProductList = () => {
  const [services, setServices] = useState([]);

  // Fetch all services when the component mounts
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await axios.get('http://localhost/api/get_all_services.php');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchAllServices();
  }, []);

  return (
    <div className='container'>
      <div className="row">
      <h2>All Services</h2>
      <div className="service-grid">
        {services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className="card product-card">
              <img
                src={`http://localhost/api/${service.images || 'placeholder.jpg'}`} // Set the correct path to your images
                className="card-img-top"
                alt={service.service_name}
              />
              <div className="card-body">
                <h5 className="card-title">{service.service_name}</h5>
                <p className="card-text">{service.description}</p>
                <p className="card-text">Category: {service.category}</p>
                <p className="card-text">Price: {service.price} THB</p>
                <Link to={`/product/${service.id}`} className="btn btn-primary">View Product</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No services available. Please check back later.</p>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default ProductList;
