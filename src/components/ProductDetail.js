import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './productDetail.css'; // Ensure you create this CSS file for styling

const ProductDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get(`http://localhost/api/get_service_detail.php?id=${id}`); // Adjust this API
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service detail:', error);
      }
    };
    fetchServiceDetail();
  }, [id]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{service.service_name}</h2>
      <img src={`http://localhost/api/${service.images || 'placeholder.jpg'}`} alt={service.service_name} />
      <p>{service.description}</p>
      <p>Category: {service.category}</p>
      <p>Price: {service.price} THB</p>
    </div>
  );
};

export default ProductDetail;
