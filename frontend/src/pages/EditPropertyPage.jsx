import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 表单字段
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const updateProperty = async (property) => {
    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });
      if (!res.ok) throw new Error("Failed to update property");
      return true;
    } catch (err) {
      console.error("Error updating property:", err);
      return false;
    }
  };

  // 获取 property 数据
  useEffect(() => {
    const fetchProperty = async () => {
      console.log("EditPropertyPage - ID from URL:", id);
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();
        console.log("EditPropertyPage - Property data:", data);
        setProperty(data);

        // 初始化表单字段
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setPrice(data.price);
        setSquareFeet(data.squareFeet);
        setYearBuilt(data.yearBuilt);
        setAddress(data.location.address);
        setCity(data.location.city);
        setState(data.location.state);
        setZipCode(data.location.zipCode);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedProperty = {
      id,
      title,
      type,
      description,
      price: Number(price),
      squareFeet: Number(squareFeet),
      yearBuilt: Number(yearBuilt),
      location: {
        address,
        city,
        state,
        zipCode,
      },
    };

    const success = await updateProperty(updatedProperty);
    if (success) {
      navigate(`/properties/${id}`);
    }
  };

  return (
    <div className="create">
      <h2>Update Property</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Type:</label>
          <input value={type} onChange={(e) => setType(e.target.value)} required />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label>Square Feet:</label>
          <input type="number" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} required />

          <label>Year Built:</label>
          <input type="number" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} required />

          <label>Address:</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} required />

          <label>City:</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} required />

          <label>State:</label>
          <input value={state} onChange={(e) => setState(e.target.value)} required />

          <label>Zip Code:</label>
          <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />

          <button>Update Property</button>
        </form>
      )}
    </div>
  );
};

export default EditPropertyPage;
