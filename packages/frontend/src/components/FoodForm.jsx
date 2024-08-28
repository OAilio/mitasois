/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import IngredientSelect from './IngredientSelect';
import ConfirmAction from "./ConfirmAction";
import '../css/foodForm.scss';

const FoodForm = ({ formData, setFormData, submit, foods, editingFood, setEditing, setActiveFood, addFormOpen, setAddFormOpen }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const initialEmptyFormData = { name: "", protein: null, carb: null, date: "" };
  const [initialFormData, setInitialFormData] = useState(initialEmptyFormData);
  const [isDuplicateName, setIsDuplicateName] = useState(false);
  const [duplicateFoodId, setDuplicateFoodId] = useState(null);
  const [duplicateFoodData, setDuplicateFoodData] = useState(null);

  // Error state for required fields
  const [errors, setErrors] = useState({ name: false, protein: false, carb: false, date: false });

  // useEffect that saves the initial form data when form is opened
  useEffect(() => {
    if (JSON.stringify(initialFormData) === JSON.stringify(initialEmptyFormData) && formData.id) {
      setInitialFormData(JSON.parse(JSON.stringify(formData)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, initialFormData]);

  const hasFormChanged = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim the name and check for empty strings or only spaces
    const trimmedName = formData.name.trim();
    const duplicateFood = foods.find(food => food.name === trimmedName && food.id != formData.id);

    // Validate required fields and set different error states for the name
    const newErrors = {
      nameEmpty: !formData.name,
      nameSpaces: formData.name && !trimmedName,
      nameDuplicate: duplicateFood,
      protein: !formData.protein,
      carb: !formData.carb,
      date: !formData.date,
    };
    setErrors(newErrors);

    // If there are any errors, do not submit the form
    if (newErrors.nameEmpty || newErrors.nameSpaces || newErrors.protein || newErrors.carb || newErrors.date) {
      return;
    }

    // If there is an existing food with the same name,
    // ask user if they want to create new food or edit
    // existing
    if (newErrors.nameDuplicate) {
      setDuplicateFoodId(duplicateFood.id);
      setDuplicateFoodData(duplicateFood);
      setIsDuplicateName(true);
      setShowConfirm(true);
      return;
    }

    console.log("id:",duplicateFoodId)

    // If no duplicate, proceed with submission
    submitFood();
  };

  const submitFood = () => {
    // Prepare data for submission
    const trimmedName = formData.name.trim();
    const submissionData = {
      name: trimmedName,
      protein: formData.protein.value,
      carb: formData.carb.value,
      date: formData.date
    };

    // If id exists, it's an update operation
    if (formData.id) {
      submit(formData.id, submissionData, "Roger that!");
      setEditing(null);
      setActiveFood(formData.id);
    } else {
      submit(submissionData, "Sounds delicious!");
      setFormData(initialEmptyFormData);
      setAddFormOpen(false);
    }
  };

  // Open confirmation is the form content has changed
  const handleCancel = () => {
    if (hasFormChanged()) {
      setShowConfirm(true);
    } else {
      confirmCancel();
    }
  };

  // Closes the form on cancel
  const confirmCancel = () => {
    setFormData(initialEmptyFormData);
    if (formData.id) {
      setEditing(null);
      setActiveFood(formData.id);
    } else {
      setAddFormOpen(false);
    }
    setShowConfirm(false);
  };

  // Keeps the form open
  const cancelCancel = () => {
    setShowConfirm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDuplicatePrimaryAction = () => {
    if (addFormOpen) {
      setAddFormOpen(false) // Close the addNewForm if it's open (adding new operation)
    }
    if (editingFood) {
      setEditing(null) // Close the editing form if it's open (edit operation)
    }
    setFormData(initialEmptyFormData); // Empty the form data
    setActiveFood(duplicateFoodId); // Set active food as the duplicate food
    setShowConfirm(false); // Close the confirmation
  };

  const handleDuplicateSecondaryAction = () => {
    submitFood(); // Submit the food
    setShowConfirm(false); // Close the confirmation
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="input-field">
            <label>
              Name*
              <input
                className={`input ${errors.nameEmpty || errors.nameSpaces ? "error" : ""}`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Food name"
              />
              {errors.nameEmpty && <div className="error-message">Name is required.</div>}
              {errors.nameSpaces && <div className="error-message">Enter a valid name.</div>}
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
              isError={errors.protein}
            />
            {errors.protein && <div className="error-message">Protein is required.</div>}
          </div>
          <div>
            <IngredientSelect
              foods={foods}
              ingredient={formData.carb}
              setIngredient={(carb) =>
                setFormData((prevData) => ({ ...prevData, carb }))
              }
              type="carb"
              isError={errors.carb}
            />
            {errors.carb && <div className="error-message">Carb is required.</div>}
          </div>
          <div className="input-field">
            <label>
              Date*
              <input
                className={`input ${errors.date ? "error" : ""}`}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <div className="error-message">Date is required.</div>}
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
      {showConfirm && isDuplicateName && (
        <ConfirmAction
          primaryAction={handleDuplicatePrimaryAction}
          secondaryAction={handleDuplicateSecondaryAction}
          food={duplicateFoodData}
          type="duplicate"
        />
      )}
      {showConfirm && !isDuplicateName && (
        <ConfirmAction 
          primaryAction={confirmCancel} 
          secondaryAction={cancelCancel} 
          type="cancel"
        />
      )}
    </div>
  );
};

export default FoodForm;