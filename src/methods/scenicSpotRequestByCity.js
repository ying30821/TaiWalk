import axios from 'axios';
// import getAuthorizationHeader from './getApiToken';
import { getRandomNum } from './getRandomNum';
import { allCity } from './filters';

// axios.defaults.headers = getAuthorizationHeader();

const getRandomScenicByCity = () => {
  const randomCityIndex = getRandomNum(allCity.length);
  const randomScenicIndex = getRandomNum(30);
  // console.log(`city:${allCity[randomCityIndex]},index:${randomScenicIndex}`);
  const api = `${process.env.VUE_APP_BASEAPI}/ScenicSpot/${allCity[randomCityIndex].en}?%24filter=Picture%2FPictureUrl1%20ne%20null%20&%24top=1&%24skip=${randomScenicIndex}&%24format=JSON`;
  return axios.get(api);
};

export default getRandomScenicByCity;
