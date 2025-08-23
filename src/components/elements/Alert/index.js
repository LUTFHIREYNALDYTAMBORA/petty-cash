import { Snackbar, Alert } from '@mui/material';
import styles from './styles';

export default function AlertBase({ open,  message, counterCloseAlert, severity, testid }) {
  return (
    <Snackbar
      css={styles.root}
      onClose={counterCloseAlert}
      open={open}
      autoHideDuration={3000}
    >
      <Alert
        data-testid={testid}
        sx={styles.alert}
        elevation={6}
        onClose={counterCloseAlert}
        severity={severity}
        variant='standard'
      >
        {message}
      </Alert>
    </Snackbar>
  );
}