export interface Attribute {
  section: AttributeSection;
  attribute: string;
  type: AttributeType;
  description?: string;
  required: boolean;
}

export enum AttributeType {
  Slider = "slider",
  Option = "option",
  Checkbox = "checkbox",
}

export enum AttributeSection {
  Skills = "Skills",
  Traits = "Traits",
  Qualifications = "Qualifications",
  Details = "Details",
}
