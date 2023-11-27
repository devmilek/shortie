"use client";

import React, { useEffect } from "react";
import CreateLinkModal from "../modals/create-link-modal";
import DeleteLinkModal from "../modals/delete-link-modal";
import LinkDetailsSheet from "../sheets/link-details-sheet";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (isMounted) {
    return (
      <>
        <CreateLinkModal />
        <DeleteLinkModal />
        <LinkDetailsSheet />
      </>
    );
  }
};

export default ModalProvider;
