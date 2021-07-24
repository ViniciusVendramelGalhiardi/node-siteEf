import SecureLS from "secure-ls";

const secure = new SecureLS({
  isCompression: false,
  encodingType: process.env.REACT_APP_SLS_ENCODING_TYPE,
  encryptionSecret: process.env.REACT_APP_SLS_SECRET,
});

export default secure;
