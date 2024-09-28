import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
export const List = () => {
  const [student, setStudent] = useState([]);
  function GetStudents() {
    fetch("http://localhost:5014/api/Students")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("error");
      })
      .then((data) => {
        setStudent(data);
      });
  }
  useEffect(GetStudents, []);
  function deleteStudent(id, name) {
    const conf = confirm(`Do you want to delete ${name}`);
    if (conf) {
      console.log("di ", id);
      fetch("http://localhost:5014/api/Students/" + id, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Error Occured");
        }
        GetStudents();
        alert(`${name} Deleted Successfully`);
      });
    }
  }
  console.log("student", student);
  return (
    <>
      <h2>Student List</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Student Information</th>
          </tr>
        </thead>
        <tbody>
          {student.map((s, i) => {
            return (
              <>
                <tr key={i}>
                  <td>
                    <img
                      src={`http://localhost:5014/${s.imageUrl}`}
                      height={60}
                      width={60}
                    />
                    <br />
                    Name: {s.name} <br />
                    Admission: {s.admissionDate}
                    <br />
                    Active:{s.isActive ? "Yes" : "No"} <br />
                    Image: {s.imageUrl}
                    <h5>Address</h5>
                    {s.addresses.length > 0 ? (
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Id</th> <th>City</th>
                            <th>Street</th>
                          </tr>
                        </thead>
                        <tbody>
                          {s.addresses.map((a, j) => {
                            return (
                              <tr key={j}>
                                <td>{a.id}</td>
                                <td>{a.city}</td>
                                <td>{a.street}</td>
                              </tr>
                            );
                          })}
                        </tbody>{" "}
                      </table>
                    ) : (
                      <p> No student</p>
                    )}
                    <button className="btn  btn-dark">
                      <Link to={`/list/edit/${s.id}`}>Edit</Link>
                    </button>
                    <button className="btn  btn-info">
                      <Link to={`/list/details/${s.id}`}>Detail</Link>
                    </button>
                    <button
                      onClick={() => deleteStudent(s.id, s.name)}
                      className="btn  btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
