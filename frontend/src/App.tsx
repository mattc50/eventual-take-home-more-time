import { useEffect, useState } from 'react'
import './App.css'
import InfoBar from './components/InfoBar'
import AddressBar from './components/AddressBar'
import ReimbursementComponent from './components/ReimbursementComponent';
import PremiumsTracker from './components/InsuranceTracker';

function App() {
  console.log('render');
  const API_URL = "http://127.0.0.1:8000"

  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [propertyData, setPropertyData] = useState({
    premiumLock: null,
    reimbursementHistory: null,
    renewalDates: null,
  })

  const fetchProperties = async () => {
    const res = await fetch(`${API_URL}/properties`);
    return res.json();
  };

  const fetchPropertyPremiumLock = async (id) => {
    const res = await fetch(`${API_URL}/properties/${id}/premium-lock`);
    return res.json();
  };

  const fetchPropertyReimbursementHistory = async (id) => {
    const res = await fetch(`${API_URL}/properties/${id}/reimbursement-history`);
    return res.json();
  };

  const fetchPropertyRenewalDates = async (id) => {
    const res = await fetch(`${API_URL}/properties/${id}/renewal-dates`);
    return res.json();
  };
  
  useEffect(() => {
    fetchProperties()
      .then((data) => {
        setProperties(data);
        if(data.length > 0) setSelectedPropertyId(data[1].id);
      })
      .catch(console.error)
  }, []);

  useEffect(() => {
    if (!selectedPropertyId) return;

    Promise.all([
      fetchPropertyPremiumLock(selectedPropertyId),
      fetchPropertyReimbursementHistory(selectedPropertyId),
      fetchPropertyRenewalDates(selectedPropertyId)
    ])
        .then(([premiumLock, reimbursementHistory, renewalDates]) => {
      setPropertyData({ premiumLock, reimbursementHistory, renewalDates });
    })
        .catch(console.error)
  }, [selectedPropertyId]);


  return (
    <div className="dashboard-content">
      <div className="top-nav">
        <h1 className="dashboard-h1">Homeowners Dashboard</h1>
        <AddressBar properties={properties} />
      </div>
      <InfoBar premiumLock={propertyData.premiumLock}/>
      <ReimbursementComponent premiumLock={propertyData.premiumLock}/>
      <PremiumsTracker
        premiumLock={propertyData.premiumLock}
        history={propertyData.reimbursementHistory}
      />
    </div>
  )
}

export default App
