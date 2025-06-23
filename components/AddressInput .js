// "use client";
// import { useState, useRef } from "react";
// import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

// const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// const AddressInput = ({ shippingAddressData, setShippingAddressData }) => {
//   const autocompleteRef = useRef(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_API_KEY,
//     libraries: ["places"],
//   });

//   const handlePlaceSelect = () => {
//     const place = autocompleteRef.current.getPlace();

//     if (place && place.geometry) {
//       const formattedAddress = place.formatted_address || place.name || "Unknown Address";

//       setShippingAddressData((prev) => ({
//         ...prev,
//         address: formattedAddress,
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//         city: place.address_components?.find((comp) =>
//           comp.types.includes("locality")
//         )?.long_name || prev.city,
//         country: place.address_components?.find((comp) =>
//           comp.types.includes("country")
//         )?.long_name || prev.country,
//       }));
//     }
//   };

//   if (!isLoaded) return <p>Loading...</p>;

//   return (
//     <div>
//       <Autocomplete
//         onLoad={(autoC) => (autocompleteRef.current = autoC)}
//         onPlaceChanged={handlePlaceSelect}
//       >
//         <input
//           className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal text-base text-black outline-none mb-5"
//           type="text"
//           placeholder="Address"
//           // value={shippingAddressData.address}
//           required
//         />
//       </Autocomplete>
//     </div>
//   );
// };

// export default AddressInput;





"use client";
import { useRef, useState, useEffect } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const AddressInput = ({ shippingAddressData, setShippingAddressData }) => {
  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState(shippingAddressData?.address || "");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const {t} = useTranslation()
  // Sync when parent data changes (e.g., when editing existing address)
  useEffect(() => {
    if (shippingAddressData?.address) {
      setInputValue(shippingAddressData.address);
    }
  }, [shippingAddressData.address]);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();

    if (place && place.geometry) {
      const formattedAddress = place.formatted_address || "Unknown Address";

      // const city = place.address_components?.find((comp) =>
      //   comp.types.includes("locality")
      // )?.long_name || "";

      const country = place.address_components?.find((comp) =>
        comp.types.includes("country")
      )?.long_name || "";

      setInputValue(formattedAddress);

      setShippingAddressData((prev) => ({
        ...prev,
        address: formattedAddress,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        // city: city || prev.city,
        country: country || prev.country,
      }));
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Optional: If user deletes the address, clear it from state too
    if (value.trim() === "") {
      setShippingAddressData((prev) => ({
        ...prev,
        address: "",
        lat: "",
        lng: "",
        city: "",
        country: "",
      }));
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <Autocomplete
        onLoad={(autoC) => (autocompleteRef.current = autoC)}
        onPlaceChanged={handlePlaceSelect}
        options={{ types: ['address'] }}
      >
        <input
          className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal text-base text-black outline-none mb-5"
          type="text"
          placeholder={t("Address")}
          value={inputValue}
          onChange={handleChange}
          required
        />
      </Autocomplete>
    </div>
  );
};

export default AddressInput;
