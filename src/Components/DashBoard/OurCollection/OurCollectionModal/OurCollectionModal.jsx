import React, { useState, useEffect } from "react";
import "./OurCollectionModal.css"; // Add your CSS for styling
import { StyledButton } from "../../../../App";
import { Alert, Snackbar } from "@mui/material";
import { bookEquipment } from "../../../../Firebase/firebbaseFunctions";
import { useAuth } from "../../../../AuthContext";

const ErrorPopup = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      action={
        <button onClick={onClose} style={{ color: "white" }}>
          Close
        </button>
      }
    >
      <Alert onClose={onClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

const OurCollectionModal = ({ isOpen, onClose, equipment }) => {
  const [pickupDate, setPickupDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1); // Default to 1 day
  const [dropOffDate, setDropOffDate] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const { currentUser } = useAuth();

  // Reset state when equipment changes
  useEffect(() => {
    if (equipment) {
      setPickupDate("");
      setNumberOfDays(1);
      setDropOffDate("");
    }
  }, [equipment]);

  useEffect(() => {
    if (pickupDate && numberOfDays > 0) {
      const pickDate = new Date(pickupDate);
      const dropDate = new Date(pickDate);
      dropDate.setDate(pickDate.getDate() + parseInt(numberOfDays));
      const day = String(dropDate.getDate());
      const month = String(dropDate.getMonth() + 1);
      const year = dropDate.getFullYear();
      setDropOffDate(`${day}/${month}/${year}`);
    } else {
      setDropOffDate("");
    }
  }, [pickupDate, numberOfDays]);

  function handleNumberOfDaysInput(value) {
    setNumberOfDays(value);
    // Calculate future drop-off date
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + parseInt(value));
    const day = String(futureDate.getDate());
    const month = String(futureDate.getMonth() + 1);
    const year = futureDate.getFullYear();
    setDropOffDate(`${day}/${month}/${year}`);
  }

  async function handleCheckout() {
    if (!pickupDate) {
      setErrorMessage("Please select a pickup date.");
      setErrorOpen(true);
    } else if (numberOfDays <= 0) {
      setErrorMessage("Please set number of days greater than 0");
      setErrorOpen(true);
    } else if (currentUser.uid === equipment.Owner) {
      setErrorMessage("You cannot book your own equipment.");
      setErrorOpen(true);
    } else {
      // Proceed to checkout logic here
      setLoading(true); // Set loading to true
      try {
        await bookEquipment(
          currentUser.uid,
          equipment.EquipmentId,
          pickupDate,
          dropOffDate
        );
        console.log("Booking successful...");
        onClose(); // Close modal after processing
      } catch (error) {
        setErrorMessage("There was an error processing your booking.");
        setErrorOpen(true);
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  }

  if (!isOpen) return null;

  // Calculate max date (7 days from today)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  return (
    <div className="OurCollectionModalOverlay">
      <div className="OurCollectionModalBackground" onClick={onClose} />
      <div className="OurCollectionModalContent">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {equipment && (
          <div className="OurCollectionModalContainer">
            <div className="OurCollectionModalImageContainer">
              <img src={equipment.Image} alt={equipment.Name} />
            </div>
            <div className="OurCollectionModalContentContainer">
              <div className="OurCollectionModalTitle">{equipment.Name}</div>
              <div className="OurCollectionModalDescriptionContainer">
                {equipment.Description}
              </div>
              <div className="OurCollectionModalLocationContainer">
                <b>Location: </b>
                {equipment.Location}
              </div>
              <div className="OurCollectionModalPriceContainer">
                <b>Price: </b>${equipment.Price} per day
              </div>
              <div className="OurCollectionModalPickUpDateContainer">
                <b>Pick-up Date: </b>
                <input
                  type="date"
                  id="pickup-date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={today.toISOString().split("T")[0]} // Set min to today
                  max={maxDate.toISOString().split("T")[0]} // Set max to 7 days
                />
              </div>
              <div className="OurCollectionModalNumberOfDaysContainer">
                <b>Number of Days: </b>
                <input
                  type="number"
                  id="number-of-days"
                  value={numberOfDays}
                  min="1" // Minimum value of 1 day
                  onChange={(e) => handleNumberOfDaysInput(e.target.value)}
                />
              </div>
              <div className="OurCollectionModalDropOffDateContainer">
                <b>Drop-off Date: </b>
                {dropOffDate || "Please pick up date and number of days"}
              </div>
              <div className="OurCollectionModalTotal">
                <b>Total: </b>
                <span>${equipment.Price * numberOfDays}</span>
              </div>
              <div className="OurCollectionModalButtonContainer">
                <StyledButton
                  variant="contained"
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  onClick={handleCheckout}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </StyledButton>
              </div>
            </div>
          </div>
        )}

        <ErrorPopup
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          message={errorMessage}
        />
      </div>
    </div>
  );
};

export default OurCollectionModal;
