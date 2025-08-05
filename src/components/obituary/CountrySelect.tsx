import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

// Define types
interface CurrencyDetail {
  name: string;
  symbol: string;
}

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  currencies?: {
    [currencyCode: string]: CurrencyDetail;
  };
}

interface OptionType {
  value: string;
  label: string;
  flagUrl: string;
  currency: string;
}

interface CountrySelectProps {
  onChange?: (country: string, currency: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange }) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2,currencies")
      .then((res) => res.json())
      .then((data: Country[]) => {
        const formatted: OptionType[] = data
          .map((country) => {
            const currencyCode = country.currencies
              ? Object.keys(country.currencies)[0]
              : "Unknown";

            return {
              value: country.cca2,
              label: country.name.common,
              flagUrl: country.flags.png,
              currency: currencyCode,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));

        setOptions(formatted);
      })
      .catch((error) => {
        console.error("Failed to fetch countries:", error);
      });
  }, []);

  const handleChange = (selected: SingleValue<OptionType>) => {
    if (selected) {
      setSelectedOption(selected);
      onChange?.(selected.label, selected.currency);
    }
  };

  // Custom rendering for dropdown options
  const formatOptionLabel = (option: OptionType) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={option.flagUrl}
        alt={`${option.label} flag`}
        style={{ width: "20px", height: "15px", marginRight: "8px", objectFit: "cover" }}
      />
      <span>{option.label}</span>
    </div>
  );

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      <Select
        inputId="country-select"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        formatOptionLabel={formatOptionLabel}
        placeholder="Select a country..."
        isSearchable
      />

      {/* {selectedOption && (
        <div style={{ marginTop: "15px" }}>
          <img
            src={selectedOption.flagUrl}
            alt={`${selectedOption.label} flag`}
            style={{ width: "40px", verticalAlign: "middle", marginRight: "10px" }}
          />
          <strong>{selectedOption.label}</strong>
          <p>Currency Code: {selectedOption.currency}</p>
        </div>
      )} */}
    </div>
  );
};

export default CountrySelect;
