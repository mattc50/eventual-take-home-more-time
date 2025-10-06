import { formatAsCurrency } from "../../utils/formatAsCurrency";
import { getRenewalDates } from "../../utils/getRenewalDates";
import type { PremiumLock } from "../../App";

type InfoBarProps = {
  premiumLock: PremiumLock | null,
}

const InfoBar = ({ premiumLock }: InfoBarProps) => {
  const getNextRenewal = () => {
    const dates = getRenewalDates(premiumLock);
    const key = `renewal_${premiumLock?.active_year}_date` as keyof typeof premiumLock;
    const activeDate = new Date(`${premiumLock?.[key] ?? ""}T00:00`);

    let nextDate = null;
    if (activeDate) {
      for (const date of dates) {
        const d = new Date(date);
        if (activeDate < d) {
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

  const getEndYear = (date: string) => (
    new Date(date).getFullYear() + 3
  )

  return (
    <div className="card">
      <div className="display-data-container">
        <div className="display-data">
          <p className="display-label">Insurance Premiums Prediction</p>
          <p className="display-value">
            <span className="prediction-value">
              {premiumLock ? formatAsCurrency(premiumLock?.premium_prediction) : "---"}
            </span>
            {/* double-check if this is the right implementation */}
            {premiumLock?.renewal_1_date && ` in ${getEndYear(premiumLock?.renewal_1_date)}`}
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