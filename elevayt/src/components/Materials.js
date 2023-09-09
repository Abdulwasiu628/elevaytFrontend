import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export const BasicModal = ({openModal, open, value}) => {
  
  const handleClose = () => openModal(false);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {value}
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};
BasicModal.propTypes = {
  openModal: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.object
};


