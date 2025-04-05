import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

function EditProfile({ user }) {
  const { firstName, lastName, age, gender, photoUrl, about } = user;
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    age: age || "",
    gender: gender || "",
    photoUrl: photoUrl || "",
    about: about || "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.patch(baseUrl + "/profile/edit", formData, {
        withCredentials: true,
      });
      dispatch(addUser(response.data.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="flex justify-center">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            {/* firstName */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">firstName:</legend>
              <input
                type="text"
                name="firstName"
                className="input"
                placeholder="Enter firstname"
                value={formData.firstName}
                onChange={handleChange}
              />
            </fieldset>

            {/* lastName */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">LastName:</legend>
              <input
                type="text"
                name="lastName"
                className="input"
                placeholder="Enter lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </fieldset>

            {/* age */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age:</legend>
              <input
                type="text"
                name="age"
                className="input"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
              />
            </fieldset>

            {/* gender */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender:</legend>
              <select
                name="gender"
                value={formData.gender}
                className="select select-neutral"
                onChange={handleChange}
              >
                <option disabled={true} value="">
                  Gender
                </option>
                <option value={"male"}>male</option>
                <option value={"female"}>female</option>
                <option value={"other"}>other</option>
              </select>
            </fieldset>

            {/* photoUrl */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">PhotoUrl:</legend>
              <input
                type="text"
                name="photoUrl"
                className="input"
                placeholder="Enter photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
              />
            </fieldset>

            {/* about */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About:</legend>
              <input
                type="text"
                name="about"
                className="input"
                placeholder="Enter about"
                value={formData.about}
                onChange={handleChange}
              />
            </fieldset>

            {/* skills */}
            {/* <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills:</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </fieldset> */}

            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center mt-1">
              <button className="btn btn-primary" onClick={handleEditProfile}>
                Save profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* profile card */}
      <UserCard user={formData} />
      {/* toast */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>profile edit successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
