/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import IngredientSelect from './IngredientSelect';
import ConfirmAction from "./ConfirmAction";
import '../css/foodForm.scss';

const FoodForm = ({ formData, setFormData, submit, foods, setEditing, setActiveFood, setAddFormOpen }) => {
  // State to manage the visibility of the confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  // Initial state for form data (an empty form)
  const initialEmptyFormData = { name: "", protein: null, carb: null, date: "" };

  // Track the initial form data when the component mounts
  const [initialFormData, setInitialFormData] = useState(initialEmptyFormData);

  useEffect(() => {
    // Check if initialFormData is still the default empty object and formData has an id
    if (JSON.stringify(initialFormData) === JSON.stringify(initialEmptyFormData) && formData.id) {
      setInitialFormData(JSON.parse(JSON.stringify(formData)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, initialFormData]);

  // console.log(formData);
  // console.log("ini",initialFormData)

  // Function to check if form data has been altered
  const hasFormChanged = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      submit(formData.id, {
        name: formData.name,
        protein: formData.protein?.value,
        carb: formData.carb?.value,
        date: formData.date,
      });
      setEditing(null); // De-select the editing state
      setActiveFood(formData.id); // Keep the item open
    } else {
      submit({
        name: formData.name,
        protein: formData.protein?.value,
        carb: formData.carb?.value,
        date: formData.date,
      });
      setFormData({ name: "", protein: null, carb: null, date: "" });
      setAddFormOpen(false);
    }
  };

  const handleCancel = () => {
    if (hasFormChanged()) {
      setShowConfirm(true); // Show the confirmation modal if the form has been altered
    } else {
      confirmCancel(); // Proceed with cancellation if the form is unaltered
    }
  };

  const confirmCancel = () => {
    setFormData({ name: "", protein: null, carb: null, date: "" });
    if (formData.id) {
      setEditing(null);
      setActiveFood(formData.id);
    } else {
      setAddFormOpen(false);
    }
    setShowConfirm(false); // Close the confirmation modal
  };

  const cancelCancel = () => {
    setShowConfirm(false); // Close the confirmation modal without making changes
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="input-field">
            <label>
              Name:
              <input
                className="input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Food name"
                required
              />
            </label>
          </div>
          <div>
            <IngredientSelect
              foods={foods}
              ingredient={formData.protein}
              setIngredient={(protein) =>
                setFormData((prevData) => ({ ...prevData, protein }))
              }
              type="protein"
            />
          </div>
          <div>
            <IngredientSelect
              foods={foods}
              ingredient={formData.carb}
              setIngredient={(carb) =>
                setFormData((prevData) => ({ ...prevData, carb }))
              }
              type="carb"
            />
          </div>
          <div className="input-field">
            <label>
              Date:
              <input
                className="input"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>
        <div className="button-group">
          <button className="secondary-button" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="primary-button" type="submit">
            Save
          </button>
        </div>
      </form>
      {showConfirm && (
        <ConfirmAction onConfirm={confirmCancel} onCancel={cancelCancel} type="cancel"/>
      )}
    </div>
  );
};

export default FoodForm;
