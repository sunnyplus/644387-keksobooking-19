'use strict';

(function () {

  window.load = function (url, onSuccess, onError) {
    var url = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {

      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.responseText);
          break;
        case 400:
          error = 'Неверный запрос';
          break;

        case 401:
          error = 'Пользователь не авторизован';
          break;

        case 404:
          error = 'Ничего не найдено';
          break;

        case 500:
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

    xhr.open('GET', url);
    xhr.send();
  };
})();
