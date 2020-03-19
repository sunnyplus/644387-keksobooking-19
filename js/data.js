'use strict';

(function () {
  var onSuccess = function (similarAds) {
    window.data.similarAds = similarAds;
    window.map.drawSimilarAds(similarAds);
  };

  window.data = {
    onSuccess: onSuccess
  };
})();
