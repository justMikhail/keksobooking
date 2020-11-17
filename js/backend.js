'use strict';

(() => {

  // ------------------------------------------------------------------------------------------------------------------------

  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`; // GET - метод для отправки данных на сервер
  const POST_URL = `https://21.javascript.pages.academy/keksobooking`; // POST - метод для передачи данных на сервер

  const TIMEOUT_IN_MS = 10000;

  const StatusCode = {
    OK: 200,
    ERROR_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

  // ------------------------------------------------------------------------------------------------------------------------

  const makeRequest = (onSuccess, onError, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          onError(`Ошибка в запросе! ${xhr.status} ${xhr.statusText}`);
          break;
        case StatusCode.NOT_FOUND:
          onError(`Страница не найдена! ${xhr.status} ${xhr.statusText}`);
          break;
        case StatusCode.SERVER_ERROR:
          onError(`Серверная ошибка! Попробуйте позже. ${xhr.status} ${xhr.statusText}`);
          break;

        default:
          onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка. Неполадки с интернет-соединением.`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (data) {
      xhr.open(`POST`, POST_URL); // Инициализация запроса
      xhr.send(data);
    } else {
      xhr.open(`GET`, GET_URL);
      xhr.send();
    }
  };

  //  ЗАГРУЗКА с сервера
  const load = (onSuccess, onError) => {
    makeRequest(onSuccess, onError);
  };

  // ВЫГРУЗКА на сервер
  const upLoad = (onSuccess, onError, data) => {
    makeRequest(onSuccess, onError, data);
  };

  const serverStatusMessage = (statuseMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #FF2400;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `24px`;
    node.style.color = `white`;
    node.style.textTransform = `uppercase`;
    node.style.padding = `7px`;

    node.textContent = statuseMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  // ЭКСПОРТ------------------------------------------------------------------------------------------------------------------

  window.backend = {
    load,
    upLoad,
    serverStatusMessage,
  };
})();
