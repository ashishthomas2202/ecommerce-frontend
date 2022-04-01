import React from 'react';
import styles from './Input.module.scss';
import _ from 'lodash';

export default function Input({
  className,
  type = 'text',
  label = 'input',
  initialValue,
  customName,
  register,
  required,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  message,
  errors,
}) {
  let options = {};
  let name = customName ? customName : _.camelCase(label);
  if (required) {
    options['required'] = `${label} is required`;
  }
  if (min) {
    options['min'] = {
      value: min,
      message: `${label} must be atleast ${min}`,
    };
  }
  if (max) {
    options['max'] = {
      value: max,
      message: `${label} must be less than ${max}`,
    };
  }

  if (minLength) {
    options['minLength'] = {
      value: minLength,
      message: `${label} must contain atleast ${minLength} characters`,
    };
  }
  if (maxLength) {
    options['maxLength'] = {
      value: maxLength,
      message: `${label} must contain less than ${maxLength} characters`,
    };
  }

  if (pattern) {
    options['pattern'] = {
      value: pattern,
      message: `Please enter a valid ${label}`,
    };
  }

  return (
    <div className={className ? className : styles.Input}>
      {type !== 'checkbox' ? <label>{label}: </label> : ''}
      <input type={type} {...register(name, options)} />
      {type == 'checkbox' ? <label>{label}: </label> : ''}
      <p>{message ? message : ''}</p>
      <p> {errors ? (errors[name] ? errors[name].message : '') : ''}</p>
    </div>
  );
}
