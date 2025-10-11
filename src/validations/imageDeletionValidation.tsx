// validations/updateExpiryValidation.ts

import * as yup from "yup";

/**
 * Interface for updating image deletion expiry time.
 */
export interface IUpdateExpiry {
  imagesDeletion: string; 
}

/**
 * Validation schema for updating image deletion expiry time.
 */
export const updateExpiryValidation = yup.object().shape({
  imagesDeletion: yup.string().required("Expiry time is required"),
});
