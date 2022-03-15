export function date(time) {
  const localDate = time.split('T')[0];
  const newDate = localDate.split('-').join('/');
  return newDate;
}

export const allCity = [
  { en: 'Taipei', tw: '臺北市' },
  { en: 'NewTaipei', tw: '新北市' },
  { en: 'Keelung', tw: '基隆市' },
  { en: 'YilanCounty', tw: '宜蘭縣' },
  { en: 'Taoyuan', tw: '桃園市' },
  { en: 'HsinchuCounty', tw: '新竹縣' },
  { en: 'Hsinchu', tw: '新竹市' },
  { en: 'MiaoliCounty', tw: '苗栗縣' },
  { en: 'Taichung', tw: '臺中市' },
  { en: 'ChanghuaCounty', tw: '彰化縣' },
  { en: 'NantouCounty', tw: '南投縣' },
  { en: 'YunlinCounty', tw: '雲林縣' },
  { en: 'ChiayiCounty', tw: '嘉義縣' },
  { en: 'Chiayi', tw: '嘉義市' },
  { en: 'Tainan', tw: '臺南市' },
  { en: 'Kaohsiung', tw: '高雄市' },
  { en: 'PingtungCounty', tw: '屏東縣' },
  { en: 'HualienCounty', tw: '花蓮縣' },
  { en: 'TaitungCounty', tw: '臺東縣' },
  { en: 'PenghuCounty', tw: '澎湖縣' },
  { en: 'KinmenCounty', tw: '金門縣' },
  { en: 'LienchiangCounty', tw: '連江縣' },
];
