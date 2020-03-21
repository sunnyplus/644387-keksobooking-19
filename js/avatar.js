'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // var setUserAvatar = function (fileChooser, preview) {
  //   var onFileChoose = function () {
  //     var file = fileChooser.files[0];
  //     var fileName = file.name.toLowerCase();
  //     var matches = FILE_TYPES.some(function (it) {
  //       return fileName.endsWith(it);
  //     });

  //     if (matches) {
  //       var reader = new FileReader();
  //       reader.addEventListener('load', function () {
  //         preview.src = reader.result;
  //       });

  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   fileChooser.addEventListener('change', onFileChoose);
  // };

  var setUserAvatar = function (fileChooser, preview) {
    var onFileChoose = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (preview === undefined) {
            preview = document.createElement('img');
            document.querySelector('.ad-form__photo').append(preview);
            preview.width = 40;
          }
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    };

    fileChooser.addEventListener('change', onFileChoose);
  };

  window.avatar = {
    setUserAvatar: setUserAvatar
  };
})();
