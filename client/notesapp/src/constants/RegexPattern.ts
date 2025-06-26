const pattern: any = {
  EMAIL: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/,
  USER_NAME: /^[a-zA-Z0-9_-]{3,15}$/,
  NAME: /^[a-zA-Z\s.]{3,50}$/,
  PHONE_NUMBER: /^[0-9]{10,20}$/,
  AGE: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
  PASSWORD: /^.{8,15}$/
};

export default pattern

