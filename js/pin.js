'use strict';

(function () {

  var AD_AMOUNT = 8;

  var getSimilarAds = function () {
    var similarAds = [];
    for (var k = 1; k <= AD_AMOUNT; k++) {
      similarAds.push(window.data.getSimilarAd(k));
    }
    return similarAds;
  };

  var similarAds = getSimilarAds();

  window.pin = {
    similarAds: similarAds
  };
})();
