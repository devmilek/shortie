import React from "react";
import CreateLinkModal from "../modals/create-link-modal";
import DeleteLinkModal from "../modals/delete-link-modal";
import LinkDetailsSheet from "../sheets/link-details-sheet";

const ModalProvider = () => {
  return (
    <>
      <CreateLinkModal />
      <DeleteLinkModal />
      <LinkDetailsSheet />
    </>
  );
};

export default ModalProvider;
