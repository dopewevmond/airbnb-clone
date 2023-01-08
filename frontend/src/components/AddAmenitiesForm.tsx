import { Formik, Form, Field } from "formik";

interface IFormValues {
  allowsPets: boolean;
  allowsSmoking: boolean;
  allowsEvents: boolean;
  hasWashingMachine: boolean;
  hasTV: boolean;
  hasWifi: boolean;
  hasWorkspace: boolean;
  hasKitchen: boolean;
  hasFreeParking: boolean;
  hasSecurityCam: boolean;
  hasAirConditioning: boolean;
  hasSmokeAlarm: boolean;
}

const initialValues: IFormValues = {
  allowsEvents: false,
  allowsPets: false,
  allowsSmoking: false,
  hasWashingMachine: false,
  hasTV: false,
  hasWifi: false,
  hasWorkspace: false,
  hasKitchen: false,
  hasFreeParking: false,
  hasSecurityCam: false,
  hasAirConditioning: false,
  hasSmokeAlarm: false,
};

interface CheckBoxFieldProps {
  name: string;
  labelText: string;
}
const CheckboxField = ({ name, labelText }: CheckBoxFieldProps) => (
  <div className="form-check pb-4">
    <Field type="checkbox" name={name} className="form-check-input" id={name} />
    <label htmlFor={name} className="form-check-label">
      {labelText}
    </label>
  </div>
);

interface Props {
  handleSubmit: (values: any) => void;
}

export const AddAmenitiesForm = ({ handleSubmit }: Props) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <CheckboxField
            name="allowsEvents"
            labelText="Events can be hosted here"
          />
          <CheckboxField name="allowsPets" labelText="Pets are allowed here" />
          <CheckboxField
            name="allowsSmoking"
            labelText="Smoking is allowed here"
          />
          <CheckboxField
            name="hasWashingMachine"
            labelText="Washing machine available"
          />
          <CheckboxField name="hasTv" labelText="TV available" />
          <CheckboxField name="hasWifi" labelText="Wifi available" />
          <CheckboxField name="hasWorkspace" labelText="Workspace available" />
          <CheckboxField name="hasKitchen" labelText="Kitchen available" />
          <CheckboxField
            name="hasFreeParking"
            labelText="Free parking available"
          />
          <CheckboxField
            name="hasSecurityCam"
            labelText="Security camera available"
          />
          <CheckboxField
            name="hasAirConditioning"
            labelText="Air conditioning available"
          />
          <CheckboxField
            name="hasSmokeAlarm"
            labelText="Smoke alarm available"
          />

          <button type="submit" className="btn btn-warning btn-sm">
            Add amenities
          </button>
        </Form>
      )}
    </Formik>
  );
};
