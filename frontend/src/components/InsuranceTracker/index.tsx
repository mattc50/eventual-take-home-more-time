const PremiumsTracker = () => {
  return (
    <div className="card">
      <p className="card-title">
        Insurance Tracker
      </p>
      <div className="bars-container">
        <div className="bar-container">
          <div className="bar" style={{height: "25%"}}>
          </div>
          <p className="bar-label">Origination</p>
        </div>
        <div className="bar-container">
          <div className="bar" style={{height: "40%"}}>
          </div>
          <p className="bar-label">Year 1</p>
        </div>
        <div className="bar-container">
          <div className="bar" style={{height: "50%"}}>
          </div>
          <p className="bar-label">Year 2</p>
        </div>
        <div className="bar-container">
          <div className="bar bar-null" style={{}}>
          </div>
          <p className="bar-label">Year 3</p>
        </div>
      </div>

    </div>
  )
}

export default PremiumsTracker;