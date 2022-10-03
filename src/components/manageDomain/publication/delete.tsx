import IconButton from "@mui/material/IconButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "@src/components/shared/confirmationModal";
import Toast from "@src/components/shared/toast";
import { useToast } from "@src/utils/hooks";

import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";

interface Props {
  id: string;
  centreId: string;
  index: number;
}
// please delete this line for prop validation
// eslint-disable-next-line no-unused-vars
const DeleteCentre = ({ id, centreId, index }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();

  async function deleteCentre() {
    try {
      setIsLoading(true);
      const data = await request.delete(
        `/centre/${centreId}/publication/${id}`
      );
      toggleToast(data.message);
      closeDialog();
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <IconButton onClick={() => openDialog()}>
        <DeleteOutline htmlColor="red" />
      </IconButton>
      <ConfirmDialog
        isLoading={isLoading}
        isOpen={isOpen}
        closeDialog={closeDialog}
        action={deleteCentre}
        message="This action means this publication will no longer exist. Are you sure you want to delete this publication?"
      />
      {toastMessage && (
        <Toast
          status={Boolean(toastMessage)}
          message={toastMessage}
          showToast={toggleToast}
        />
      )}
    </>
  );
};

export default DeleteCentre;