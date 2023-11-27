export function getUserDevice() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (regex.test(navigator.userAgent)) {
    return "mobile";
  } else {
    return "desktop";
  }
}
