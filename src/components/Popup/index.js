import { Backdrop, Box, IconButton, Modal, Paper, Typography } from '@mui/material';
import { Close, CloseRounded } from '@mui/icons-material';
import styles from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

export default function PopUp(props) {
    const { title, children, open, handleClose } = props;
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <div onClick={handleClose}>
                        <IconButton><CloseRounded /></IconButton>
                    </div>
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {children}
                </Typography>
            </Box>
        </Modal>
    );
}
