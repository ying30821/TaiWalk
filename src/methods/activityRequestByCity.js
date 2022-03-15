import axios from 'axios';
import { getRandomNum } from './getRandomNum';
import { allCity } from './filters';

const getRandomActivityByCity = () => {
  const randomCityIndex = getRandomNum(allCity.length);
  const randomScenicIndex = getRandomNum(10);
  const api = `${process.env.VUE_APP_BASEAPI}/Activity/${allCity[randomCityIndex].en}?%24filter=Picture%2FPictureUrl1%20ne%20null%20&%24orderby=StartTime&%24top=1&%24skip=${randomScenicIndex}&%24format=JSON`;
  return axios.get(api);
};
export default getRandomActivityByCity;
