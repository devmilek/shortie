import { HOME_DOMAIN } from "@/constants";

export const getShortLink = (shortValue: string, pretty: boolean = true) => {
  if (!pretty) {
    return `${HOME_DOMAIN}${shortValue}`;
  }
  return `${HOME_DOMAIN.replace(/^(https?:\/\/)?(www\.)?/i, "")}${shortValue}`;
};
