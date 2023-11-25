import { Link, Profile } from ".prisma/client";
import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

export type LinkWithProfile = Link & {
  profile: Profile;
};

export type LinkWithVisitorsCount = Link & {
  _count: {
    visitors: number;
  };
};

export interface Feature {
  id: number;
  slug: string;
  icon: LucideIcon;
  image: StaticImageData;
  darkImage: StaticImageData;
  title: string;
  content: string;
}

export interface Plan {
  title: string;
  price: string | number;
  description: string;
  features: string[];
  button: string;
}
