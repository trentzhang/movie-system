function checkURLIsImage(url) {
  if (url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  } else {
    return false;
  }
}
export function coverURL(url) {
  return checkURLIsImage(url)
    ? url
    : "//st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg";
}
