import React, { createContext, useState, useContext } from 'react';

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);

  const addDonation = (donation) => {
    setDonations((prevDonations) => [...prevDonations, donation]);
  };

  return (
    <DonationContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonations = () => {
  return useContext(DonationContext);
};
