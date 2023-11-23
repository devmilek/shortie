export function getInitials(name: string) {
  const words = name.split(" ");
  if (words.length === 2) {
    return words[0].substring(0, 1) + words[1].substring(0, 1);
  } else {
    return name.substring(0, 2);
  }
}
