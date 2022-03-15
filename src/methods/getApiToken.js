import JsSHA from 'jssha';

export default function getAuthorizationHeader() {
  const AppID = '56253d08f6dc4adbb3f2f5b9d159eaa6';
  const AppKey = 'PXMUUAcMy30Thw_o6-lg_9QNe7U';
  const GMTString = new Date().toGMTString();
  const ShaObj = new JsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  // ShaObj.update('x-date: ' + GMTString);
  ShaObj.update(`x-date: ${GMTString}`);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return {
    Authorization,
    'X-Date': GMTString,
  };
}
