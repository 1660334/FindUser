import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
const useStyles = makeStyles((theme) => ({
  buttonstyle: {
    textTransform: "none",
  },
}));
export default function DialogDeleteUser(props) {
  const classes = useStyles();
  const {
    getIdDelete,
    openDialogDelete,
    setOpenDialogDelete,
    handleClickDeleteRows,
  } = props;

  return (
    <div>
      <Dialog
        open={openDialogDelete}
        onClose={() => setOpenDialogDelete(!openDialogDelete)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có đồng ý xoá người dùng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonstyle}
            onClick={() => {
              handleClickDeleteRows(getIdDelete);
              setOpenDialogDelete(!openDialogDelete);
            }}
            color="primary"
          >
            Đồng ý
          </Button>
          <Button
            className={classes.buttonstyle}
            onClick={() => setOpenDialogDelete(!openDialogDelete)}
            color="primary"
            autoFocus
          >
            không
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
