export function generateRandomString(): string {
  const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
  let randomString: string = "";

  for (let i: number = 0; i < 5; i++) {
    const randomIndex: number = Math.floor(Math.random() * alphabet.length);
    randomString += alphabet.charAt(randomIndex);
  }

  return randomString;
}
