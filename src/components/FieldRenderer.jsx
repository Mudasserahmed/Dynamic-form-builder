import React from "react";

const fieldTypes = [
  { type: "text", label: "Text Field" },
  { type: "dropdown", label: "Dropdown" },
  { type: "radio", label: "Radio Button" },
  { type: "file", label: "File Upload" },
  { type: "checkbox", label: "Checkbox" },
  { type: "country", label: "Country" },
  { type: "date", label: "Date Picker" },
  { type: "phone", label: "Phone Number" },
  { type: "section", label: "Section" },
];

const FieldRenderer = ({ field, handleFormChange, removeField, errors, addField }) => {
  const handleChange = (e) => {
    handleFormChange(field.id, e.target.value);
  };

  return (
    <div className="field">
      <div className="field-header">
        <label>{field.label}</label>
        <button className="remove-button" onClick={() => removeField(field.id)}>
          Remove
        </button>
      </div>
      {renderInput(field, handleChange)}
      {field.type === "section" && (
        <div className="nested-fields">
          <h4>Add Fields to Section:</h4>
          <div className="nested-buttons">
            {fieldTypes.map((type) => (
              <button key={type.type} onClick={() => addField(type.type, field.id)}>
                Add {type.label}
              </button>
            ))}
          </div>
          {field.children?.map((child) => (
            <FieldRenderer
              key={child.id}
              field={child}
              handleFormChange={handleFormChange}
              removeField={removeField}
              errors={errors}
              addField={addField}
            />
          ))}
        </div>
      )}
      {errors[field.id] && <div className="error-message">{errors[field.id]}</div>}
    </div>
  );
};

const renderInput = (field, handleChange) => {
  switch (field.type) {
    case "text":
      return <input type="text" placeholder="Enter text" onChange={handleChange} />;
    case "dropdown":
      return (
        <select onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
      );
    case "radio":
      return (
        <div className="radio-group">
          <label>
            <input type="radio" name="radio" value="1" onChange={handleChange} /> Option 1
          </label>
          <label>
            <input type="radio" name="radio" value="2" onChange={handleChange} /> Option 2
          </label>
        </div>
      );
    case "file":
      return <input type="file" onChange={handleChange} />;
    case "checkbox":
      return <input type="checkbox" onChange={handleChange} />;
    case "country":
      return (
        <select onChange={handleChange}>
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="UK">United Kingdom</option>
        </select>
      );
    case "date":
      return <input type="date" onChange={handleChange} />;
    case "phone":
      return <input type="tel" placeholder="Enter phone number" onChange={handleChange} />;
    default:
      return null;
  }
};

export default FieldRenderer;