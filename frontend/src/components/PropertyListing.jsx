const PropertyListing = ({ property }) => {
  return (
    <div className="property-preview">
      <h2>{property.title}</h2>
      <p>Type: {property.type}</p>
      <p>Description: {property.description}</p>
      <p>Price: ${property.price}</p>
      <p>Location: {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</p>
      <p>Square Feet: {property.squareFeet}</p>
      <p>Year Built: {property.yearBuilt}</p>
    </div>
  );
};

export default PropertyListing;
