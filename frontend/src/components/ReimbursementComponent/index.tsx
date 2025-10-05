import { formatAsCurrency } from "../../utils/formatAsCurrency";

const ReimbursementComponent = ({ premiumLock }) => {

  return (
    <div className="card">
      <p className="card-title">Premium Lock Reimbursement</p>
      <div className="reimbursement-text">
        <p className="large-text prediction">{premiumLock?.reimbursement_to_date}</p>
        <p className="small-text prediction">{premiumLock ? formatAsCurrency(premiumLock?.premium_prediction): "$0.00"}</p>
      </div>
      <div className="reimbursement-bar">
        <div className="reimbursement-fill" style={{
          width: premiumLock ? (premiumLock.reimbursement_to_date / premiumLock.max_reimbursement) * 100 : 0
        }}></div>
      </div>
    </div>
  )
}

export default ReimbursementComponent;