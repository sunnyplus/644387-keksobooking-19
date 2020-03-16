'use strict';

(function () {

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  var Code = {
    SUCCESS: 200,
    WRONG_REQUEST: 400,
    NOT_FOUND_ERROR: 404,
    NOT_AUTH_USER: 401,
    SERVER_ERROR: 500
  };

  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    request(xhr, onSuccess, onError);

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    request(xhr, onSuccess, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  var request = function (xhr, onSuccess, onError) {

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          window.map.similarAds = xhr.response; // перенести в коллбэк функцию
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
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
