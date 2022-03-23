import validator from 'validator';

export const Validator = {
  errors: [],
  initialize: function () {
    this.fieldName = null;
    this.data = null;
    this.empty = null;
    this.result = null;
    this.errors = [];
    return this;
  },
  field: function (args) {
    let defaults = {
      fieldName: 'Field',
      data: '',
    };
    let params = { ...defaults, ...args };

    this.fieldName = params.fieldName;
    this.data = params.data;
    this.empty = params.data && params.data.length === 0;
    this.result = {};

    return this;
  },
  isString: function (args) {
    let defaults = { message: `${this.fieldName} is not a string` };
    let params = { ...defaults, ...args };
    if (typeof this.data !== 'string') {
      this.logError(params.message);
    }
    return this;
  },

  isNumber: function (args) {
    let defaults = { message: `${this.fieldName} is not a valid number` };
    let params = { ...defaults, ...args };

    if (typeof this.data === 'string' && isNaN(Number(this.data))) {
      this.logError(params.message);
    } else {
      this.data = Number(this.data);
    }
    return this;
  },
  required: function (args) {
    let defaults = {
      state: true,
      message: `${this.fieldName} is required`,
    };
    let params = { ...defaults, ...args };

    if (params.state) {
      if (typeof this.data === 'undefined') {
        this.logError(params.message);
      } else if (this.empty) {
        this.logError(`${this.fieldName} is empty`);
      }
    }
    return this;
  },
  minLength: function (args) {
    let defaults = {
      minLength: 0,
    };
    let params = { ...defaults, ...args };

    if (!this.empty) {
      if (this.data && this.data.length < params.minLength) {
        this.logError(
          args.message
            ? args.message
            : `${this.fieldName} must contain atleast ${params.minLength} characters`
        );
      }
    }
    return this;
  },
  maxLength: function (args) {
    let defaults = {
      maxLength: 0,
    };
    let params = { ...defaults, ...args };

    if (!this.empty) {
      if (this.data && this.data.length > params.maxLength) {
        this.logError(
          args.message
            ? args.message
            : `${this.fieldName} must be less than ${params.maxLength} characters`
        );
      }
    }

    return this;
  },
  isEmail: function (args) {
    let defaults = { message: `${this.fieldName} is invalid` };
    let params = { ...defaults, ...args };

    if (!this.empty) {
      if (!validator.isEmail(this.data)) {
        this.logError(params.message);
      }
    }

    return this;
  },
  min: function ({ min, message }) {
    if (!this.empty) {
      if (this.data < min) {
        this.logError(
          message
            ? message
            : `${this.fieldName} must be greater than ${min - 1}`
        );
      }
    }
    return this;
  },
  max: function ({ max, message }) {
    if (!this.empty) {
      if (Number(this.data) > max) {
        this.logError(
          message ? message : `${this.fieldName} must be less than ${max + 1}`
        );
      }
    }
    return this;
  },
  logError: function (errorMessage) {
    let errorObject = {
      field: this.fieldName,
      message: errorMessage,
    };

    this.errors.push(errorObject);
  },
};
