export const userValidateWithSignUp = (state) => {
  const { email, password, confirmPassword } = state;

  if (email.text && password.text && confirmPassword.text) {

    if (!equalConfirmPassword(password.text, confirmPassword.text)) {
      state.confirmPassword.errorMessage = 'パスワードと一致しません';
    }

  } else {

    if (email.text.length === 0) { state.email.errorMessage = '必須項目です'; }
    if (password.text.length === 0) { state.password.errorMessage = '必須項目です'; }
    if (confirmPassword.text.length === 0) { state.confirmPassword.errorMessage = '必須項目です'; }
  }

  return state;
};

const equalConfirmPassword = (password, confirmPassword) => {
  if (password == confirmPassword) {
    return true;
  }

  return false;
};
