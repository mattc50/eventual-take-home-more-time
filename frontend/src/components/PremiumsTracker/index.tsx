import { useRef, useState } from "react";
import { formatAsCurrency } from "../../utils/formatAsCurrency";
import type { PremiumLock } from "../../App";

type PremiumsTrackerProps = {
  premiumLock: PremiumLock | null
}

type BarInfo = {
  premium: number | undefined;
  label: string;
};

const PremiumsTracker = ({ premiumLock }: PremiumsTrackerProps) => {
  const MAX_BAR_HEIGHT = 244;
  const barsContainerRef = useRef<HTMLDivElement>(null);

  const barInfo: BarInfo[] = [
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

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    label?: string;
    value?: number;
    active?: boolean;
    pastThreshold?: boolean;
  }>({ visible: false, x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    label: string,
    value: number,
    pastThreshold: boolean,
    active: boolean
  ) => {
    if (!barsContainerRef.current) return;
    const rect = barsContainerRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      label,
      value,
      pastThreshold,
      active
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="card large-padding">
      <p className="card-title">
        Insurance Tracker
      </p>
      <div className="bars-container" ref={barsContainerRef}>
        {barInfo.map((bar, index) => {
          const pastThreshold = premiumLock ? (bar.premium ?? 0) >= (premiumLock.max_reimbursement ?? 0) : false;
          const active = premiumLock ? index + 1 === premiumLock.active_year : false;

          return (
            <div key={index} className="bar-container">
              {bar.premium ? (
                <div
                  className={`bar${pastThreshold ? " past-threshold" : ""}`}
                  style={{
                    height: `${getBarHeight(bar.premium)}px`,
                    transitionDelay: `calc(${index} * 0.1s)`
                  }}
                  onMouseEnter={(e) =>
                    handleMouseMove(e, bar.label, bar.premium!, pastThreshold, active)
                  }
                  onMouseMove={(e) =>
                    handleMouseMove(e, bar.label, bar.premium!, pastThreshold, active)
                  }
                  onMouseLeave={handleMouseLeave}
                ></div>
              ) : (
                <div className="bar bar-null"></div>
              )}
              <p className={`bar-label${active ? " active" : ""}`}>{bar.label}</p>
            </div>
          );
        })}
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
        {tooltip.visible && tooltip.value !== undefined && (
          <div
            className="tooltip"
            style={{
              left: tooltip.x,
              top: tooltip.y,
            }}
          >
            <p className="small-text">{tooltip.label}</p>
            <p className={`tooltip-value${tooltip.pastThreshold || tooltip.active ? " tooltip-active" : ""}`}>
              {formatAsCurrency(tooltip.value)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PremiumsTracker;