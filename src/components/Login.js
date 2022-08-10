import { useState } from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    /* Пример из теории */
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  // Создадим функцию для отмены перезагрузки страницы при сабмите
  function handleSubmit(e) {
    e.preventDefault();
    // здесь обрабатываем вход в систему
    onLogin(loginData);
  }

  return (
    <div className="login">
      <h3 className="login__title">Вход</h3>
      <form
        className="login__form"
        onSubmit={handleSubmit}
        /* noValidate */ 
        autoComplete="off"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="login__input"
          id="email"
          minLength="6"
          maxLength="40"
          required
          value={loginData.email || ""}
          onChange={handleChange}
        />
        {/* Заготовка под валидацию формы по аналогии с попапами*/}
        {/* <span
          className="popup__validation-message popup__validation-message_position_first"
          id="email-error"
        /> */}
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="login__input"
          id="password"
          minLength="6"
          maxLength="40"
          required
          value={loginData.password || ""}
          onChange={handleChange}
        />
        {/* Заготовка под валидацию формы по аналогии с попапами*/}
        {/* <span
          className="popup__validation-message popup__validation-message_position_second"
          id="password-error"
        /> */}
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
