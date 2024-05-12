import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentPets } from "../../../services/apiPet";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../services/useSlice";
import "./Pets.css";
import axios from "axios";
import { apiUrlPets } from "../../../services/config";
import Loading from "../../../Component/Loading/Loading";
const EditPet = () => {
  const { pid } = useParams();
  const accessToken = useSelector(selectAccessToken);
  const [petData, setPetData] = useState(null);
  const [breedName, setBreedName] = useState("");
  const [formData, setFormData] = useState({
    namePet: "",
    age: "",
    gender: "",
    description: "",
    price: "",
    deworming: "",
    vaccination: "",
    characteristic: "",
  });
  const Swal = require("sweetalert2");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await getCurrentPets(pid, accessToken);
        setPetData(res);
        setFormData({
          namePet: res.namePet,
          age: res.age,
          gender: res.gender,
          description: res.description,
          price: res.price,
          deworming: res.deworming,
          vaccination: res.vaccination,
          characteristic: res.characteristic,
        });
        setBreedName(res.petBreed.nameBreed);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };
    fetchPet();
  }, [pid, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const goBack = () => {
    window.location.replace("/dashboard#Pets");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrlPets}/${pid}`, formData);
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Data updated successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: ("Failed to update data:", response.statusText),
        });
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="edit-pet-container">
      <h2 className="edit-pet-title">Edit Pet</h2>
      <div className="pet-images">
        {petData?.imgPet &&
          petData.imgPet.map((image, index) => (
            <img key={index} src={image} alt="pet" className="pet-image" />
          ))}
      </div>

      {petData && (
        <form className="edit-form">
          <div className="edit_form_input">
            <div className="editInput">
              <div className="form-group">
                <label htmlFor="namePet">Name pet:</label>
                <input
                  type="text"
                  id="namePet"
                  name="namePet"
                  value={formData.namePet}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (VNĐ):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="editInput">
              <div className="form-group">
                <label htmlFor="Breed">Breed:</label>
                <input
                  type="text"
                  id="breed"
                  name="breedName"
                  value={breedName}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="deworming">Deworming (times):</label>
                <input
                  type="number"
                  id="deworming"
                  name="deworming"
                  value={formData.deworming}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vaccination">
                  Vaccination (doses of vaccine):
                </label>
                <input
                  type="number"
                  id="vaccination"
                  name="vaccination"
                  value={formData.vaccination}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="characteristic">Characteristic:</label>
                <input
                  type="text"
                  id="characteristic"
                  name="characteristic"
                  value={formData.characteristic}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </form>
      )}
      <div className="edit_btn">
        <button className="exit-btn" onClick={goBack}>
          Back
        </button>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="submit-btn"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPet;
