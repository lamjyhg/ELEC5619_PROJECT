import { useEffect, useState } from "react";
import { Input } from "antd";
import PlacesAutocomplete, { Suggestion } from "react-places-autocomplete";
import "./AddressAutoComplete.scss";
export default function AddressAutoComplete({
  address,
  clearAddress,
  onChange,
  onAddressSelect,
}) {
  const [addressInfo, setAddress] = useState(address);
  const handleAddressChange = (address) => {
    setAddress(address);
  };

  useEffect(() => {
    setAddress(address);
  }, [address]);
  return (
    <PlacesAutocomplete
      onChange={handleAddressChange}
      onSelect={onAddressSelect}
      value={addressInfo}
    >
      {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
        <>
          <Input
            {...getInputProps({
              id: "address-input",
            })}
          />

          <div className="autocomplete-dropdown-container">
            {loading ? <div>Loading...</div> : null}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer", padding: 25 }
                : { backgroundColor: "#ffffff", cursor: "pointer" };

              const spread = {
                ...getSuggestionItemProps(suggestion, {
                  className,
                  style,
                }),
              };
              return (
                <div {...spread} key={suggestion.id}>
                  <div>{suggestion.description}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
}
