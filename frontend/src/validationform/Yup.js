import * as Yup from "yup";


export const reviewform = Yup.object({
  name: Yup.string().min(4).max(25).required("Please Enter Your Name"),
  email: Yup.string().nullable().email().required("Please Enter Your Email"),
  comment: Yup.string().required("Please write your comment"),
});

export const buyerInfo = Yup.object().shape({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  address: Yup.string().required('Address is required'),
  contactno: Yup.string().required('Contact Number is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipcode: Yup.string().required('Zip Code is required'),
  comment: Yup.string(),
});

