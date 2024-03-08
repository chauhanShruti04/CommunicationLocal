import React from 'react';

export const Validation = (values) => {
  let errors = {};
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  
  if (!values.username) {
    errors.username = 'Name is Required';
  } else if (values.username.length < 5) {
    errors.username = 'Name must be more than 5 char';
  }

  if (!values.password) {
    errors.password = 'Password is Required';
  } else if (values.password.length < 8) {
    errors.password = 'Please enter  password more than 8 char';
  }

  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!pattern.test(values.email)) {
    errors.email = 'Email is not valid';
  }

  if (!values.conpassword) {
    errors.conpassword = 'Confirm Password is Required';
  } else if ( values.password.length < 8) {
    errors.conpassword = 'Please enter password more than 8 char';
  } else if (values.conpassword !== values.password) {
    errors.conpassword = 'Passwords do not match';
  }

  return errors;
};

export const isUserValid = (values) => {
  if (!values.username || values.username.length < 5) {
    return false;
  }
  return true;
};

export const isEmailValid = (values) => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  if (!values.email || !pattern.test(values.email)) {
    return false;
  }
  return true;
};

export const isPasswordValid = (values) => {
 
  if (!values.password || values.password.length < 5) {
    return false;
  }
  return true;
};

export const isConfirmPasswordValid = (values) => {
  if (
    !values.conpassword ||
    values.conpassword.length < 8 ||
    values.conpassword !== values.password
  ) {
    return false;
  }
  return true;
};
