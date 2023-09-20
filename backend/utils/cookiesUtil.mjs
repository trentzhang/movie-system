export function parseCookies(cookie) {
  const cookies = cookie.split(";");
  const emails = cookies[0].split("=");
  const token = cookies[1].split("=");
  const result = { email: "", token: null };
  if (emails[1] != "undefined") {
    result.email = emails[1];
  }
  if (token[1] != "undefined") {
    result.token = token[1];
  }
  return result;
}
