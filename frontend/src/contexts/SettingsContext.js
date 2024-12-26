import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [did, setDid] = useState('');
  const [keys, setKeys] = useState({ publicKey: '', privateKey: '' });

  const updateDid = (newDid, keyPair) => {
    setDid(newDid);
    setKeys(keyPair);
  };

  return (
    <SettingsContext.Provider value={{ did, keys, updateDid }}>
      {children}
    </SettingsContext.Provider>
  );
};
