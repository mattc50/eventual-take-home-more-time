import { useEffect, useState } from 'react'
import './App.css'
import InfoBar from './components/InfoBar'
import AddressBar from './components/AddressBar'
import ReimbursementComponent from './components/ReimbursementComponent';
import PremiumsTracker from './components/PremiumsTracker';

export type Property = {
  id: string,
  address: string,
  city: string,
  state: string,
  zip_code: string,
  square_footage: number,
  year_built: number,
  property_type: string
}

export type PremiumLock = {
  property_id: string,
  origination_premium: number,
  year_1_premium: number,
  year_2_premium: number,
  year_3_premium: number,
  active_year: number,
  renewal_1_date: string,
  renewal_2_date: string,
  renewal_3_date: string,
  reimbursement_to_date: number,
  max_reimbursement: number,
  premium_prediction: number
}

type ReimbursementHistory = [
  {
    id: string,
    property_id: string,
    amount: number,
    date: string,
    description: string
  }
]

type RenewalDates = [
  {
    property_id: string,
    renewal_number: number,
    date: string,
    premium_amount: number,
    status: string
  }
]

type PropertyData = {
  premiumLock: PremiumLock | null,
  reimbursementHistory: ReimbursementHistory | null,
  renewalDates: RenewalDates | null,
}

function App() {
  const API_URL = "http://127.0.0.1:8000"

  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [propertyData, setPropertyData] = useState<PropertyData>({
    premiumLock: null,
    reimbursementHistory: null,
    renewalDates: null,
  })

  const fetchProperties = async () => {
    const res = await fetch(`${API_URL}/properties`);
    return res.json();
  };

  const fetchPropertyPremiumLock = async (id: string) => {
    const res = await fetch(`${API_URL}/properties/${id}/premium-lock`);
    return res.json();
  };

  const fetchPropertyReimbursementHistory = async (id: string) => {
    const res = await fetch(`${API_URL}/properties/${id}/reimbursement-history`);
    return res.json();
  };

  const fetchPropertyRenewalDates = async (id: string) => {
    const res = await fetch(`${API_URL}/properties/${id}/renewal-dates`);
    return res.json();
  };

  useEffect(() => {
    fetchProperties()
      .then((data) => {
        setProperties(data);
        if (data.length > 0 && selectedPropertyId === "") setSelectedPropertyId(data[0].id);
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
    <>
      <div className="top-nav">
        <h1 className="dashboard-h1">Homeowners Dashboard</h1>
        <AddressBar
          properties={properties}
          propertyId={selectedPropertyId}
          setPropertyId={setSelectedPropertyId}
        />
      </div>
      <div className="dashboard-content">
        <InfoBar premiumLock={propertyData.premiumLock} />
        <ReimbursementComponent premiumLock={propertyData.premiumLock} />
        <PremiumsTracker
          premiumLock={propertyData.premiumLock}
          />
      </div>
    </>
  )
}

export default App
