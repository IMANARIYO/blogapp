import React, { createContext, useContext, useEffect, useState } from "react";

// import { apiMultipartPromise, apiPromise } from "./a
// src/ApiProvider.js

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [api, setApi] = useState(null);
  const [apiMultipart, setApiMultipart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApi = async () => {
      try {
        const apiInstance = await apiPromise;
        const apiMultipartInstance = await apiMultipartPromise;
        setApi(apiInstance);
        setApiMultipart(apiMultipartInstance);
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize API', error);
        setLoading(false);
      }
    };

    initializeApi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ApiContext.Provider value={{ api, apiMultipart }}>
      {children}
    </ApiContext.Provider>
  );
};
