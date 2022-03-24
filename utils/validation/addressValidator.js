import { Validator } from './validator';

export const AddressValidator = function (fields) {
  Validator.initialize();

  let result = { fields: {} };

  if (fields.fullname) {
    Validator.field({
      fieldName: 'Fullname',
      data: fields.fullname,
    }).required();
    result.fields['fullname'] = fields.fullname;
  }

  if (fields.street1) {
    Validator.field({
      fieldName: 'Street 1',
      data: fields.street1,
    }).required();
    result.fields['street1'] = fields.street1;
  }

  if (fields.street2) {
    Validator.field({
      fieldName: 'Street 2',
      data: fields.street2,
    });
    result.fields['street2'] = fields.street2;
  }

  if (fields.city) {
    Validator.field({
      fieldName: 'City',
      data: fields.city,
    }).required();
    result.fields['city'] = fields.city;
  }

  if (fields.state) {
    Validator.field({
      fieldName: 'State',
      data: fields.state,
    }).required();
    result.fields['state'] = fields.state;
  }

  if (fields.zip) {
    Validator.field({
      fieldName: 'Zip Code',
      data: fields.zip,
    }).required();
    result.fields['zip'] = fields.zip;
  }

  if (fields.country) {
    Validator.field({
      fieldName: 'Country',
      data: fields.country,
    });
    result.fields['country'] = fields.country;
  }

  if (Validator.errors.length !== 0) {
    result['errors'] = Validator.errors;
  }

  return result;
};
