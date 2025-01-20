export interface BaseAttribute {
  section: AttributeSection;
  attribute: string;
  description?: string;
  required: boolean;
}

// Discriminated union based on `type`
export type Attribute = OptionAttribute | SliderAttribute | CheckboxAttribute;

// Option Attribute (requires an array of strings)
export interface OptionAttribute extends BaseAttribute {
  type: AttributeType.Option;
  criteria: {
    options: string[]; // Must provide options
  };
}

// Slider Attribute (requires min and max scoring)
export interface SliderAttribute extends BaseAttribute {
  type: AttributeType.Slider;
  criteria: {
    min: number; // Minimum score (e.g., 0)
    max: number; // Maximum score (e.g., 100)
  };
}

// Checkbox Attribute (no special criteria needed)
export interface CheckboxAttribute extends BaseAttribute {
  type: AttributeType.Checkbox;
  criteria?: undefined; // No configuration allowed
}

// Enums for Attribute Types
export enum AttributeType {
  Slider = "slider",
  Option = "option",
  Checkbox = "checkbox",
}

// Enums for Attribute Sections
export enum AttributeSection {
  Skills = "Skills",
  Traits = "Traits",
  Qualifications = "Qualifications",
  Details = "Details",
}
