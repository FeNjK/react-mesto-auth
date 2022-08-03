function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_animation popup_task_show-image ${card && "popup_activ"}`}
    >
      <div className="popup__increase-content">
        <button
          className="popup__close-button popup__close-button_window_show-image"
          type="button"
          title="Закрыть окно"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={!card ? "#" : card.link}
          alt={!card ? "" : card.name}
        />
        <p className="popup__caption">{!card ? "" : card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;