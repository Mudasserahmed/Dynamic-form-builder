import React from "react";

const buildHierarchicalData = (formFields, formData) => {
  if (!Array.isArray(formFields)) {
    return {}; 
  }

  return formFields.reduce((acc, field) => {
    if (field.type === "section" && field.children) {
      acc[field.label] = buildHierarchicalData(field.children, formData);
    } else {
      acc[field.label] = formData[field.id] || "Not provided";
    }
    return acc;
  }, {});
};

const FormDataDisplay = ({ formFields, formData }) => {
  const hierarchicalData = buildHierarchicalData(formFields, formData);

  return (
    <div className="form-data">
      <h2>Form Data (Hierarchical JSON)</h2>
      <pre>{JSON.stringify(hierarchicalData, null, 2)}</pre>
    </div>
  );
};

export default FormDataDisplay;