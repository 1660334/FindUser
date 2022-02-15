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
import AtomBox from "../../../../Atomic/atoms/AtomBox";

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

  dialogtitle: {
    textAlign: "center",
  },
  datePicker: {
    marginTop: theme.spacing(3),
  },
}));

export default function FormDialog({
  newData,
  hanldGetNewItem,
  openModalAddUser,
  setOpenModalSetUser,
  isUpdate,
  title,
}) {
  const classes = useStyles();
  //bắt buộc phải khai báo useState khi ta muốn dữ liêuj tự động rander khi ta nhập
  const [isFullData, setIsFullData] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGetData = (data, type) => {
    if (type === "avatar") newData.avatar = data;
    if (type === "name") newData.name = data;
    if (type === "bornyear") {
      newData.bornyear = data.getFullYear();
    }
    //điều kiện để kiểm tra các dữ liệu đầu vào có rỗng hay không
    if (newData.avatar !== "" && newData.name !== "" && newData.bornyear !== "")
      //nếu không rỗng thì thoả điều kiện và hàm setFullData sẻ được thay đổi thành true
      setIsFullData(true);
    else setIsFullData(false);
    //ngược lại thì là false
  };

  return (
    <AtomBox>
      <Dialog
        open={openModalAddUser}
        onClose={() => setOpenModalSetUser(false)}
        aria-labelledby="form-dialog-title"
        className={classes.widthDialog}
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogtitle}>
          {title}
        </DialogTitle>

        <DialogContent>
          <TextField
            className={classes.muiTextField}
            margin="dense"
            label="Ảnh đại diện"
            placeholder={newData.avatar.toString()}
            type="text"
            required
            onChange={(event, data) => {
              //vì không dung usestate nên không render lại khi ta nhập dữ liệu
              handleGetData(event.target.value, "avatar");
            }}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            className={classes.muiTextField}
            margin="dense"
            id="name"
            label="Họ và tên"
            required
            placeholder={newData.name.toString()}
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
              views={["year"]}
              value={selectedDate}
              label="Chọn năm sinh"
              placeholder={newData.bornyear.toString()}
              onChange={(data) => {
                //ở đây ta dùng useState nên sẻ bị render lại khi ta chọn năm
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
          {isFullData ? (
            <AtomButton
              color="primary"
              onClick={() => {
                if (isUpdate) {
                  setOpenModalSetUser(false);
                } else {
                  hanldGetNewItem(isUpdate); // để mà khi em thêm 1 user mới thì khi bấm lưu nó lưu data vào array
                  setOpenModalSetUser(false);
                }
              }}
            >
              Lưu
            </AtomButton>
          ) : (
            <AtomButton color="primary" disabled>
              Lưu
            </AtomButton>
          )}
          <AtomButton
            onClick={() => setOpenModalSetUser(false)}
            color="primary"
          >
            đóng
          </AtomButton>
        </DialogActions>
      </Dialog>
    </AtomBox>
  );
}
