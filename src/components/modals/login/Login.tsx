import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "../../global/basicmodal/BasicModal";
import { Button } from "../../global/button/Button";

const Login = NiceModal.create(() => {
  const modal = useModal();
  const handleAuth = (modalName: string) => {
    NiceModal.show(modalName);
    modal.remove();
  };
  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="flex w-full flex-col items-center gap-4 rounded-2xl bg-white px-5 md:px-6 py-8 md:py-10 sm:w-[37.5rem] md:p-14">
        <h2 className="fs-32 leading-9">hello world</h2>
        <Button onClick={() => handleAuth("signUp")}>sign up</Button>
      </div>
    </BasicModal>
  );
});

export default Login;
