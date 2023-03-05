/**
 * It takes a cookie name as an argument, and returns the value of the cookie with that name.
 * @param name - The name of the cookie you want to read.
 * @returns The value of the cookie.
 */
export function readCookie(name) {
  let nameEQ = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

/**
 * This function sets a cookie with the name cname, the value cvalue, and the expiration date exdays.
 * @param cname - The name of the cookie.
 * @param cvalue - The value of the cookie.
 * @param exdays - The number of days you want the cookie to be valid for.
 */
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname +
    "=" +
    cvalue +
    ";" +
    expires +
    ";path=/" +
    "; SameSite=Strict; Secure";
}

/**
 * It sets the cookie's expiration date to a time in the past, which causes the browser to delete
 * it
 * @param name - The name of the cookie to delete.
 */
export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
