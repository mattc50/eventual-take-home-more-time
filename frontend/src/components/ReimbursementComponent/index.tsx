import { useEffect, useRef, useState } from "react";
import { formatAsCurrency } from "../../utils/formatAsCurrency";

const DisplayNumber = ({ target }) => {
  const prevRef = useRef(target);
  const [direction, setDirection] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayValue, setDisplayValue] = useState(target);
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    const prevTarget = prevRef.current;
    if (target === prevTarget) return;

    const DURATION = 200;
    const HALF = DURATION / 2;

    setIsTransitioning(true);
    setDirection(target > prevTarget ? 0 : -2);
    setBlurAmount(12);

    const halfway = setTimeout(() => {
      setDisplayValue(target);
      setBlurAmount(0);
    }, HALF);

    const end = setTimeout(() => {
      setIsTransitioning(false);
      setDirection(-1);
      prevRef.current = target;
    }, DURATION);

    return () => {
      clearTimeout(halfway);
      clearTimeout(end);
    };
  }, [target]);

  return (
    <span
      className="display-number-container"
      style={{
        transform: `translateY(${direction * 40}px) scale(${
          direction > -1 ? "0.8" : direction === -1 ? "1" : "1.2"
        })`,
        transition: isTransitioning
          ? "transform 0.4s ease, filter 0.4s ease"
          : "none",
        filter: `blur(${blurAmount}px)`,
      }}
    >
      <span className="large-text display-number">{displayValue}</span>
      <span className="large-text display-number">{displayValue}</span>
      <span className="large-text display-number">{displayValue}</span>
    </span>
  );
};

const SlidingDigit = ({ children, entering, exiting }) => {
  const [isMounted, setIsMounted] = useState(true);

  // Unmount after exit animation
  useEffect(() => {
    if (exiting) {
      const timeout = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [exiting]);

  if (!isMounted) return null;

  return (
    <span
      className={`sliding-digit ${entering ? "entering" : ""} ${
        exiting ? "exiting" : ""
      }`}
      style={{
        display: "inline-block",
        transform: entering
          ? "translateY(-100%)"
          : exiting
          ? "translateY(100%)"
          : "translateY(0)",
        transition: "transform 0.3s ease",
      }}
    >
      {children}
    </span>
  );
};

const ReimbursementComponent = ({ premiumLock }) => {
  const [reimbursement, setReimbursement] = useState(0.0);
  const prevDigitsRef = useRef<string[]>([]);

  useEffect(() => {
    if (premiumLock && reimbursement !== premiumLock.reimbursement_to_date) {
      setReimbursement(premiumLock.reimbursement_to_date);
    }
  }, [premiumLock?.reimbursement_to_date]);

  const valStr = reimbursement.toFixed(2);
  const digits = valStr.split("");

  const prevDigits = prevDigitsRef.current;

  // Compare previous and current digits to detect entering/exiting
  const renderDigits = digits.map((char, index) => {
    if (char === ".") return <span key={`decimal-${index}`}>.</span>;

    const prevChar = prevDigits[index];
    const entering = !prevChar && prevDigits.length < digits.length;
    const exiting = prevChar && !digits[index];

    return (
      <SlidingDigit
        key={index}
        entering={entering}
        exiting={exiting}
      >
        <DisplayNumber target={parseInt(char)} />
      </SlidingDigit>
    );
  });

  // Update previous digits after render
  useEffect(() => {
    prevDigitsRef.current = digits;
  }, [valStr]);

  return (
    <div className="card large-padding">
      <p className="card-title">Premium Lock Reimbursement</p>
      <div className="reimbursement-text">
        <div className="large-text-container">
          <p className="large-text display-number">$</p>
          {renderDigits}
        </div>
        <p className="small-text prediction">
          {premiumLock
            ? formatAsCurrency(premiumLock?.premium_prediction)
            : "$0.00"}
        </p>
      </div>
      <div className="reimbursement-bar">
        <div
          className="reimbursement-fill"
          style={{
            width: premiumLock
              ? (premiumLock.reimbursement_to_date /
                  premiumLock.max_reimbursement) *
                100
              : 0,
          }}
        ></div>
      </div>
      <button
        onClick={() => {
          if (reimbursement === 1100.27)
            setReimbursement(premiumLock?.reimbursement_to_date);
          else setReimbursement(1100.27);
        }}
      >
        Press
      </button>
    </div>
  );
};

export default ReimbursementComponent;
