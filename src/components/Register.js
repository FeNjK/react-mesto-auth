import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    /* Пример из теории */
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  // Создадим функцию для отмены перезагрузки страницы при сабмите
  function handleSubmit(e) {
    e.preventDefault();
    // здесь обрабатываем вход в систему
    onRegister(registerData);
  }

  return (
    <div className="register">
      <h3 className="register__title">Регистрация</h3>
      <form
        className="register__form"
        onSubmit={handleSubmit}
        /* noValidate */ 
        autoComplete="off"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register__input"
          id="email"
          minLength="6"
          maxLength="40"
          required
          value={registerData.email}
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
          className="register__input"
          id="password"
          minLength="6"
          maxLength="40"
          required
          value={registerData.password}
          onChange={handleChange}
        />
        {/* Заготовка под валидацию формы по аналогии с попапами*/}
        {/* <span
          className="popup__validation-message popup__validation-message_position_second"
          id="password-error"
        /> */}
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>
      <Link className="register__link" to="/sing-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
