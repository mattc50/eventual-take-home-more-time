import { useEffect, useState } from "react";
import { formatAsCurrency } from "../../utils/formatAsCurrency";

const ReimbursementComponent = ({ premiumLock }) => {
  const [reimbursement, setReimbursement] = useState(0.00)

  useEffect(() => {
    if (premiumLock) setReimbursement(premiumLock?.reimbursement_to_date)
  }, [premiumLock?.reimbursement_to_date])

  const DisplayNumber = ({ target, addDollar }) => {
    console.log(target);
    return (
      <span
        className="display-number-container"
        style={{
          transform: `translateY(calc(-${target} * 40px))`
        }}
      >
        <span className="display-number">0</span>
        <span className="display-number">1</span>
        <span className="display-number">2</span>
        <span className="display-number">3</span>
        <span className="display-number">4</span>
        <span className="display-number">6</span>
        <span className="display-number">7</span>
        <span className="display-number">8</span>
        <span className="display-number">9</span>
      </span>
    )

    // Slide up if the digit (in the same spot) is changing to a
    // greater value
  }

  const ReimbursementDisplay = ({ val }) => {
    console.log(val);
    const valStr = val.toString();
    const digits = valStr.length;
    return (
      Array.from({ length: digits }).map((_, index) => (
        <DisplayNumber addDollar={index === 0} target={parseInt(valStr[index])} />
      ))
    )
  }

  return (
    <div className="card large-padding">
      <p className="card-title">Premium Lock Reimbursement</p>
      <div className="reimbursement-text">
        <p className="large-text display">
          <ReimbursementDisplay val={reimbursement} />
        </p>
        <p className="small-text prediction">{premiumLock ? formatAsCurrency(premiumLock?.premium_prediction): "$0.00"}</p>
      </div>
      <div className="reimbursement-bar">
        <div className="reimbursement-fill" style={{
          width: premiumLock ? (premiumLock.reimbursement_to_date / premiumLock.max_reimbursement) * 100 : 0
        }}></div>
      </div>
      <button onClick={() => {
        if(reimbursement === 1000) setReimbursement(premiumLock?.reimbursement_to_date);
        else setReimbursement(1000);
      }}>Press</button>
    </div>
  )
}

export default ReimbursementComponent;