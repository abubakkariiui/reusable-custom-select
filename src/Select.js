// Change the import statement in Select.tsx
import { mergeClasses } from "./helper";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";

type SelectOption = {
  label: string,
  value: string,
};

type SelectProps = {
  options: SelectOption[],
  onChange: (value: string) => void,
  currentValue?: string,
  placeholder?: string,
  label?: string,
  disabled?: boolean,
  search?: boolean,
  textStyles?: string,
  iconStyles?: string,
};

const Select = (props: SelectProps) => {
  const {
    options,
    onChange,
    currentValue,
    placeholder,
    label,
    textStyles,
    iconStyles,
    disabled = false,
    search = false,
  } = props;

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const AllOptions = () => {
    if (disabled) return;

    const handleOptionClick = (option: SelectOption) => {
      setSearchTerm(option.label);
      onChange(option.value);
      setOpen(false);
    };

    const filteredOptions = search
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    if (!filteredOptions?.length)
      return (
        <div className="p-2 text-center text-secondary">
          No options available
        </div>
      );

    return filteredOptions.map((option) => {
      return (
        <div
          key={option.value}
          onClick={() => handleOptionClick(option)}
          className={mergeClasses(
            "option flex cursor-pointer items-center justify-between p-3 hover:bg-secondary",
            currentValue === option.value
              ? "bg-gray-200 font-bold text-primary"
              : ""
          )}
        >
          <span className="capitalize">{option.label}</span>
        </div>
      );
    });
  };

  const SearchInput = useMemo(() => {
    if (!search)
      return <div className={textStyles}>{placeholder || "Select..."}</div>;

    return (
      <input
        type="text"
        placeholder={placeholder || "Search ..."}
        autoFocus
        className="w-full border-none p-0 focus:outline-none focus:ring-0"
        value={searchTerm}
        onChange={(event) => {
          const value = event.target.value;
          setSearchTerm(value);
          if (value.length) setOpen(true);
        }}
      />
    );
  }, [searchTerm, setSearchTerm]);

  const SingleSelectIcon = ({ open }: { open: boolean }) => {
    if (search && searchTerm?.length)
      return (
        <XMarkIcon
          className={mergeClasses("h-6 w-6", iconStyles)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSearchTerm("");
            if (currentValue) onChange(currentValue);
          }}
        />
      );
    if (!open || disabled)
      return (
        <ChevronDownIcon className={mergeClasses("h-6 w-6", iconStyles)} />
      );

    return <ChevronUpIcon className="h-6 w-6" />;
  };

  const DisplayLabel = () => {
    if (!label) return null;
    return (
      <label className="mb-3 flex items-center justify-start font-semibold capitalize">
        {label}
      </label>
    );
  };

  const DropDownOptions = () => {
    if (!open) return null;
    return (
      <div className="absolute left-0 z-10 max-h-96 w-full overflow-auto rounded border border-gray-300 bg-white">
        <AllOptions />
      </div>
    );
  };

  const DropDownInput = () => {
    const handleClick = () => setOpen(!open);
    return (
      <div
        onClick={handleClick}
        className="w-full cursor-pointer rounded-lg border border-gray-300"
      >
        <div className="flex items-center justify-between p-2">
          {SearchInput}
          <SingleSelectIcon open={open} />
        </div>
      </div>
    );
  };

  return (
    <div className="relative left-0 top-0 w-full min-w-[192px]">
      <DisplayLabel />
      <DropDownInput />
      <DropDownOptions />
    </div>
  );
};

export { Select };
