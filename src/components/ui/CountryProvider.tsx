import React, { createContext, useContext, useEffect, useState } from "react";

interface CountryContextType {
  country: string;
  setCountry: (country: string) => void;
}

const CountryContext = createContext<CountryContextType>({
  country: "srilanka",
  setCountry: () => {},
});

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountryState] = useState("srilanka");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCountry = localStorage.getItem("country");
      if (storedCountry) {
        setCountryState(storedCountry);
      } else {
        localStorage.setItem("country", "srilanka");
        setCountryState("srilanka");
      }
    }
  }, []);

  const setCountry = (country: string) => {
    setCountryState(country);
    if (typeof window !== "undefined") {
      localStorage.setItem("country", country);
    }
  };

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
