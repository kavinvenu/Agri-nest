import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectLocation = () => {
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    product,
    customerName,
    phoneNumber,
    address,
    quantity,
    totalPrice,
    paymentMethod,
  } = location.state || {};

  // ✅ Dynamically load the Google Maps script
  useEffect(() => {
    const existingScript = document.getElementById("googleMapsScript");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCsGo6JjcBa1uqZp0fquIdOvQuXmnxjlCY"; // <-- REPLACE THIS
      script.async = true;
      script.defer = true;
      script.id = "googleMapsScript";

      script.onload = () => {
        setMapLoaded(true);
      };

      script.onerror = () => {
        setMapError(true);
      };

      document.body.appendChild(script);
    } else {
      setMapLoaded(true); // Already exists
    }
  }, []);

  // ✅ Initialize map after script is loaded
  useEffect(() => {
    if (!mapLoaded || mapError) return;

    try {
      const defaultLocation = { lat: 10.4164, lng: 77.9006 };

      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 14,
      });

      let marker = null;

      map.addListener("click", (event) => {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setSelectedLocation(clickedLocation);

        if (marker) marker.setMap(null);

        marker = new window.google.maps.Marker({
          position: clickedLocation,
          map,
        });
      });
    } catch (err) {
      console.error("Google Maps error:", err);
      setMapError(true);
    }
  }, [mapLoaded, mapError]);

  const handlePlaceOrder = async () => {
    if (!selectedLocation) {
      alert("Please select a location.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product?._id,
          customerName,
          phoneNumber,
          address,
          quantity,
          totalPrice,
          paymentMethod,
          deliveryLocation: selectedLocation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/customer");
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success mb-4">Select Your Location</h2>

      {mapError ? (
        <div className="alert alert-danger">
          ❌ Failed to load Google Maps. Please check your API key or internet connection.
        </div>
      ) : !mapLoaded ? (
        <div className="text-center mb-4">
          <div className="spinner-border text-success" role="status"></div>
          <p>Loading map...</p>
        </div>
      ) : (
        <>
          <div
            ref={mapRef}
            style={{
              height: "300px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          ></div>

          {selectedLocation ? (
            <p className="text-success">
              Selected: Lat {selectedLocation.lat.toFixed(5)}, Lng{" "}
              {selectedLocation.lng.toFixed(5)}
            </p>
          ) : (
            <p className="text-danger">Click on the map to select a location</p>
          )}

          <button
            className="btn btn-success w-100"
            onClick={handlePlaceOrder}
            disabled={!selectedLocation}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default SelectLocation;