const emailRulesNew = [
  (value: string) => !!value || '',
  (value: string) => /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}/.test(value) || 'Please Enter a valid email address',
]
const required = (value: string) => !!value || 'This field is required';
const passwordRules = [
  (value: string) => /^\S*$/.test(value) || 'No spaces are allowed in the password',
  (value: string) => !!value || 'One A-Z and a-z and 0-9 and min 8 and max 15 characters',
  (value: string) =>
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,15}$/.test(value) || 'One A-Z, a-z, 0-9, special character and min 8 and max 15 characters',
]
const phoneValid = (value: string) => ((value.length >= 6 && value.length <= 15) || value.length === 0) || 'This field must have 8 to 15 numbers '
const maxLength = (value: string) => value.length <= 255 || "This field must contain less than 255 chars"; 
const minMaxLength = (value: string) => value.length <= 100 || "This field must contain less than 100 chars"; 
const zipLength = (value: string) => ((value.length >= 6 && value.length <= 15) || value.length === 0) || 'This field must have 8 to 15 numbers '
export { 
  emailRulesNew,
  required,
  passwordRules,
  phoneValid,
  maxLength,
  minMaxLength,
  zipLength
};