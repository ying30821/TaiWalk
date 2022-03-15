export default function repackDetailImg(item) {
  const arr = [];
  if (!item.Picture.PictureUrl1) {
    arr.push({
      id: Date.now(),
      url: require('@/assets/images/NoImage-1100x400.png'),
      alt: 'noImage',
    });
  } else {
    arr.push({
      id: Date.now(),
      url: item.Picture.PictureUrl1,
      alt: item.Picture.PictureDescription1,
    });
    if (item.Picture.PictureUrl2) {
      arr.push({
        id: Date.now(),
        url: item.Picture.PictureUrl2,
        alt: item.Picture.PictureDescription2 || 'default',
      });
    }
    if (item.Picture.PictureUrl3) {
      arr.push({
        id: Date.now(),
        url: item.Picture.PictureUrl3,
        alt: item.Picture.PictureDescription3 || 'default',
      });
    }
  }
  return arr;
}
