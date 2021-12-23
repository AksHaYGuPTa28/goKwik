import React, { useState, useEffect } from "react";
import "./main.css";
import { useNavigate } from "react-router-dom";
import { IoLogOut, IoCloseCircleSharp } from "react-icons/io5";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { auth } from "../../firebaseConfig";
import Modal from "react-modal";
import db from "../../firebaseConfig";
import Stars from "../../reusable/stars/stars";
import MaleAvatar from "../../assets/maleAvatar.png";
import FemaleAvatar from "../../assets/femaleAvatar.png";

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

export default function Main() {
  /* states and functions for modals starts here*/
  const navigate = useNavigate();
  const [createEmployee, setCreateEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(false);

  function createNewEmployee() {
    setCreateEmployee(true);
  }
  function newEmployeeClose() {
    setCreateEmployee(false);
  }

  function editNewEmployee() {
    setCreateEmployee(true);
  }
  function editEmployeeClose() {
    setEditEmployee(false);
  }

  function deleteNewEmployee() {
    setDeleteEmployee(true);
  }
  function deleteEmployeeClose() {
    setDeleteEmployee(false);
  }

  /* states and functions for modals ends here*/

  /* states and functions for CRUD starts here*/
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeGender, setEmployeeGender] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState("");
  const [employeeCountry, setEmployeeCountry] = useState("");
  const [employeeRating, setEmployeeRating] = useState("");

  const [UemployeeName, setUEmployeeName] = useState("");
  const [UemployeeId, setUEmployeeId] = useState("");
  const [UemployeeGender, setUEmployeeGender] = useState("");
  const [UemployeeDesignation, setUEmployeeDesignation] = useState("");
  const [UemployeeDepartment, setUEmployeeDepartment] = useState("");
  const [UemployeePhoneNumber, setUEmployeePhoneNumber] = useState("");
  const [UemployeeCountry, setUEmployeeCountry] = useState("");
  const [UemployeeRating, setUEmployeeRating] = useState("");

  const [employeesData, setEmployeesData] = useState([]);
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");

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
  }, []);

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

  const deleteData = (id) => {
    db.collection("employeeData").doc(id).delete();
  };
  /* states and functions for CRUD ends here*/

  return (
    <div className="main-container">
      <div className="main-left">
        <IoLogOut onClick={() => auth.signOut()} size={48} color="white" />
      </div>
      <div className="main-right">
        <div className="mobile-view-logout">
        <IoLogOut  className="mobile-view-logout-button" onClick={() => auth.signOut()} size={48} color="white" />
          <button onClick={createNewEmployee} className="add-button">
            <BsFillPlusCircleFill /> Add New Employee
          </button>
          <Modal
            isOpen={createEmployee}
            onRequestClose={newEmployeeClose}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <button className="close-button" onClick={newEmployeeClose}>
              <IoCloseCircleSharp size={36} />
            </button>

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
              <button
                className="create-form-submit"
                onClick={submit}
                id="submitBtn"
              >
                Submit
              </button>
            </form>
          </Modal>
        </div>
        {employeesData?.map(({ id, data }) => (
          <div className="employee-cards">
            <div key={id} className="card-main">
              <div className="action-icons">
                <div>
                  <AiFillEdit
                    onClick={() => {
                      setEditEmployee(true);
                      setDataIdToBeUpdated(id);
                      setUEmployeeName(data.employeeName);
                      setUEmployeeId(data.employeeId);
                      setUEmployeeGender(data.employeeGender);
                      setUEmployeeDesignation(data.employeeDesignation);
                      setUEmployeeDepartment(data.employeeDepartment);
                      setUEmployeePhoneNumber(data.employeePhoneNumber);
                      setUEmployeeCountry(data.employeeCountry);
                      setUEmployeeRating(data.employeeRating);
                    }}
                    size={36}
                    color="white"
                  />
                  <Modal
                    isOpen={editEmployee}
                    onRequestClose={editEmployeeClose}
                    contentLabel="Example Modal"
                    style={customStyles}
                  >
                    <button
                      className="close-button"
                      onClick={editEmployeeClose}
                    >
                      <IoCloseCircleSharp size={36} />
                    </button>
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
                        onChange={(e) =>
                          setUEmployeeDesignation(e.target.value)
                        }
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
                        onChange={(e) =>
                          setUEmployeePhoneNumber(e.target.value)
                        }
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
                  </Modal>
                </div>
                <AiFillDelete
                  onClick={() => {
                    deleteData(id);
                  }}
                  size={36}
                  color="white"
                />
              </div>
              <div className="card-top">
                <img
                  className="avatar-image"
                  src={data.gender === "Male" ? MaleAvatar : FemaleAvatar}
                  alt="avatar"
                />
                <div className="card-top-text-block">
                  <h1 className="card-name">{data.name}</h1>
                  <h1 className="card-designation">{data.department}</h1>
                </div>
              </div>
              <div className="card-bottom">
                <h1 className="card-bottom-text">Employee Id -{data.id} </h1>
                <h1 className="card-bottom-text">Gender - {data.gender}</h1>
                <h1 className="card-bottom-text">
                  Designation - {data.designation}
                </h1>
                <h1 className="card-bottom-text">
                  Phone Number - {data.phoneNumber}
                </h1>
                <h1 className="card-bottom-text">Country - {data.country}</h1>
                <Stars value={data.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
