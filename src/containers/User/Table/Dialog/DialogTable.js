import React from "react";
import AtomButton from "../../../../Atomic/atoms/AtomButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
  typography: {
    paddingTop: theme.spacing(3),
    display: "flex",
  },
  b: {
    paddingRight: theme.spacing(1),
  },
}));

export default function DialogTable(props) {
  //truyền các props sang cho component Table
  const { dataDialogProfile, openDialogProfile, setOpenDialogProfile } = props;

  const classes = useStyles();
  return (
    <Dialog
      open={openDialogProfile}
      onClose={() => setOpenDialogProfile(!openDialogProfile)}
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
          <Avatar
            component={"span"}
            className={classes.large}
            src={dataDialogProfile.avatar}
          />
          <AtomTypography component={"span"} className={classes.typography}>
            <b className={classes.b}>Họ và tên: </b> {dataDialogProfile.name}
          </AtomTypography>
          <AtomTypography component={"span"}>
            <b>Năm sinh: </b> {dataDialogProfile.bornyear}
          </AtomTypography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <AtomButton
          onClick={() => setOpenDialogProfile(!openDialogProfile)}
          color="primary"
        >
          Đóng
        </AtomButton>
      </DialogActions>
    </Dialog>
  );
}
