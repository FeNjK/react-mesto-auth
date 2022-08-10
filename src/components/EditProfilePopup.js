import PopupWithForm from "./PopupWithForm";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // Создадим функцию для отмены перезагрузки страницы при сабмите
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  // Обработчики изменения инпутов обновляют соответствующие стейты
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={`${isOpen ? "popup_activ" : ""}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-place" name="popup__input-place">
        <input
          type="text"
          name="profile_name"
          placeholder="Введите ваше имя"
          className="popup__input popup__input_content_name"
          id="profile_name"
          minLength="2"
          maxLength="40"
          required
          // Значение элемента «привязывается» к значению стейта
          value={name}
          onChange={handleChangeName}
        />
        <span
          className="popup__validation-message popup__validation-message_position_first"
          id="profile_name-error"
        />
        <input
          type="text"
          name="type_of_activity"
          placeholder="Укажите род ваших занятий"
          className="popup__input popup__input_content_activity-type"
          id="type_of_activity"
          minLength="2"
          maxLength="200"
          required
          // Значение элемента «привязывается» к значению стейта
          value={description}
          onChange={handleChangeDescription}
        />
        <span
          className="popup__validation-message popup__validation-message_position_second"
          id="type_of_activity-error"
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
