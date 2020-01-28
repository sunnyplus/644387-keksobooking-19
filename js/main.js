var AD_AMOUNT = 8;
// var avatars = [
//   'img/avatars/default.png',
//   'img/avatars/user01.png',
//   'img/avatars/user02.png',
//   'img/avatars/user03.png',
//   'img/avatars/user04.png'
// ];
var offers = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке'
];
var addresses = [
  '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
  'Chiyoda-ku, Tōkyō-to 102-0091',
  '1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111'
];
var prices = [
  42000,
  53000,
  26999,
  85000
];
var rooms = [
  1,
  2,
  3,
  4,
  5
];
var guests = [
  1,
  2,
  6,
  8
];
var checkins = [
  '12:00',
  '13:00',
  '14:00'
];
var checkout = [
  '12:00',
  '13:00',
  '14:00'
];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var descriptions = [
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.'
];
var getRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
}

var similarAds = [];

var getSimilarAd = function (descriptions) {
  return {
    description: getRandomElement(descriptions)
  }
}

similarAds.push[getSimilarAd()];

console.log(similarAds);
