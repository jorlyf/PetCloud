import * as React from "react";
import useAuthPage, { AuthMode } from "./useAuthPage";
import InputField from "@components/InputField";

import styles from "./index.module.scss";

const Auth: React.FC = () => {
  const {
    authMode,
    wasInitLoginAttempt,
    isAuthorized,
    loginInput,
    setLoginInput,
    isLogging,
    passwordInput,
    setPasswordInput,
    handleSubmitLogin,
    handleSubmitRegister,
    handleChangeMode
  } = useAuthPage();

  if (!wasInitLoginAttempt) {
    return <div></div>
  }

  return (
    <div>
      <div className={styles.AuthForm}>
        <h1>{authMode == AuthMode.login ? "Вход" : "Регистрация"}</h1>
        <div className={styles.Inputs}>
          <InputField
            value={loginInput}
            setValue={setLoginInput}
            placeholder="Логин"
            isOneRow={true}
            disabled={isLogging || isAuthorized}
          />
          <InputField
            value={passwordInput}
            setValue={setPasswordInput}
            placeholder="Пароль"
            isOneRow={true}
            disabled={isLogging || isAuthorized}
          />
        </div>
        <div className={styles.Submit}>
          {authMode === AuthMode.login &&
            <>
              <button disabled={isLogging || isAuthorized} onClick={handleSubmitLogin}>Войти</button>
              <a onClick={() => handleChangeMode(AuthMode.registrate)}>У меня нет аккаунта</a>
            </>
          }
          {authMode === AuthMode.registrate &&
            <>
              <button disabled={isLogging || isAuthorized} onClick={handleSubmitRegister}>Зарегистрироваться</button>
              <a onClick={() => handleChangeMode(AuthMode.login)}>У меня есть аккаунт</a>
            </>
          }
        </div>
      </div>
    </div>
  )
}
export default Auth;
