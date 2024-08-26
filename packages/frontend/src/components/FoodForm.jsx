/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import IngredientSelect from './IngredientSelect';
import ConfirmAction from "./ConfirmAction";
import '../css/foodForm.scss';

const FoodForm = ({ formData, setFormData, submit, foods, setEditing, setActiveFood, setAddFormOpen }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const initialEmptyFormData = { name: "", protein: null, carb: null, date: "" };
  const [initialFormData, setInitialFormData] = useState(initialEmptyFormData);

  // Error state for required fields
  const [errors, setErrors] = useState({ name: false, protein: false, carb: false, date: false });

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

    // Trim the input values and check for empty strings or only spaces
    const trimmedName = formData.name.trim();

    // Validate required fields and set different error states for the name
    const newErrors = {
      nameEmpty: !formData.name,
      nameSpaces: formData.name && !trimmedName,
      protein: !formData.protein,
      carb: !formData.carb,
      date: !formData.date,
    };
    setErrors(newErrors);

    // If there are any errors, do not submit the form
    if (newErrors.nameEmpty || newErrors.nameSpaces || newErrors.protein || newErrors.carb || newErrors.date) {
        return;
    }

    // Prepare data for submission
    const submissionData = {
      name: trimmedName,
      protein: formData.protein,
      carb: formData.carb,
      date: formData.date
    };

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

  const handleCancel = () => {
    if (hasFormChanged()) {
      setShowConfirm(true);
    } else {
      confirmCancel();
    }
  };

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="input-field">
            <label>
              Name:
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
              Date:
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
      {showConfirm && (
        <ConfirmAction onConfirm={confirmCancel} onCancel={cancelCancel} type="cancel"/>
      )}
    </div>
  );
};

export default FoodForm;
