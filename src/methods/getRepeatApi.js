export default async function getRepeatApi(api, num) {
  const arr = [];
  while (arr.length < num) {
    const res = await api();
    if (res.data.length === 0) continue;
    for (let i = 0; i < arr.length; i += 1) {
      if (res.data[0].ActivityID === arr[i].ActivityID) continue;
    }
    arr.push(res.data[0]);
  }
  return arr;
}
