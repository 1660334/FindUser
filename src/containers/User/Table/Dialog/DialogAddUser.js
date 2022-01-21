import React, { useState } from "react";
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
  widthDialog: {
    width: "500px",
    margin: "auto",
    height: "100%",
    padding: theme.spacing(3),
  },
  muiTextField: {
    marginTop: theme.spacing(3),
  },
  buttonstyle: {
    marginTop: theme.spacing(1),
    borderRadius: "20px",
    height: 55,
    textTransform: "none",
  },
  dialogtitle: {
    textAlign: "center",
  },
  datePicker: {
    marginTop: theme.spacing(3),
  },
}));

export default function FormDialog({ newData, hanldGetNewItem }) {
  const classes = useStyles();

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
        className={classes.widthDialog}
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogtitle}>
          Thêm người dùng mới
        </DialogTitle>
        <DialogContent>
          <TextField
            className={classes.muiTextField}
            autoFocus
            margin="dense"
            id="name"
            label="Ảnh đại diện"
            placeholder="Nhập đường dẩn hình ảnh"
            type="text"
            onChange={(event, data) => {
              handleGetData(event.target.value, "avatar");
            }}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            className={classes.muiTextField}
            autoFocus
            margin="dense"
            id="name"
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            type="text"
            onChange={(event, data) => {
              handleGetData(event.target.value, "name");
            }}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className={classes.datePicker}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              views={["year"]}
              format="yyyy"
              openTo="year"
              label="Chọn năm sinh"
              value={selectedDate}
              onChange={(data) => {
                handleDateChange(data);
                handleGetData(data, "bornyear");
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MuiPickersUtilsProvider>
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
