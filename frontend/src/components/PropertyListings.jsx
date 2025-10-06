import { Link } from "react-router-dom";

const PropertyListings = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <div className="property-preview" key={property.id}>
          <Link to={`/properties/${property.id}`}>
            <h2>{property.title}</h2>
          </Link>
          <p>Type: {property.type}</p>
          <p>Price: ${property.price}</p>
          <p>Location: {property.location.city}, {property.location.state}</p>
          <p>Square Feet: {property.squareFeet}</p>
          <p>Year Built: {property.yearBuilt}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyListings;
