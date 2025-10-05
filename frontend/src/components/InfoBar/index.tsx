import { useEffect, useState } from "react";

const InfoBar = ({ property }) => {
  // might want to make hook from API utils

  // const API_URL = "https://take-home-backend-8bcf0f61c18e.herokuapp.com";

  const [propertyData, setPropertyData] = useState({});

    // useEffect(() => {
    //   if(property) {
    //   fetch(`${API_URL}/properties/${property.id}/premium-lock`)
    //     .then(res => res.json())
    //     .then(data => {
    //       setPropertyData(data);
    //     });
    //   }
    // }, [property])

  const getRenewalDates = () => {
    let dates = [];
    if(propertyData.renewal_1_date) dates.push(propertyData.renewal_1_date);
    if(propertyData.renewal_2_date) dates.push(propertyData.renewal_2_date);
    if(propertyData.renewal_3_date) dates.push(propertyData.renewal_3_date);
    return dates;
  }

  const getNextRenewal = () => {
    const dates = getRenewalDates();
    const year = new Date(propertyData[`renewal_${propertyData?.active_year}_premium`]);
    if (year) {
      for(let date of dates) {
        const d = new Date(date);
        if(year < d) {
          return date;
        } else {
          return year.toString();
        }
      }
    }
  };

  return property && (
    <div className="card">
      <div className="display-data-container">
        <div className="display-data">
          <p className="display-label">Insurance Premiums Prediction</p>
          {/* come back to this for the end date */}
          <p className="display-value"><span className="prediction-value">{propertyData?.premium_prediction || "Hello"}</span></p>
        </div>
        <div className="display-data">
          <p className="display-label">Next Insurance Renewal</p>
          {/* come back to this for the end date */}
          <p className="display-value"><span>{getNextRenewal()}</span></p>
        </div>
      </div>
    </div>
  )
}

export default InfoBar;