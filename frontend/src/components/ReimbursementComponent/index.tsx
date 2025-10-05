import { useEffect, useState } from "react";

const ReimbursementComponent = ({ property }) => {

  const API_URL = "https://take-home-backend-8bcf0f61c18e.herokuapp.com";

  const [propertyData, setPropertyData] = useState({})

  useEffect(() => {
    if(property) {
    fetch(`${API_URL}/properties/${property.id}/premium-lock`)
      .then(res => res.json())
      .then(data => {
        setPropertyData(data);
      });
    }
  }, [property])

  console.log(propertyData);

  return (
    <div className="card">
      <p className="card-title">Premium Lock Reimbursement</p>
      {/* <p>{propertyData?.reimbursement_to_date || "Hello"}</p> */}
      <div className="reimbursement-text">
        <p className="large-text prediction">$1,047.23</p>
        <p className="small-text prediction">$2,189</p>
      </div>
      <div className="reimbursement-bar">
        <div className="reimbursement-fill"></div>
      </div>
    </div>
  )
}

export default ReimbursementComponent;