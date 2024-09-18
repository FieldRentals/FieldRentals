import React, { useState } from "react";
import "./CropManagement.css";

const cropData = {
  wheat: {
    plantingWindow: "October - November",
    growthStages: [
      { stage: "Germination", duration: "1-2 weeks" },
      { stage: "Tillering", duration: "3-4 weeks" },
      { stage: "Boot Stage", duration: "2 weeks" },
      { stage: "Heading", duration: "3 weeks" },
    ],
    harvestTime: "March - April",
  },
  rice: {
    plantingWindow: "June - July",
    growthStages: [
      { stage: "Germination", duration: "1 week" },
      { stage: "Tillering", duration: "3-4 weeks" },
      { stage: "Boot Stage", duration: "2 weeks" },
      { stage: "Heading", duration: "4 weeks" },
    ],
    harvestTime: "September - October",
  },
  maize: {
    plantingWindow: "March - April",
    growthStages: [
      { stage: "Germination", duration: "1 week" },
      { stage: "Vegetative", duration: "4-5 weeks" },
      { stage: "Silking", duration: "2 weeks" },
      { stage: "Maturity", duration: "3 weeks" },
    ],
    harvestTime: "July - August",
  },
};

const CropManagement = () => {
  const [selectedCrop, setSelectedCrop] = useState("wheat");

  const handleChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  const selectedCropData = cropData[selectedCrop];

  return (
    <div className="CropManagement">
      <div className="CropManagementTitle">Crop Management</div>
      <div className="CropManagementContainer">
        <div className="CropManagementSelector">
          <select id="crops" onChange={handleChange} value={selectedCrop}>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="maize">Maize</option>
          </select>
        </div>

        {selectedCrop && (
          <div className="CropManagementSubContainer">
            <div className="CropManagementSubContainerTitle">
              {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}{" "}
              Planting Window
            </div>
            <div className="CropManagementSubContainerBox">
              <p>
                <strong>Planting Window:</strong>
              </p>
              {selectedCropData.plantingWindow}
              <strong>Growth Stages:</strong>
              <ol>
                {selectedCropData.growthStages.map((stage, index) => (
                  <li key={index}>
                    {stage.stage} - {stage.duration}
                  </li>
                ))}
              </ol>
              <p>
                <strong>Harvest Time:</strong>
              </p>{" "}
              {selectedCropData.harvestTime}
            </div>
          </div>
        )}
      </div>
      <div className="CropManagementGrowthT">
        <div className="CropManagementGrowthTTitle">Growth Timeline</div>
        <div className="CropManagementGrowthTBox">
          {selectedCrop && (
            <>
              <div className="CropManagementGrowthTBoxName">Planting</div>
              <div className="CropManagementGrowthTBoxName">
                {selectedCropData.growthStages[0].stage}
              </div>
              <div className="CropManagementGrowthTBoxName">
                {selectedCropData.growthStages[1].stage}
              </div>
              <div className="CropManagementGrowthTBoxName">
                {selectedCropData.growthStages[2].stage}
              </div>
              <div className="CropManagementGrowthTBoxName">
                {selectedCropData.growthStages[3].stage}
              </div>
              <div className="CropManagementGrowthTBoxName">Harvest</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropManagement;
