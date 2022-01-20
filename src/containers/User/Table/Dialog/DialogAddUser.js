import React, { useState, useRef } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AtomButton from "../../../../Atomic/atoms/AtomButton";

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

export default function FormDialog({
  newData,
  arr,
  setArr,
  setFilterArr,
  hanldGetNewItem,
}) {
  const classes = useStyles();
  const yearRef = useRef();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleGetData = (data, type) => {
    if (type === "avatar") newData.avatar = data;
    if (type === "name") newData.name = data;
    if (type === "bornyear") {
      newData.bornyear = data.getFullYear();
    }
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
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
        <DialogTitle id="form-dialog-title" className={classes.dialogtitle}>
          Thêm người dùng mới
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Đường dẩn hình ảnh google"
            type="text"
            onChange={(event, data) => {
              handleGetData(event.target.value, "avatar");
            }}
            fullWidth
          />

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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              views={["year"]}
              format="yyyy"
              openTo="year"
              value={selectedDate}
              onChange={(data) => {
                handleDateChange(data);
                handleGetData(data, "bornyear");
              }}
            />
          </MuiPickersUtilsProvider>
          {/* <TextField
            autoFocus
            margin="dense"
            id="birth"
            label="Nhập năm sinh"
            type="text"
            onChange={(event) => {
              handleGetData(event.target.value, "bornyear");
            }}
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <AtomButton
            color="primary"
            onClick={() => {
              hanldGetNewItem();
              setOpen(false);
            }}
          >
            Lưu
          </AtomButton>

          <AtomButton onClick={handleClose} color="primary">
            đóng
          </AtomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
