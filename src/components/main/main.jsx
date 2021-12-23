import React, { useState, useEffect } from "react";
import "./main.css";
import { IoLogOut, IoCloseCircleSharp } from "react-icons/io5";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { auth } from "../../firebaseConfig";
import Modal from "react-modal";
import db from "../../firebaseConfig";
import Stars from "../../reusable/stars/stars";
import MaleAvatar from "../../assets/maleAvatar.png";
import FemaleAvatar from "../../assets/femaleAvatar.png";
import AddParticipants from "../addParticipants/addParticipants";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  /* states and functions for modals starts here*/
  const [editEmployee, setEditEmployee] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(false);

  function createNewEmployee() {
    history.push("/addParticipants");
  }
  function editNewEmployee(id) {
    history.push(`/editParticipants/${id}`);
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
          <IoLogOut
            className="mobile-view-logout-button"
            onClick={() => auth.signOut()}
            size={48}
            color="white"
          />
          <button onClick={createNewEmployee} className="add-button">
            <BsFillPlusCircleFill /> Add New Employee
          </button>
        </div>
        {employeesData?.map(({ id, data }) => (
          <div className="employee-cards">
            <div key={id} className="card-main">
              <div className="action-icons">
                <div>
                  <AiFillEdit
                    onClick={() => editNewEmployee(id)}
                    size={36}
                    color="white"
                  />
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
