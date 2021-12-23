import React, { useState, useEffect } from "react";
import "./editParticipants.css";
import Modal from "react-modal";
import db from "../../firebaseConfig";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

const EditParticipants = () => {
  const history = useHistory();
  const [UemployeeName, setUEmployeeName] = useState("");
  const [UemployeeId, setUEmployeeId] = useState("");
  const [UemployeeGender, setUEmployeeGender] = useState("");
  const [UemployeeDesignation, setUEmployeeDesignation] = useState("");
  const [UemployeeDepartment, setUEmployeeDepartment] = useState("");
  const [UemployeePhoneNumber, setUEmployeePhoneNumber] = useState("");
  const [UemployeeCountry, setUEmployeeCountry] = useState("");
  const [UemployeeRating, setUEmployeeRating] = useState("");
  const { id } = useParams();

  const [employeesData, setEmployeesData] = useState([]);
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");

  function closeView() {
    history.goBack();
  }

  useEffect(() => {
    db.collection("employeeData").onSnapshot((snapshot) => {
      setEmployeesData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    console.log({ employeesData });
    const currentEmployee = employeesData.filter((x) => x.id === id);
    setUEmployeeName(currentEmployee[0]?.data.name);
    setUEmployeeId(currentEmployee[0]?.data.id);
    setUEmployeeGender(currentEmployee[0]?.data.gender);
    setUEmployeeDesignation(currentEmployee[0]?.data.designation);
    setUEmployeeDepartment(currentEmployee[0]?.data.department);
    setUEmployeePhoneNumber(currentEmployee[0]?.data.phoneNumber);
    setUEmployeeCountry(currentEmployee[0]?.data.country);
    setUEmployeeRating(currentEmployee[0]?.data.rating);
    setDataIdToBeUpdated("");
  }, []);

  function closeView() {
    history.push("./");
  }
  const updateData = (e) => {
    e.preventDefault();
    db.collection("employeeData").doc(dataIdToBeUpdated).update({
      name: UemployeeName,
      id: UemployeeId,
      gender: UemployeeGender,
      designation: UemployeeDesignation,
      department: UemployeeDepartment,
      phoneNumber: UemployeePhoneNumber,
      country: UemployeeCountry,
      rating: UemployeeRating,
    });

    setUEmployeeName("");
    setUEmployeeId("");
    setUEmployeeGender("");
    setUEmployeeDesignation("");
    setUEmployeeDepartment("");
    setUEmployeePhoneNumber("");
    setUEmployeeCountry("");
    setUEmployeeRating("");
    setDataIdToBeUpdated("");
  };

  return (
    <div>
      <Link to={"/"}>
        <IoArrowBackOutline className="back-icon" size={36} />
      </Link>
      <form className="create-form">
        <h1>Edit your employee here</h1>
        <input
          className="create-form-input"
          type="text"
          placeholder="Name"
          required="required"
          value={UemployeeName}
          onChange={(e) => setUEmployeeName(e.target.value)}
        />
        <input
          className="create-form-input"
          type="number"
          placeholder="Employee Id"
          required="required"
          value={UemployeeId}
          onChange={(e) => setUEmployeeId(e.target.value)}
        />
        <input
          className="create-form-input"
          type="text"
          placeholder="Gender"
          required="required"
          value={UemployeeGender}
          onChange={(e) => setUEmployeeGender(e.target.value)}
        />
        <input
          className="create-form-input"
          type="text"
          placeholder="Designation"
          required="required"
          value={UemployeeDesignation}
          onChange={(e) => setUEmployeeDesignation(e.target.value)}
        />
        <input
          className="create-form-input"
          type="text"
          placeholder="Department"
          required="required"
          value={UemployeeDepartment}
          onChange={(e) => setUEmployeeDepartment(e.target.value)}
        />
        <input
          className="create-form-input"
          type="number"
          placeholder="Phone Number"
          required="required"
          value={UemployeePhoneNumber}
          onChange={(e) => setUEmployeePhoneNumber(e.target.value)}
        />
        <input
          className="create-form-input"
          type="text"
          placeholder="Country"
          required="required"
          value={UemployeeCountry}
          onChange={(e) => setUEmployeeCountry(e.target.value)}
        />
        <input
          className="create-form-input"
          type="number"
          placeholder="Rating"
          required="required"
          value={UemployeeRating}
          onChange={(e) => setUEmployeeRating(e.target.value)}
        />
        <button
          className="create-form-submit"
          onClick={updateData}
          id="submitBtn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default EditParticipants;
