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
    console.log(`${premiumLock[`renewal_${premiumLock?.active_year}_date`]}T00:00`);
    const activeDate = new Date(`${premiumLock[`renewal_${premiumLock?.active_year}_date`]}T00:00`);
    console.log(activeDate);

    let nextDate = null;
    if (activeDate) {
      for(const date of dates) {
        const d = new Date(date);
        if(activeDate < d) {
          nextDate = date;
        } else {
          nextDate = activeDate;
        }
      }
    }

    return nextDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="card">
      <div className="display-data-container">
        <div className="display-data">
          <p className="display-label">Insurance Premiums Prediction</p>
          <p className="display-value">
            <span className="prediction-value">
              {premiumLock?.premium_prediction.toLocaleString(
                'en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              ) || "---"}
            </span>
          </p>
        </div>
        <div className="display-data">
          <p className="display-label">Next Insurance Renewal</p>
          <p className="display-value"><span>{premiumLock ? getNextRenewal() : "---"}</span></p>
        </div>
      </div>
    </div>
  )
}

export default InfoBar;