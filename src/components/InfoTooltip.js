import luckImage from "../images/luck.jpg";
import unLuckImage from "../images/failure.jpg";

function InfoTooltip({ isOpen, onClose, isRegistrationGood }) {
  return (
    <div className={`popup popup_animation ${isOpen && "popup_activ"}`}>
      <div className="popup__content">
        <button
          className={`popup__close-button`}
          type="button"
          title="Закрыть окно"
          onClick={onClose}
        />
        <img
          className="popup__registration-result"
          src={isRegistrationGood ? luckImage : unLuckImage}
          alt="Индикатор состояния регистрации"
        />
        <h3 className="popup__registration-message">
          {isRegistrationGood
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;