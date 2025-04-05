import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/Constant";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    photoUrl: "https://p.kindpng.com/picc/s/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
    about: "This is Default About of the user!",
    skills: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/signup", 
        formData,
        { withCredentials: true }
      );
      
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "An error occurred during signup");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>

          {/* First Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name*</legend>
            <input
              type="text"
              name="firstName"
              className="input"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              minLength={4}
              maxLength={30}
            />
          </fieldset>

          {/* Last Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              name="lastName"
              className="input"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </fieldset>

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email*</legend>
            <input
              type="email"
              name="emailId"
              className="input"
              placeholder="Enter Email"
              value={formData.emailId}
              onChange={handleChange}
              required
            />
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password*</legend>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </fieldset>

          {/* Age */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              name="age"
              className="input"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleChange}
              min="18"
            />
          </fieldset>

          {/* Gender */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select 
              name="gender" 
              className="select select-bordered w-full"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </fieldset>

          {/* Photo URL */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="url"
              name="photoUrl"
              className="input"
              placeholder="Enter Photo URL"
              value={formData.photoUrl}
              onChange={handleChange}
            />
          </fieldset>

          {/* About */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              name="about"
              className="textarea"
              placeholder="Tell us about yourself"
              value={formData.about}
              onChange={handleChange}
            />
          </fieldset>

          {/* Skills */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Skills (comma separated)</legend>
            <input
              type="text"
              name="skills"
              className="input"
              placeholder="e.g., JavaScript, React, Node"
              value={formData.skills}
              onChange={handleSkillsChange}
            />
          </fieldset>

          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-1">
            <button className="btn btn-primary" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;