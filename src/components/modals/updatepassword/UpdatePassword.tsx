import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { images } from "../../../assets/images";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
const UpdatePassword = NiceModal.create(() => {
    const modal = useModal();
    const router = useRouter()
    return (
        <BasicModal show={modal.visible} hide={modal.hide}>
            <div className="rounded-2xl bg-white dark:bg-blackRussian2 p-5 md:p-8 sm:w-[31.25rem]">
                <figure>
                    <Image className="mx-auto my-8" src={images.successGif} alt='Update Password' height={140} width={265} />
                </figure>

                <h2 className="fs-32 font-semibold mb-4 leading-tight text-white">Password Reset Successfully</h2>
                <p className="text-grey mb-8">Your Password has been reset successfully.</p>
                <Button
                    onClick={() => { router.push('/login'); modal.hide() }}
                    size="md"
                    type="submit"
                    color="primary"
                    className="w-full"
                >
                    Back to Login
                </Button>
            </div>
        </BasicModal>
    );
});

export default UpdatePassword;
