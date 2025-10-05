from fastapi import FastAPI
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data
properties = [
    {
      "id":"prop-001",
      "address":"123 Appleseed Drive",
      "city":"New York",
      "state":"NY",
      "zip_code":"10001",
      "square_footage":2500,
      "year_built":2015,
      "property_type":"single_family"
    },
    {
      "id":"prop-002",
      "address":"123 Plumcore Road",
      "city":"New York",
      "state":"NY",
      "zip_code":"10001",
      "square_footage":1500,
      "year_built":2020,
      "property_type":"multi_family"
    }
]

property_premium_lock: Dict[str, Dict[str, Any]] = {
  "prop-001": {
    "property_id":"prop-001",
    "origination_premium":1800.0,
    "year_1_premium":1950.0,
    "year_2_premium":None,
    "year_3_premium":None,
    "active_year":1,
    "renewal_1_date":"2025-01-12",
    "renewal_2_date":None,
    "renewal_3_date":None,
    "reimbursement_to_date":0.0,
    "max_reimbursement":2189.0,
    "premium_prediction":2189.0
  },
  "prop-002": {
    "property_id":"prop-002",
    "origination_premium":2100.0,
    "year_1_premium":2300.0,
    "year_2_premium":2500.0,
    "year_3_premium":None,
    "active_year":2,
    "renewal_1_date":"2024-06-15",
    "renewal_2_date":"2025-06-15",
    "renewal_3_date":None,
    "reimbursement_to_date":100.0,
    "max_reimbursement":2450.0,
    "premium_prediction":2400.0
  }
}

property_reimbursement_history: Dict[str, Dict[str, Any]] = {
  "prop-001": [],
  "prop-002": [
    {
      "id":"reimb-001",
      "property_id":"prop-002",
      "amount":100.0,
      "date":"2025-06-15",
      "description":"Year 2 premium reimbursement - Premium exceeded prediction by $100"
    }
  ]
}

property_renewal_dates: Dict[str, Dict[str, Any]] = {
  "prop-001": [
    {
      "property_id":"prop-001",
      "renewal_number":1,
      "date":"2025-01-12",
      "premium_amount":1950.0,
      "status":"completed"
    }
  ],
  "prop-002": [
    {
      "property_id":"prop-002",
      "renewal_number":1,
      "date":"2024-06-15",
      "premium_amount":2300.0,
      "status":"completed"
    },
    {
      "property_id":"prop-002",
      "renewal_number":2,
      "date":"2025-06-15",
      "premium_amount":2500.0,
      "status":"completed"
    }
  ]
}

@app.get("/properties")
def get_properties():
    return properties

@app.get("/properties/{property_id}/premium-lock")
def get_property_premium_lock(property_id: str):
    return property_premium_lock.get(property_id, {})

@app.get("/properties/{property_id}/reimbursement-history")
def get_property_reimbursement_history(property_id: str):
    return property_reimbursement_history.get(property_id, {})

@app.get("/properties/{property_id}/renewal-dates")
def get_property_renewal_dates(property_id: str):
    return property_renewal_dates.get(property_id, {})
