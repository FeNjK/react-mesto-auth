import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? "element__trash_visible" : "element__trash_hidden"}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__mark ${isLiked ? "element__mark_active" : ""}`
  )

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__mark-block">
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleCardLike}
        />
        <p className="element__mark-counter">{card.likes.length}</p>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleCardDelete}
      />
    </li>
  );
}

export default Card;
