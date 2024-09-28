import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
export const Create = () => {  

const navigate = useNavigate()

  const [student, setStudent] = useState({
    name: "",          admissionDate: '',
    isActive: false,    imageUrl: "",
    addresses: [],  });



  const [newAddress, setnewAddress] = useState({
    city: "",    street: "",  });



  const addAddress = () => {
     if (!newAddress.city || !newAddress.street) {
      alert("Please fill out all required fields.");
       return;   }


    setStudent({ ...student,
      addresses: [...student.addresses, newAddress],  });
    setnewAddress({  city: "",  street: "",  });
  };


  const [imageUrl, setImage] = useState(null);


  function handleUpload(e) {
    const file = e.target.files[0];
    setImage(file);  

   
    const reader = new FileReader();
    reader.onload = () => {
        console.log(reader.result);  
    };
    reader.readAsDataURL(file);
}



  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setnewAddress({  ...newAddress, [name] : value  });
  };
  const handleStudentChange = (e) => {
    setStudent({...student,
      [e.target.name]: e.target.value,  });
  };


  



  const createStudent = (e) => {
    e.preventDefault();    
    if (!student.name || student.addresses.some(p => !p.city || !p.street)) {
        alert("Please fill out all required fields.");
        return;
    }    

    const formData = new FormData();
    
    // Append student data
    formData.append("name", student.name);
    formData.append("admissionDate", student.admissionDate);
    formData.append("isActive", student.isActive);
    
    // Append addresses as a JSON string
    formData.append("AddressesJson", JSON.stringify(student.addresses));
    
    // Append image file if available
    if (imageUrl) {
        formData.append("image", imageUrl);
    }

    fetch('http://localhost:5014/api/Students', {
        method: "POST",
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('====================================');
      console.log(formData);
      console.log('====================================');
        console.log(data);
        alert("Student created successfully");
       // clearAll();
       navigate('/list')
    })
    .catch((error) => {
        alert("Error Occurred: " + error.message);
    });
};





  return (<>
      <div className="container">
        <form onSubmit={createStudent} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6"> <h4>Student Info</h4>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" onChange={handleStudentChange}
                  className="form-control" id="name" name="name"
                  value={student.name}/>
              </div>
              <div className="form-group">
                <label htmlFor="admissionDate">Admission Date</label>
                <input onChange={handleStudentChange} type="date" name="admissionDate"
                  className="form-control"  id="admissionDate"               
                  value={student.admissionDate.toString("dd-MM-yyyy")} />                
              </div>
              <div className="form-check">
                <input onChange={handleStudentChange}
                  className="form-check-input"   type="checkbox"  id="isActive"    
                  name="isActive" value={student.isActive} defaultChecked />
                <label htmlFor="isActive" className="form-check-label"> Active? </label>
              </div>
              <div className="form-control-file my-2">               
              <img src={imageUrl} width={80} height={50} className="img-fluid rounded-start " alt="..."/>
                <input className="form-control" type="file" id="formFile" name="imageUrl"
                onChange={handleUpload} /> </div>
              <div className="form-group">
              <button className="btn btn-success" type="submit">Create</button>
                &nbsp;&nbsp;<button type="button" className="btn btn-info">
                  Clear</button>
              </div>
              <div className="form-group"><br />
                <a className="btn btn-secondary" href="students">
                  Back To Student List</a></div>
            </div>
            <div className="col-md-6">
              <h4>Student Address</h4>
             <div className="form-group">
                <input  type="text" placeholder="Enter City"
                  className="form-control mb-2" id="city" name="city"
                value={newAddress.city} onChange={handleNewAddressChange}/>
                <input
                  type="text" placeholder="Enter Street"
                  className="form-control mb-2" id="street" name="street" 
                  value={newAddress.street} onChange={handleNewAddressChange} />
                <button onClick={addAddress} type="button" className="btn btn-secondary mb-2">
                  Add Address </button>
              </div>
              {student.addresses.length > 0 ? (
                <div>
                  <table className="table table-bordered table-striped">
                    <thead><tr> <th>Sl.</th>
                        <th>Street</th> <th>City</th></tr></thead>
                   <tbody>{student.addresses.map((a, j) => {
                        return ( <tr key={j}>
                            <td>{j + 1}</td>    <td>{a.city}</td>
                            <td>{a.street}</td>  <td>
                              <button className="btn btn-danger btn-sm"
                             onClick={() => delAddress(j)}> Delete </button></td>
                          </tr>);
                      })}
                    </tbody> </table> </div> ) : (<p>Add Address</p> )}
            </div> </div></form></div> </>
  );
  function delAddress(j){
    const updatep = student.addresses.filter((_, i)=> i !== j);
    setStudent({  ...student,   addresses : updatep })
};
};
