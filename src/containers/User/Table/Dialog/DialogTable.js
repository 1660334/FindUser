import React from "react";
import PropTypes from "prop-types";
import AtomButton from "../../../../Atomic/atoms/AtomButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AtomBox from "../../../../Atomic/atoms/AtomBox";
import AtomTypography from "../../../../Atomic/atoms/AtomTypography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  dialogcontent: {
    margin: "auto",
  },
}));
export default function DialogTable({ avatar, name, birth }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <AtomBox>
      <AtomButton
        size="small"
        color="primary"
        style={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        Xem chi tiết
      </AtomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          {"Thông tin chi tiết"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.dialogcontent}
          >
            <Avatar className={classes.large}>{avatar}</Avatar>
            <AtomTypography style={{ paddingTop: "30px" }}>
              <b>Họ và tên:</b> {name}
            </AtomTypography>
            <AtomTypography>
              <b>Năm sinh:</b> {birth}
            </AtomTypography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <AtomButton onClick={handleClose} color="primary">
            Close
          </AtomButton>
        </DialogActions>
      </Dialog>
    </AtomBox>
  );
}
DialogTable.propsTypes = {
  avatar: PropTypes.string, // đường dẫn avatar
  name: PropTypes.string,
  birth: PropTypes.string,
};
