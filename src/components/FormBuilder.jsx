import React from "react";
import FieldRenderer from "./FieldRenderer";

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

const FormBuilder = ({ formFields, setFormFields, handleFormChange, removeField, errors }) => {
  const addField = (type, parentId = null) => {
    const newField = { type, id: Date.now(), label: `Field ${formFields.length + 1}` };
    if (type === "section") {
      newField.children = []; 
    }

    if (parentId) {
      setFormFields((prevFields) =>
        prevFields.map((field) => {
          if (field.id === parentId) {
            return { ...field, children: [...(field.children || []), newField] };
          } else if (field.type === "section" && field.children) {
            return { ...field, children: addFieldToChildren(field.children, parentId, newField) };
          }
          return field;
        })
      );
    } else {
      setFormFields([...formFields, newField]);
    }
  };

  const addFieldToChildren = (children, parentId, newField) => {
    return children.map((child) => {
      if (child.id === parentId) {
        return { ...child, children: [...(child.children || []), newField] };
      } else if (child.type === "section" && child.children) {
        return { ...child, children: addFieldToChildren(child.children, parentId, newField) };
      }
      return child;
    });
  };

  return (
    <div className="form-builder">
      <h2>Add Fields</h2>
      <div className="field-buttons">
        {fieldTypes.map((field) => (
          <button key={field.type} onClick={() => addField(field.type)}>
            {field.label}
          </button>
        ))}
      </div>
      <div className="form-preview">
        <h2>Form Preview</h2>
        {formFields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            handleFormChange={handleFormChange}
            removeField={removeField}
            errors={errors}
            addField={addField}
          />
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;