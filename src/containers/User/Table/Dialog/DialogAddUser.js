import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AtomButton from "@material-ui/core/Button";
import { useUniqueId } from "../../../helpers";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(0),
  },
  muipicker: {
    marginTop: theme.spacing(0),

    marginRight: theme.spacing(4),
  },
  buttonstyle: {
    margin: theme.spacing(1),
    borderRadius: "20px",
    textTransform: "none",
  },
}));

export default function FormDialog({ arr, setArr, setFilterArr }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const newData = { id: useUniqueId(), avatar: "", name: "", bornyear: "" };

  const handleGetData = (data, type) => {
    if (type === "name") newData.name = data;
    if (type === "bornyear") newData.bornyear = data;
  };

  const hanldGetNewItem = () => {
    setArr([...arr, newData]);
    setFilterArr([...arr, newData]);
    setOpen(false);
  };

  return (
    <div>
      <AtomButton
        variant="outlined"
        className={classes.buttonstyle}
        size="large"
        color="primary"
        onClick={handleOpen}
      >
        Thêm người dùng
      </AtomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Thêm người dùng mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Họ tên"
            type="text"
            onChange={(event, data) => {
              handleGetData(event.target.value, "name");
            }}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="birth"
            type="date"
            onChange={(event) => {
              handleGetData(event.target.value, "bornyear");
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={hanldGetNewItem}>
            Lưu
          </Button>

          <Button onClick={handleClose} color="primary">
            đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
