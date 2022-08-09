import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
//import ConfirmPopup from "./ConfirmPopup.js";
import { useHistory, Route, Switch, Redirect } from "react-router-dom"
import ProtectedRoute from './ProtectedRoute.js';
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import apiAuth from "../utils/ApiAuth.js";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState("");
  const [registration, setRegistration] = useState(null);
  const [infoToolTipMessage, setInfoToolTipMessage] = useState(false);

  const history = useHistory();

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    apiAuth.getEmail(jwt).then((data) => {
        console.log(data.data.email);
        setAuthorizationEmail(data.data.email);
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);

  function handleLogin(data) {
    apiAuth
      .autorise(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.jwt);

        history.push("/");
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при авторизации пользователя ${err}`
        );
      })
  }

  function handleRegister(data) {
    apiAuth
      .register(data)
      .then(() => {
        setRegistration(true);
        handleInfoToolTipMessage();
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при регистрации пользователя ${err}`
        );
        setRegistration(false);
        handleInfoToolTipMessage();
        history.push("/sign-up");
      })
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  // Используем стейт для данных из Api
  useEffect(() => {
    // Запрос к Api за информацией о пользователе
    // и массиве карточек выполняется единожды, при монторивании
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(
          `Тут какая-то ошибка с получением пользовательских данных ${err}`
        );
      });

    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        console.log(`Тут какая-то ошибка с получением массива карточек ${err}`);
      });
  }, []);
  // а вот если бы мы не поставили пустой массив последним
  // то вызоб совершался далеко не единожды */

  // Функции взаимодействия с карточками
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Тут какая-то ошибка с лайком карточки ${err}`);
      });
  }

  // Сделано по аналогии с функцией лайка карточки
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Тут какая-то ошибка с удалением карточки ${err}`);
      });
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Тут какая-то ошибка с обновлением пользовательских данных ${err}`
        );
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .setUserAvatar(userAvatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Тут какая-то ошибка с обновлением аватара пользователя ${err}`
        );
      });
  }

  function handleAddPlace(placeData) {
    api
      .addNewCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Тут какая-то ошибка с добавлением новой карточки ${err}`
        );
      });
  }

  // Функции взаимодействия с попапами
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  /* function handleCardDelete(card) {
    setIsConfirmPopupOpen(card);
  } */

  function handleInfoToolTipMessage() {
    setInfoToolTipMessage(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoToolTipMessage(false);
    setSelectedCard(null);
    /* setIsConfirmPopupOpen(null); */
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        loggedIn={isLoggedIn}
        signOut={handleSignOut}
        authorizationEmail={authorizationEmail}
      />
      <Switch>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={isLoggedIn}
          component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
        />
        <Route>
          {isLoggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/" />}
        </Route>
      </Switch>
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <InfoTooltip
        isOpen={infoToolTipMessage}
        onClose={closeAllPopups}
        isRegistrationGood={registration}
      />
      {/* Заготовка реализации функций удаления карточек */}
      {/*Что-то я тут наворотил (по аналогии...)*/}
      {/* <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onConfirm={handleConfirmDelete}
        
      /> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
