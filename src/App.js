import React, { useState } from "react";
import FormBuilder from "./components/FormBuilder";
import FormDataDisplay from "./components/FormDataDisplay";
import { isValidPhoneNumber } from "react-phone-number-input";
import "./App.css";

const App = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleFormChange = (id, value) => {
    setFormData((prevData) => ({ ...prevData, [id]: value || "" }));
    validateField(id, value);
  };

  const removeField = (id) => {
    const removeNestedFields = (fields) => {
      return fields
        .filter((field) => field.id !== id)
        .map((field) => {
          if (field.type === "section" && field.children) {
            return { ...field, children: removeNestedFields(field.children) };
          }
          return field;
        });
    };

    setFormFields((prevFields) => removeNestedFields(prevFields));
    setFormData((prevData) => {
      const newData = { ...prevData };
      delete newData[id];
      return newData;
    });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[id];
      return newErrors;
    });
  };

  const validateField = (id, value) => {
    const field = findFieldById(formFields, id);
    let error = "";

    if (field.type === "text") {
      if (!value) {
        error = "This field is required.";
      } else if (/\d/.test(value)) {
        error = "Numbers are not allowed in this field.";
      }
    } else if (field.type === "phone" && !isValidPhoneNumber(value)) {
      error = "Invalid phone number.";
    } else if (field.type === "date" && !value) {
      error = "Please select a date.";
    } else if (field.type === "dropdown" && !value) {
      error = "Please select an option.";
    } else if (field.type === "checkbox" && !value) {
      error = "This field must be checked.";
    } else if (field.type === "file" && !value) {
      error = "Please upload a file.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const findFieldById = (fields, id) => {
    for (const field of fields) {
      if (field.id === id) return field;
      if (field.type === "section" && field.children) {
        const found = findFieldById(field.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className="app">
      <h1>Dynamic Form Builder</h1>
      <FormBuilder
        formFields={formFields}
        setFormFields={setFormFields}
        handleFormChange={handleFormChange}
        removeField={removeField}
        errors={errors}
      />
      <FormDataDisplay formFields={formFields} formData={formData} />
    </div>
  );
};

export default App;