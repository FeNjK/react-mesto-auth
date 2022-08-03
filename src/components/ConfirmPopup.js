import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onConfirm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      buttonText="Да"
      isOpen={`${isOpen ? "popup_activ" : ""}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
