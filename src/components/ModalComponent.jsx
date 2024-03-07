import { Box, Modal, Typography } from '@mui/material'

export function ModalComponent({ open, handleClose, selectedNote }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4,
    };


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ backgroundColor: 'transparent' }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {selectedNote}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}