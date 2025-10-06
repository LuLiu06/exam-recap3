import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteProperty = async (propertyId) => {
    console.log("Deleting property with ID:", propertyId);
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("Property data:", data);
        console.log("Property _id:", data._id);
        console.log("URL id:", id);
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const onDeleteClick = (propertyId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property listing?"
    );
    if (!confirm) return;

    deleteProperty(propertyId);
    navigate("/");
  };

  return (
    <div className="property-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{property.title}</h2>
          <p>Type: {property.type}</p>
          <p>Description: {property.description}</p>
          <p>Price: ${property.price}</p>
          <p>Size: {property.squareFeet} sqft</p>
          <p>Year Built: {property.yearBuilt}</p>
          <p>Location: {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</p>

          <button onClick={() => onDeleteClick(property._id || id)}>Delete</button>
          <button onClick={() => navigate(`/properties/${property._id || id}/edit`)}>Edit</button>

        </>
      )}
    </div>
  );
};

export default PropertyPage;
