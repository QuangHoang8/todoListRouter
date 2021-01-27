export const addName = (name) => ({
  type: "addName",
  payload: {
    userLogin: name,
  },
});
