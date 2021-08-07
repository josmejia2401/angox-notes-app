//email validation
export const isEmailValid = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  //simple password validation
  export const isPasswordValid = (pass, min, max) => {
    if (pass.length < min) return false;
    if (pass.length > max) return false;
    //add other rules here
    return true;
  };
  
  export const isUsernameValid = (username, min, max) => {
    if (!username) return false;
    if (username.length < min) return false;
    if (username.length > max) return false;
    return true;
  };
  
  export const isValid = (username, min, max) => {
    if (!username) return false;
    if (username.length < min) return false;
    if (username.length > max) return false;
    return true;
  };
  