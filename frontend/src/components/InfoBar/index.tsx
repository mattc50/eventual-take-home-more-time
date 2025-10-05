const InfoBar = ({ premiumLock }) => {

  const getRenewalDates = () => {
    let dates = [];
    if(premiumLock?.renewal_1_date) dates.push(premiumLock.renewal_1_date);
    if(premiumLock?.renewal_2_date) dates.push(premiumLock.renewal_2_date);
    if(premiumLock?.renewal_3_date) dates.push(premiumLock.renewal_3_date);
    // console.log(dates);
    return dates;
  }

  const getNextRenewal = () => {
    const dates = getRenewalDates();
    console.log(premiumLock[`renewal_${premiumLock?.active_year}_date`]);
    const year = new Date(premiumLock[`renewal_${premiumLock?.active_year}_date`]);
    console.log(year);
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

  return (
    <div className="card">
      <div className="display-data-container">
        <div className="display-data">
          <p className="display-label">Insurance Premiums Prediction</p>
          {/* come back to this for the end date */}
          <p className="display-value"><span className="prediction-value">{premiumLock?.premium_prediction || "---"}</span></p>
        </div>
        <div className="display-data">
          <p className="display-label">Next Insurance Renewal</p>
          {/* come back to this for the end date */}
          <p className="display-value"><span>{premiumLock ? getNextRenewal() : "---"}</span></p>
        </div>
      </div>
    </div>
  )
}

export default InfoBar;