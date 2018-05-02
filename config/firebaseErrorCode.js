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

  return {}; // エラーコードに引っかからないがエラーが発生した
};
