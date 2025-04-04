// "use client";
// import { useState, useRef } from "react";
// import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

// const GOOGLE_API_KEY = "AIzaSyDHd5FoyP2sDBo0vO2i0Zq7TIUZ_7GhBcI";

// const AddressInput = ({shippingAddressData, setShippingAddressData}) => {

//   const autocompleteRef = useRef(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_API_KEY,
//     libraries: ["places"],
//   });

//   const handlePlaceSelect = () => {
//     const place = autocompleteRef.current.getPlace();

//     if (place && place.geometry) {
//       setShippingAddressData((prev) => ({
//         ...prev,
//         address: place.formatted_address,
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       }));
//     }
//   };

//   if (!isLoaded) return <p>Loading...</p>;

//   return (
//     <div>
//       {/* Load Google Autocomplete */}
//       <Autocomplete
//         onLoad={(autoC) => (autocompleteRef.current = autoC)}
//         onPlaceChanged={handlePlaceSelect}
//       >
//         <input
//           className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal text-base text-black outline-none mb-5"
//           type="text"
//           placeholder="Address"
//           required
//           // value={shippingAddressData.address}
//           // onChange={(e) =>
//           //   setShippingAddressData({ ...shippingAddressData, address: e.target.value })
//           // }
//         />
//       </Autocomplete>

//       {/* {shippingAddressData.lat && shippingAddressData.lng && (
//         <p className="text-sm text-gray-600">
//           Latitude: {shippingAddressData.lat}, Longitude: {shippingAddressData.lng}
//         </p>
//       )} */}
//     </div>
//   );
// };

// export default AddressInput;





"use client";
import { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const AddressInput = ({ shippingAddressData, setShippingAddressData }) => {
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    if (place && place.geometry) {
      const formattedAddress = place.formatted_address || place.name || "Unknown Address";

      setShippingAddressData((prev) => ({
        ...prev,
        address: formattedAddress,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        city: place.address_components?.find((comp) =>
          comp.types.includes("locality")
        )?.long_name || prev.city,
        country: place.address_components?.find((comp) =>
          comp.types.includes("country")
        )?.long_name || prev.country,
      }));
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <Autocomplete
        onLoad={(autoC) => (autocompleteRef.current = autoC)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal text-base text-black outline-none mb-5"
          type="text"
          placeholder="Address"
          // value={shippingAddressData.address}
          required
        />
      </Autocomplete>
    </div>
  );
};

export default AddressInput;
