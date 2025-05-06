export const checkValidData = (email, password, name, signup) => {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const validpassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if ((!name || name.length < 3) && !signup) return "Name is not valid";
  if (!validEmail) return "Email Id not valid";
  if (!validpassword) return "Password is not valid";

  return null;
};
