import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // не понимаю почему так...
  // делал по анаалогии с редактированием форм.
  // думаю над очисткой полей ввода
  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-new-card"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={`${isOpen ? "popup_activ" : ""}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-place" name="popup__input-place">
        <input
          type="text"
          name="card-title"
          placeholder="Название"
          className="popup__input popup__input_content_image-title"
          id="card-title"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleChangeName}
        />
        <span
          className="popup__validation-message popup__validation-message_position_first"
          id="card-title-error"
        />
        <input
          type="url"
          name="picture-link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_content_image-link"
          id="picture-link"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span
          className="popup__validation-message popup__validation-message_position_second"
          id="picture-link-error"
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
