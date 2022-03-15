export function getRandomNum(maxNum) {
  const randomNum = Math.floor(Math.random() * maxNum);
  return randomNum;
}
export function getMultiRandomNum(maxNum, getCount) {
  let randomNum = '';
  const arr = [];
  for (let i = 0; i < getCount; i += 1) {
    randomNum = Math.round(Math.random() * maxNum);
    for (let j = 0; j < arr.length; j += 1) {
      if (arr[j] === randomNum) {
        arr.splice(j, 1);
        i -= 1;
      }
    }
    arr.push(randomNum);
  }
  return arr;
}
// export const getRandomCitySpot = () => {
//   const cityIndex = getRandomNum(allCity.length, 1);
//   const spotIndex = getRandomNum(10, 1);
//   return { city: allCity[cityIndex], spotIndex };
// };
