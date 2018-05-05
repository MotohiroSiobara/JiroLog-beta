export const messageByErrorCodeWithSignUp = (errorCode) => {
  if (errorCode == 'auth/email-already-in-use') {
    return { type: 'email', message: 'そのメールアドレスはすでに登録済みです' };
  }

  if (errorCode == 'auth/invalid-email') {
    return { type: 'email', message: '不正なメールアドレスです' };
  }

  if (errorCode == 'auth/weak-password') {
    return { type: 'password', message: 'パスワードが弱すぎます。４文字以上の英数字で登録してください'};
  }

  if (errorCode == 'auth/operation-not-allowed') {
    return { type: 'all', message: '原因不明のエラーです' };
  }

  return {}; // エラーコードに引っかからないがエラーが発生した
};

export const messageByErrorCodeWithSignIn = (errorCode) => {
  console.log(errorCode);
  if (errorCode == 'auth/invalid-email') {
    return { type: 'email', message: 'そのメールアドレスは登録されていません' };
  }

  if (errorCode == 'auth/user-disabled') {
    return { type: 'email', message: 'そのメールアドレスは登録されていません' };
  }

  if (errorCode == 'auth/wrong-password') {
    return { type: 'password', message: 'パスワードに誤りがあります'};
  }

  if (errorCode == 'auth/user-not-found') {
    return { type: 'email', message: 'ユーザーが存在しません' };
  }

  return {}; // エラーコードに引っかからないがエラーが発生した
};
