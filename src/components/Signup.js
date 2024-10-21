import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const user = { name, email, password };

    try {
      const response = await axios.post("http://localhost/api/register.php", user);
      alert(response.data.message);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
    
    <h4>Sign Up</h4>
  
    <form onSubmit={register} className="form-control">
        <div className="mb-2">
            <label>
                Enter Name
            </label>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className="form-control" required/>
        </div>
     <div className="mb-2">
        <label>Enter Email</label>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="form-control" required/>
     </div>
     <div className="mb-2">
        <label>Set Password</label>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="form-control" required/>
     </div>
     
      <button type="submit" className="btn btn-primary">Register</button>
    </form>

    </>
  );
};

export default Register;
