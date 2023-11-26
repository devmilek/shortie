import { LinkWithVisitorsCount } from "@/types";
import React from "react";

interface LinkCardProps {
  link: LinkWithVisitorsCount;
}

const LinkCard = ({ link }: LinkCardProps) => {
  return (
    <article>
      <div>favicon</div>
      {/* <h1>{origin}</h1> */}
    </article>
  );
};

export default LinkCard;
