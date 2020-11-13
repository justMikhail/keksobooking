'use strict';

(function () {

  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`; // GET - метод для отправки данных на сервер
  const POST_URL = `https://21.javascript.pages.academy/keksobooking`; // POST - метод для передачи данных на сервер

  const StatusCode = {
    OK: 200,
    ERROR_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

  let TIMEOUT_IN_MS = 10000;


  const load = (onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
