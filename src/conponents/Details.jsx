// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// export const Details = () => {   
//     const para = useParams();
//     function GetStudent() {
//     fetch("http://localhost:5014/api/Students/" + para.id)
//         .then((res) => {
//           if (res.ok) {  console.log(res.data);  
//             return res.json();   }
//           throw new Error("error");
//         }).then((data) => { setStudent(data);  SetAddress();   });
//     }  
//     const SetAddress = () => { setStudent((prev) => ({ ...prev,
//         addresses: prev.addresses.map((address) => ({ ...address, id: 0 })),
//       }));
//     };  
//     useEffect(() => { GetStudent();  }, []);
//     const [student, setStudent] = useState({
//         name: "",   admissionDate: "",
//         isActive: false,   imageUrl: "",    addresses: [],
//       });
//       const [newAddress, setnewAddress] = useState({
//         city: "",     street: "", });      
//   return ( <>
//     <div className="container">
//         <form>
//           <div className="row">
//             <div className="col-md-6">
//               <h4>Student Details</h4>
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input type="text"   className="form-control"
//                   id="name"  value={student.name}  />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="admissionDate">Admission Date</label>
//                 <input    type="text"   className="form-control"
//                 id="admissionDate" value={student.admissionDate.toString("dd-MM-yyyy")} />
//               </div>
//               <div className="form-check">
//                 <input    className="form-check-input"  type="checkbox"   id="IsActive"
//                   name="isActive" value={student.isActive}  defaultChecked />
//                 <label htmlFor="isActive" className="form-check-label">Active?</label>
//               </div>
//               <div className="form-control-file my-2">
//                 <label htmlFor="formFile" className="form-label"></label>
//                 <input className="form-control"     type="file"
//                   id="formFile"      accept="image/*"  /> </div>
//                 <div className="form-group"> <br />
//         <a className="btn btn-secondary" href="/list">Back To Student List</a>
//               </div>
//             </div>
//             <div className="col-md-6"><h4>Student Address</h4>              
//               {student.addresses.length > 0 ? (
//                 <div>
//                   <table className="table table-bordered table-striped">
//                     <thead><tr>
//                   <th>Sl.</th><th>Street</th> <th>City</th></tr>
//                     </thead>
//                     <tbody>
//                       {student.addresses.map((a, j) => {
//                         return (
//                           <tr key={j}> <td>{j + 1}</td>
//                             <td>{a.city}</td> <td>{a.street}</td>                           
//                           </tr>  );
//                       })}
//                     </tbody>  </table>  </div> ) : ( <p>Add Address</p> )}
//             </div> </div> </form> </div> </>)
// }
