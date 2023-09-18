import { Link, Profile } from ".prisma/client";

export type LinkWithProfile = Link & {
  profile: Profile;
};
