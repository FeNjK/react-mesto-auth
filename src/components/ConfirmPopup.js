import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onConfirm, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(card);
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
