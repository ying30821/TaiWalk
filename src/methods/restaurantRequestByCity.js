import axios from 'axios';
import { getRandomNum } from './getRandomNum';
import { allCity } from './filters';

const getRandomRestaurantByCity = () => {
  const randomCityIndex = getRandomNum(allCity.length);
  const randomScenicIndex = getRandomNum(30);
  const api = `${process.env.VUE_APP_BASEAPI}/Restaurant/${allCity[randomCityIndex].en}?%24filter=Picture%2FPictureUrl1%20ne%20null%20&%24top=1&%24skip=${randomScenicIndex}&%24format=JSON`;
  return axios.get(api);
};
export default getRandomRestaurantByCity;
