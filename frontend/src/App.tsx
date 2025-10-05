import { useEffect, useState } from 'react'
import './App.css'
import InfoBar from './components/InfoBar'
import AddressBar from './components/AddressBar'
import ReimbursementComponent from './components/ReimbursementComponent';
import PremiumsTracker from './components/InsuranceTracker';

function App() {
  // const API_URL = "https://take-home-backend-8bcf0f61c18e.herokuapp.com";

  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState({});

  // useEffect(() => {
  //   fetch(`${API_URL}/properties`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       setProperty(data[0]);
  //       setProperties(data);
  //     });
  // }, [])
  

  return (
    <div className="dashboard-content">
      <div className="top-nav">
        <h1>Homeowners Dashboard</h1>
        <AddressBar properties={properties} />
      </div>
      <InfoBar property={property}/>
      <ReimbursementComponent />
      <PremiumsTracker />
    </div>
  )
}

export default App
