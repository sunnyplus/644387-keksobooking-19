'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';

  var Code = {
    SUCCESS: 200,
    WRONG_REQUEST: 400,
    NOT_FOUND_ERROR: 404,
    NOT_AUTH_USER: 401,
    SERVER_ERROR: 500
  };

  window.backend = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.WRONG_REQUEST:
          error = 'Неверный запрос';
          break;

        case Code.NOT_AUTH_USER:
          error = 'Пользователь не авторизован';
          break;

        case Code.NOT_FOUND_ERROR:
          error = 'Ничего не найдено';
          break;

        case Code.SERVER_ERROR:
          error = 'Ошибка сервера';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
