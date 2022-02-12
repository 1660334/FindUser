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
}));

export default function DialogTable(props) {
  //truyền các props sang cho component Table
  const { data, open, setOpen } = props;
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
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
            src={data.avatar}
          />
          <AtomTypography component={"span"} className={classes.typography}>
            <b>Họ và tên:</b> {data.name}
          </AtomTypography>
          <AtomTypography component={"span"}>
            <b>Năm sinh:</b> {data.bornyear}
          </AtomTypography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <AtomButton onClick={() => setOpen(!open)} color="primary">
          Đóng
        </AtomButton>
      </DialogActions>
    </Dialog>
  );
}
