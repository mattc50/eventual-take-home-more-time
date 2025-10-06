import { useEffect, useRef, useState } from "react";
import type { Property } from "../../App";

type AddressBarProps = {
  properties: Property[],
  propertyId: string,
  setPropertyId: React.Dispatch<React.SetStateAction<string>>
}

const AddressBar = ({ properties, propertyId, setPropertyId }: AddressBarProps) => {
  const [open, setOpen] = useState(false)
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if(properties) {
      const property = properties.find((p) => p.id === propertyId)
      setProperty(property);
    }
  }, [properties, propertyId])

  const handleClickOutside = (e: MouseEvent) => {
  if (
    dropdownRef.current &&
    !dropdownRef.current.contains(e.target as Node) && // outside dropdown
    !(buttonRef.current && buttonRef.current.contains(e.target as Node)) // ignore button
  ) {
    setOpen(false);
  }
};

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div className="properties-container">
      <div
        ref={buttonRef}
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev)
        }}
        className="properties-dropdown-select"
      >
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.0789 0.614002C8.14326 -0.204667 6.74629 -0.204667 5.81065 0.614002L0.847455 4.95679C0.308908 5.42802 0 6.10877 0 6.82437V13.5184C0 14.889 1.11105 16 2.48159 16H4.13598C5.04968 16 5.79038 15.2593 5.79038 14.3456V11.864C5.79038 10.9504 6.53105 10.2096 7.44477 10.2096C8.35849 10.2096 9.09917 10.9504 9.09917 11.864V14.3456C9.09917 15.2593 9.83984 16 10.7536 16H12.408C13.7785 16 14.8895 14.889 14.8895 13.5184V6.82437C14.8895 6.10877 14.5807 5.42802 14.0421 4.95679L9.0789 0.614002Z" fill="#191919" />
        </svg>
        <p className="properties-text">
          {property ? `${property?.address}, ${property?.city}, ${property?.state}` : "---"}
        </p>
        <svg style={{transform: open ? "rotate(180deg)" : "none"}} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.889526 1.20711L4.18243 4.50001C4.57293 4.89051 5.20613 4.89051 5.59663 4.50001L8.88953 1.20711" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && (
        <div
          ref={dropdownRef}
          className="dropdown-container"
        >
          {properties.map((property, index) => (
            <div
              key={index}
              className="dropdown-item"
              tabIndex={0}
              onClick={() => {
                setOpen(false);
                setPropertyId(property.id);
              }}
            >
              <p className="properties-text">
                {`${property.address}, ${property.city}, ${property.state}`}
              </p>
            </div>
          ))}
          <button className="dropdown-button">See All Properties</button>
        </div>
      )}
    </div>
  )
}

export default AddressBar;