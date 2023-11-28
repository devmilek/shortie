"use client";

import PasswordLink from "@/components/password-link";
import { getUserBrowser } from "@/utils/get-user-browser";
import { getUserDevice } from "@/utils/get-user-device";
import { getUserOS } from "@/utils/get-user-os";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface LinkLogicProps {
  linkId: string;
  destination?: string | undefined | null;
}

const LinkLogic = ({ linkId, destination }: LinkLogicProps) => {
  const visitorData = {
    os: getUserOS(),
    browserName: getUserBrowser(),
    device: getUserDevice(),
  };

  const { isLoading, error, data } = useQuery("repoData", {
    queryFn: async () => {
      const res = await axios.post(`/api/link/${linkId}/visitor`, visitorData);
      return res.data;
    },
  });

  useEffect(() => {});
  //   console.log(visitorData);

  if (!isLoading) {
    if (!destination) {
      return <PasswordLink linkId={linkId} />;
    }
    location.replace(destination);
  }
};

export default LinkLogic;
