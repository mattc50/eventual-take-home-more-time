import { useEffect, useRef, useState } from "react";
import { formatAsCurrency } from "../../utils/formatAsCurrency";
import type { PremiumLock } from "../../App";

type PremiumsTrackerProps = {
  premiumLock: PremiumLock | null
}
type BarProps = {
  premium: number | undefined,
  label: string,
  pastThreshold: boolean,
  active: boolean,
  index: number
}

const PremiumsTracker = ({ premiumLock }: PremiumsTrackerProps) => {
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
    const premiums: number[] = [];
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

  const getBarHeight = (premium: number) => {
    const maxPremium = getMaxPremium();
    const height = (premium / maxPremium) * MAX_BAR_HEIGHT;
    return height;
  }

  const getLinePosition = () => {
    const maxPremium = getMaxPremium();
    const y = premiumLock ? ((premiumLock?.premium_prediction / maxPremium) * MAX_BAR_HEIGHT) + 36 : 268;
    return y;
  }

  const Bar = ({ premium, label, pastThreshold, active, index }: BarProps) => {
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const rectRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if(rectRef.current) {
        const rect = rectRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setTooltipPos({ x, y });
      }
    };


    useEffect(() => {
      setMounted(true); // triggers re-render
    }, []);

    return (
      <div className="bar-container">
        <div
          ref={rectRef}
          className={`bar${pastThreshold ? " past-threshold" : ""}`}
          style={{
            height: mounted ? `${premium !== undefined ? getBarHeight(premium) : 0}px` : "0px",
            transitionDelay: `calc(${index} * 0.1s)`
          }}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onMouseMove={handleMouseMove}
        >
        </div>
        {premium && visible && (
          <div
            className="tooltip"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
            }}
          >
            <p className="small-text">{label}</p>
            <p className={`tooltip-value${pastThreshold || active ? " tooltip-active" : ""}`}>{formatAsCurrency(premium)}</p>
          </div>
        )}
        {!premium && <div className="bar bar-null"></div>}
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
            key={index}
            index={index}
            premium={bar.premium}
            label={bar.label}
            pastThreshold={premiumLock ? (bar.premium ?? 0) >= (premiumLock.max_reimbursement ?? 0) : false}
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