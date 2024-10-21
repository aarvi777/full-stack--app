import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './dashboard.css';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sellType, setSellType] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  // Retrieve user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch services when the user is available
  useEffect(() => {
    if (user && user.id) {
      const fetchServices = async () => {
        try {
          const response = await axios.get(
            `http://localhost/api/get_services.php?user_id=${user.id}`
          );
          setServices(response.data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };
      fetchServices();
    }
  }, [user]);

  // Handle service submission
  const addService = async (e) => {
    e.preventDefault(); // Prevent form reload

    if (user && user.id) {
      // Log to track form submission data
      console.log("Submitting form data:", { serviceName, description, price, category, sellType, images });

      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("service_name", serviceName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("sell_type", sellType);

      // Log to track images upload
      console.log("Images being added:", images);

      for (let i = 0; i < images.length; i++) {
        formData.append("images[]", images[i]);
      }

      try {
        const response = await axios.post("http://localhost/api/add_service.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Service added successfully:", response.data);

        // Clear form fields after successful submission
        setServiceName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSellType("");
        setImages([]);

        // Refetch services
        const updatedServices = await axios.get(
          `http://localhost/api/get_services.php?user_id=${user.id}`
        );
        setServices(updatedServices.data);
      } catch (error) {
        console.error("Error adding service:", error);
      }
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    setImages(e.target.files);
  };

  // If user is not available, show loading
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
          <div className="row">
      <div className="col-lg-12">
        <h2>Welcome, {user.name}</h2>

        {/* Add new service form */}
        <form onSubmit={addService} encType="multipart/form-data" className="mb-4">
          <div className="mb-3">
            <label>Select Selling Option</label>
            <select
              className="form-control"
              value={sellType}
              onChange={(e) => setSellType(e.target.value)}
              required
            >
              <option value="">Product Type</option>
              <option>Sell Old Car</option>
              <option>Rent On Car</option>
              <option>Sell Plot</option>
              <option>Sell House</option>
              <option>Cloths</option>
              <option>Electronics Item</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              placeholder="Write Name what you want to sell?"
              value={serviceName}
              className="form-control"
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              placeholder="Service Description"
              value={description}
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Sell Price</label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Mobile Number</label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={category}
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Upload multiple images</label>
            <input
              type="file"
              className="form-control"
              multiple
              onChange={handleImageUpload}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>

        {/* Display user's services */}
        <h3>Your Product</h3>
        {services.length > 0 ? (
       <div className="service-grid">
       {services.map((service) => {
         // Split the images by comma if there are multiple
         const imageList = service.images ? service.images.split(',') : [];
     
         return (
           <div key={service.id} className="card product-card">
             <img
               src={`http://localhost/api/${imageList[0] || 'placeholder.jpg'}`}  // Display the first image or placeholder
               className="card-img-top"
               alt={service.service_name}
             />
             <div className="card-body">
               <h5 className="card-title">{service.service_name}</h5>
               <p className="card-text">{service.description}</p>
               <p className="card-text">{service.sell_type}</p>
               <p className="card-text">Contact Number: {service.category}</p>
               <p className="card-text">Price: {service.price} INR</p>
               <a href="#" className="btn btn-primary">View</a>
             </div>
           </div>
         );
       })}
     </div>
        ) : (
          <p>No services available. Please add a service.</p>
        )}
      </div>
    </div>
    </div>
   
  );
};

export default Dashboard;
