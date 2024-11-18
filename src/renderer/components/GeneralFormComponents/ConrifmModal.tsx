import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCreateIsLoading } from "../../../store/user-ads/slice";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const ConfirmModal = ({ open, onClose, onConfirm }: ConfirmModalProps) => {
  const createLoading = useSelector(selectCreateIsLoading);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="confirm-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          maxWidth: "90%",
          borderRadius: 1,
        }}
      >
        <Typography id="confirm-modal-title" variant="h6" component="h2" mb={2}>
          Confirm Ad Creation
        </Typography>
        <Typography mb={3}>Are you sure you want to create this ad?</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <LoadingButton
            loading={createLoading}
            onClick={onConfirm}
            variant="contained"
          >
            Confirm
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};
export default ConfirmModal;
