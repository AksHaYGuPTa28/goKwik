import React, { useState, useEffect } from "react";
import "./addParticipants.css";
import Modal from "react-modal";
import db from "../../firebaseConfig";
import { useHistory } from "react-router-dom";

import {
  IoLogOut,
  IoCloseCircleSharp,
  IoArrowBackOutline,
} from "react-icons/io5";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddParticipants = (openModal) => {
  const history = useHistory();
  const [createEmployee, setCreateEmployee] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeGender, setEmployeeGender] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState("");
  const [employeeCountry, setEmployeeCountry] = useState("");
  const [employeeRating, setEmployeeRating] = useState("");

  function closeView() {
    history.push("./");
  }
  const submit = (e) => {
    e.preventDefault();
    db.collection("employeeData").add({
      name: employeeName,
      id: employeeId,
      gender: employeeGender,
      designation: employeeDesignation,
      department: employeeDepartment,
      phoneNumber: employeePhoneNumber,
      country: employeeCountry,
      rating: employeeRating,
    });

    setEmployeeName("");
    setEmployeeId("");
    setEmployeeGender("");
    setEmployeeDesignation("");
    setEmployeeDepartment("");
    setEmployeePhoneNumber("");
    setEmployeeCountry("");
    setEmployeeRating("");
  };
  return (
    <div>
      <IoArrowBackOutline onClick={closeView} className="back-icon" size={36} />
      <form className="create-form">
        <h1>Add New employee here</h1>
        <input
          className="create-form-input"
          type="text"
          placeholder="Name"
          required="required"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <input
          className="create-form-input"
          type="number"
          placeholder="Employee Id"
          required="required"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <input
          className="create-form-input"
          type="text"
          placeholder="Gender"
          required="required"
          value={employeeGender}
          onChange={(e) => setEmployeeGender(e.target.value)}
        />
        <input
          className="create-form-input"
          type="text"
          placeholder="Designation"
          required="required"
          value={employeeDesignation}
          onChange={(e) => setEmployeeDesignation(e.target.value)}
        />
        <input
          className="create-form-input"
          type="text"
          placeholder="Department"
          required="required"
          value={employeeDepartment}
          onChange={(e) => setEmployeeDepartment(e.target.value)}
        />
        <input
          className="create-form-input"
          type="number"
          placeholder="Phone Number"
          required="required"
          value={employeePhoneNumber}
          onChange={(e) => setEmployeePhoneNumber(e.target.value)}
        />
        <input
          className="create-form-input"
          type="text"
          placeholder="Country"
          required="required"
          value={employeeCountry}
          onChange={(e) => setEmployeeCountry(e.target.value)}
        />
        <input
          className="create-form-input"
          type="number"
          placeholder="Rating"
          required="required"
          value={employeeRating}
          onChange={(e) => setEmployeeRating(e.target.value)}
        />
        <button className="create-form-submit" onClick={submit} id="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddParticipants;
