import { LoadingButton } from "@mui/lab";
import { Box, Button, FormHelperText, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectCreateIsError,
  selectCreateIsLoading,
} from "../../../store/user-ads/slice";

// Modal for confirming ad creation with loading state and error handling
interface ConfirmModalProps {
  open: boolean;
  onClose: () => void; // Handler for closing modal
  onConfirm: () => void; // Handler for confirming action
}

const ConfirmModal = ({ open, onClose, onConfirm }: ConfirmModalProps) => {
  // Get loading and error states from redux
  const createLoading = useSelector(selectCreateIsLoading);
  const error = useSelector(selectCreateIsError);

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
          maxWidth: "90%", // Responsive width
          borderRadius: 1,
        }}
      >
        <Typography id="confirm-modal-title" variant="h6" component="h2" mb={2}>
          Confirm Ad Creation
        </Typography>
        <Typography mb={3}>Are you sure you want to create this ad?</Typography>

        {/* Action buttons */}
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

        {/* Error message */}
        {error && (
          <FormHelperText error>
            There was an error while saving you ad please try again later
          </FormHelperText>
        )}
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
