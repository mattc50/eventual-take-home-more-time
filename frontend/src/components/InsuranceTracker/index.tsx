import { formatAsCurrency } from "../../utils/formatAsCurrency";

const PremiumsTracker = ({ premiumLock, history }) => {
  const MAX_BAR_HEIGHT = 300;

  const barInfo = [
    {
      premium: premiumLock?.origination_premium,
      label: "Origination"
    },
    {
      premium: premiumLock?.year_1_premium,
      label: "Year 1"
    },
    {
      premium: premiumLock?.year_2_premium,
      label: "Year 2"
    },
    {
      premium: premiumLock?.year_3_premium,
      label: "Year 3"
    },
  ]

  const getMaxPremium = () => {
    let premiums = [];
    if (premiumLock && premiumLock?.origination_premium)
      premiums.push(premiumLock?.origination_premium);
    if (premiumLock && premiumLock?.year_1_premium)
      premiums.push(premiumLock?.year_1_premium);
    if (premiumLock && premiumLock?.year_2_premium)
      premiums.push(premiumLock?.year_2_premium);
    if (premiumLock && premiumLock?.year_3_premium)
      premiums.push(premiumLock?.year_3_premium);
    if (premiumLock && premiumLock.max_reimbursement)
      premiums.push(premiumLock?.max_reimbursement);
    const maxPremium = premiums.sort((a, b) => a - b)[premiums.length - 1];
    return maxPremium;
  }

  const getBarHeight = (premium) => {
    const maxPremium = getMaxPremium();
    const height = (premium / maxPremium) * MAX_BAR_HEIGHT;
    return height;
  }

  const getLinePosition = () => {
    const maxPremium = getMaxPremium();
    const y = premiumLock ? (premiumLock?.premium_prediction / maxPremium) * MAX_BAR_HEIGHT : 232;
    return y;
  }

  const Bar = ({ premium, label, pastThreshold, active }) => {
    return (
      <div className="bar-container">
        {premium ? (
          <div
            className={`bar ${pastThreshold ? " past-threshold" : ""}`}
            style={{ height: getBarHeight(premium) }}
          >
          </div>
        ) : (
          <div className="bar bar-null"></div>
        )}
        <p className={`bar-label${active ? " active" : ""}`}>{label}</p>
      </div>
    )
  }

  return (
    <div className="card large-padding">
      <p className="card-title">
        Insurance Tracker
      </p>
      <div className="bars-container">
        {barInfo.map((bar, index) => (
          <Bar
            premium={bar.premium}
            label={bar.label}
            pastThreshold={premiumLock ? bar.premium >= premiumLock?.max_reimbursement : false}
            active={premiumLock ? index + 1 === premiumLock?.active_year : false}
          />
        ))}
        <div
          className="prediction-line-container"
          style={{ bottom: getLinePosition() }}
        >
          <div className="prediction-line">
            <div className="prediction-line-blend"></div>
            <p className="prediction-line-label">
              {premiumLock ? formatAsCurrency(premiumLock?.premium_prediction) : "$----"}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PremiumsTracker;