import editingPen from "../images/editing-pen.svg";
import buttonVector from "../images/button-vector.svg";
import Card from "./Card.js";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  /**
   * Подписываемся на контекст CurrentUserContext
   * currentUser - значения контекста
   */
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <article className="profile-info">
          <img
            className="profile-info__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <button
            className="profile-info__avatar-button"
            title="Редактирование аватара"
            onClick={onEditAvatar}
            aria-label="Кнопка редактирование аватара"
          >
            <img
              className="profile-info__avatar-pen"
              src={editingPen}
              alt="Перо редактирования аватара пользователя"
            />
          </button>

          <div className="profile-info__data">
            <div className="profile-info__single-level">
              <h1 className="profile-info__name">{currentUser.name}</h1>
              <button
                className="profile-info__editing-button"
                title="Редактирование профиля"
                onClick={onEditProfile}
                type="button"
                aria-label="Кнопка редактирование профиля"
              >
                <img
                  className="profile-info__editing-pen"
                  src={editingPen}
                  alt="Перо редактирования имени и рода деятельности"
                />
              </button>
            </div>
            <p className="profile-info__activity-type">{currentUser.about}</p>
          </div>
        </article>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить фотографии"
          onClick={onAddPlace}
        >
          <img
            className="profile__button-vector"
            src={buttonVector}
            alt="Добавить фотографии"
          />
        </button>
      </section>

      {/* Из старого проекта скопировали разметку карточки, 
      находившуюся внутри тега template, и используйте её 
      внутри JSX-итерации по массиву cards */}

      <section className="photo-library">
        <ul className="elements">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                name={card.name}
                link={card.link}
                likes={card.likes}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
