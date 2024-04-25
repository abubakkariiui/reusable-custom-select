// Import the Select component
import { Select } from "./Select";
import React, { useState } from "react";

// Define your parent component where you want to use the Select component
const App = () => {
  // Define options for the Select component
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  // Define a state to hold the selected value
  const [selectedValue, setSelectedValue] = useState("");

  // Define a function to handle onChange event of the Select component
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      {/* Use the Select component */}
      <Select
        options={options}
        onChange={handleSelectChange}
        currentValue={selectedValue}
        placeholder="Select an option"
        label="Select an option"
        // search={true}
      />
      {/* Display the selected value */}
      <p>Selected Value: {selectedValue}</p>
    </div>
  );
};

// Export the ParentComponent
export default App;
