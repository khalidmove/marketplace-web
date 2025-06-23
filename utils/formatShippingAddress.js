const formatShippingAddress = (address) => {
  if (!address || typeof address !== 'object') return "No address provided";

  const addressParts = [
    address?.firstName,
    address?.address,
    address?.city,
    address?.pinCode,
    address?.country,
    address?.phoneNumber,
  ].filter(Boolean);

  let fullAddress = addressParts.join(", ");

  if (fullAddress.length > 50) {
    fullAddress = fullAddress.slice(0, 50) + "...";
  }

  return fullAddress;
};

export default formatShippingAddress;
