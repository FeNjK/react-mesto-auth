import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // записываем объект, возвращаемый хуком, в переменную
  const avatarRef = useRef();

  // при открытии попапа сбрасываем поле ввода
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={`${isOpen ? "popup_activ" : ""}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-place" name="popup__input-place">
        <input
          type="url"
          name="profile-avatar"
          placeholder="Введите адрес изображения"
          className="popup__input popup__input_content_avatar"
          id="profile-avatar"
          required
          ref={avatarRef}
        />
        <span
          className="popup__validation-message popup__validation-message_position_first"
          id="profile-avatar-error"
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
