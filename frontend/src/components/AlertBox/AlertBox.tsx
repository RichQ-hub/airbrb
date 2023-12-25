import React from 'react';
import { Collapse, IconButton, Alert, AlertTitle, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AlertBoxProps {
  alertContent: string;
  onClick: () => void
}

const AlertBox = (props: AlertBoxProps) => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(false);
    props.onClick();
  }
  return (
        <Collapse in={open}>
          <Alert
              severity="error"
              action={<IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClick}>
                  <CloseIcon fontSize="inherit" />
              </IconButton>}
          >
              <AlertTitle>Erorr</AlertTitle>
              {props.alertContent}
          </Alert>
      </Collapse>
  )
}

export default AlertBox;
