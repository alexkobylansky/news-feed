import React from 'react';
import "./BasicModal.scss";
import {Box, Modal} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalWrapper = {
  bgcolor: 'background.paper',
  boxShadow: 24,
};

interface BasicModalProps {
  children: React.ReactNode | React.ReactElement;
  handleClose(): any;
  open: boolean;
}

export const BasicModal: React.FC<BasicModalProps> = ({children, handleClose, open}) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalWrapper} className={"modal-wrapper"}>
        <div className={"close-icon-wrapper"}  onClick={handleClose}>
          <CloseIcon className={"close-icon"}/>
        </div>
        {children}
      </Box>
    </Modal>
  );
}