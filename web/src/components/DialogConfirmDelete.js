import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogConfirmDelete = (props) => {
	const {title, content, handleYes, handleClose} = props;
  return (
    <span>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
						{content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleYes} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DialogConfirmDelete.propTypes = {
	title: (PropTypes.object.isRequired || PropTypes.string.isRequired),
	content: (PropTypes.object.isRequired || PropTypes.string.isRequired),
	handleYes: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default DialogConfirmDelete;
