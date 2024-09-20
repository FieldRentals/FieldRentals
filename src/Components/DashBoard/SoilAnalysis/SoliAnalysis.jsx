import React, { useState } from "react";
import "./SoilAnalysis.css";
import { StyledButton } from "../../../App";

function SoilAnalysis() {
  const [formData, setFormData] = useState({
    moisture: "",
    ph: "",
    nutrients: "",
    pest: "no",
    pestType: "",
  });
  const [suggestion, setSuggestion] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const analyzeSoil = () => {
    const { moisture, ph, nutrients, pest, pestType } = formData;
    let suggestionText = "";

    // Soil Moisture Analysis
    if (moisture >= 30 && moisture <= 70) {
      suggestionText += "Soil moisture is good for agriculture. ";
    } else {
      suggestionText += "Soil moisture is not ideal for agriculture. ";
      if (moisture < 30) {
        suggestionText += "Consider using mulch to retain soil moisture. ";
      } else if (moisture > 70) {
        suggestionText +=
          "Improve drainage or reduce irrigation to lower soil moisture. ";
      }
    }

    // Soil pH Level Analysis
    if (ph >= 6 && ph <= 7.5) {
      suggestionText += "Soil pH is good for agriculture. ";
    } else {
      suggestionText += "Soil pH is not ideal for agriculture. ";
      if (ph < 6) {
        suggestionText +=
          "Apply lime to raise the pH to a more neutral level. ";
      } else if (ph > 7.5) {
        suggestionText +=
          "Apply sulfur or organic matter to lower the pH to a more acidic level. ";
      }
    }

    // Nutrient Level Analysis (Simple N-P-K analysis)
    const npkValues = nutrients.split("-").map(Number);
    if (
      npkValues.length === 3 &&
      npkValues[0] > 0 &&
      npkValues[1] > 0 &&
      npkValues[2] > 0
    ) {
      suggestionText += "Nutrient levels are good for agriculture. ";
      if (npkValues[0] < 10) {
        suggestionText +=
          "Consider a fertilizer high in nitrogen, such as Urea (46-0-0) or Ammonium Nitrate (34-0-0). ";
      }
      if (npkValues[1] < 5) {
        suggestionText +=
          "Consider adding a phosphorus-rich fertilizer, like Superphosphate (0-20-0) or Bone Meal. ";
      }
      if (npkValues[2] < 5) {
        suggestionText +=
          "Consider adding potassium-rich fertilizers like Potash (0-0-60) or Sulfate of Potash (0-0-50). ";
      }
    } else {
      suggestionText +=
        "Nutrient levels are not ideal. Consider using a balanced fertilizer like NPK 10-10-10. ";
    }

    // Pest Detection and Analysis
    if (pest === "yes") {
      // suggestionText += 'Pests detected. ';
      switch (pestType) {
        case "aphids":
          suggestionText +=
            "Use an insecticidal soap or neem oil to control them. ";
          break;
        case "mites":
          suggestionText += "Use horticultural oil or a miticide. ";
          break;
        case "weevils":
          suggestionText +=
            "Apply beneficial nematodes or use a granular insecticide. ";
          break;
        case "cutworms":
          suggestionText +=
            "Use diatomaceous earth or Bacillus thuringiensis (Bt) to control them. ";
          break;
        default:
          suggestionText +=
            "Consider using an appropriate pesticide or IPM practices based on the type of pest detected. ";
          break;
      }
    } else {
      // suggestionText += 'No pests detected. ';
    }

    setSuggestion(suggestionText);
  };

  return (
    <div className="SoilAnalysisContainer">
      <div className="SoilAnalysisContainerTitle">
        Soil Analysis and Fertilizer Suggestion
      </div>
      <form id="soilForm">
        <label className="SoilAnalysisFormLabel" htmlFor="moisture">
          Soil Moisture (%)
        </label>
        <input
          type="number"
          id="moisture"
          name="moisture"
          value={formData.moisture}
          onChange={handleChange}
          min="0"
          max="100"
          placeholder="40%-70% is recommended"
          required
        />

        <label className="SoilAnalysisFormLabel" htmlFor="ph">
          Soil pH Level
        </label>
        <input
          type="number"
          id="ph"
          name="ph"
          value={formData.ph}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="14"
          placeholder="eg:5.5-7.5 is recommended"
          required
        />

        <label className="SoilAnalysisFormLabel" htmlFor="nutrients">
          Nutrient Level (N-P-K)
        </label>
        <input
          type="text"
          id="nutrients"
          name="nutrients"
          value={formData.nutrients}
          onChange={handleChange}
          placeholder="e.g., 10-5-5"
          required
        />

        <label className="SoilAnalysisFormLabel" htmlFor="pest">
          Pests Detected
        </label>
        <select
          id="pest"
          name="pest"
          value={formData.pest}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>

        {formData.pest === "yes" && (
          <div>
            <label className="SoilAnalysisFormLabel" htmlFor="pestType">
              Which Pest?
            </label>
            <select
              id="pestType"
              name="pestType"
              value={formData.pestType}
              onChange={handleChange}
            >
              <option value="aphids">Aphids</option>
              <option value="mites">Spider Mites</option>
              <option value="weevils">Weevils</option>
              <option value="cutworms">Cutworms</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
        <StyledButton
          variant="contained"
          disableElevation
          disableFocusRipple
          disableRipple
          onClick={analyzeSoil}
        >
          Get Analysis
        </StyledButton>

        {/* <button type="button" onClick={analyzeSoil}>
          Get Analysis
        </button> */}
      </form>

      <div id="suggestion" className="suggestion-box">
        {suggestion}
      </div>
    </div>
  );
}

export default SoilAnalysis;
