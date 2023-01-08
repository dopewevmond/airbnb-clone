import { Formik, Form } from "formik";
import React from "react";
import * as yup from "yup";

interface Props {
  handleSubmit: (values: any) => void;
}

const initialFormValues = {
  listingImage: null,
};

const formValidationSchema = yup.object().shape({
  listingImage: yup.mixed().required("An image is required"),
});

export const UploadImgForm = ({ handleSubmit }: Props) => {
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
    >
      {({ touched, errors, setFieldValue }) => (
        <Form>
          <input
            type="file"
            name="listingImage"
            id="listingImage"
            accept="image/*"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              if (!e.currentTarget.files) return;
              setFieldValue("listingImage", e.currentTarget.files[0]);
            }}
          />
          {touched.listingImage && errors.listingImage && (
            <div className="small text-danger">{errors.listingImage}</div>
          )}
          <div className="mt-4 mb-2">
            <button className="btn btn-info btn-sm" type="submit">
              Upload image
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
