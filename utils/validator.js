import validator from 'validator';

export const Validator = {
  field: function (fieldName, data) {
    this.fieldName = fieldName;
    this.data = data;
    this.result = {};
    return this;
  },
  isString: function (message) {
    if (typeof this.data !== 'string') {
      this.logError(message ? message : `${this.fieldName} is not a string`);
    }
    return this;
  },

  isNumber: function (message) {
    if (typeof this.data === 'string' && isNaN(Number(this.data))) {
      this.logError(
        message ? message : `${this.fieldName} is not a valid number`
      );
    } else {
      this.data = Number(this.data);
    }
    return this;
  },

  required: function (message) {
    if (typeof this.data === 'undefined') {
      this.logError(message ? message : `${this.fieldName} is required`);
    } else if (this.data.length === 0) {
      this.logError(message ? message : `${this.fieldName} is empty`);
    }
    return this;
  },
  minLength: function (minLength, message) {
    if (this.data.length < minLength) {
      this.logError(
        message
          ? message
          : `${this.fieldName} must contain atleast ${minLength} characters`
      );
    }
    return this;
  },
  maxLength: function (maxLength, message) {
    if (this.data.length > maxLength) {
      this.logError(
        message
          ? message
          : `${this.fieldName} must be less than ${maxLength} characters`
      );
    }

    return this;
  },
  isEmail: function (message) {
    if (!validator.isEmail(this.data)) {
      this.logError(message ? message : `${this.fieldName} is invalid`);
    }

    return this;
  },
  min: function (min, message) {
    if (this.data < min) {
      this.logError(
        message ? message : `${this.fieldName} must be greater than ${min - 1}`
      );
    }
    return this;
  },
  max: function (max, message) {
    if (Number(this.data) > max) {
      this.logError(
        message ? message : `${this.fieldName} must be less than ${max + 1}`
      );
    }
    return this;
  },
  logError: function (errorMessage) {
    let errorObject = {
      field: this.fieldName,
      message: errorMessage,
    };

    if (this.result) {
      if (this.result.errors) {
        this.result.errors.push(errorObject);
      } else {
        this.result = { errors: [errorObject] };
      }
    }
  },
};
