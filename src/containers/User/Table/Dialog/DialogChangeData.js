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
import format from "date-fns/format";

const useStyles = makeStyles((theme) => ({
  widthDialog: {
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
  error: {
    color: "red",
  },

  buttonstyle: {
    textTransform: "none",
  },
}));

export default function FormDialog(props) {
  const {
    openDialogChangeUser,
    setOpenDialogChangeUser,
    getDataEdit,
    handleEditRowsModelChange,
    handleAddRowsModelChange,
    dataEdit,
    newData,
    isCheckClick,
  } = props;
  const classes = useStyles();
  //bắt buộc phải khai báo useState khi ta muốn dữ liêuj tự động rander khi ta nhập

  const [selectedDate, setSelectedDate] = useState(
    isCheckClick === "false"
      ? format(
          new Date(getDataEdit.bornyear, 0, 1),
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        )
      : null
  );
  const [isFullData, setIsFullData] = useState(false);
  const [errAvatar, setErrAvatar] = useState(null);
  const [errDate, setErrDate] = useState(null);
  const [errName, setErrName] = useState(null);
  const handleDateChange = (data) => {
    handleDataEdit(data);
    console.log("date", data);
  };

  const handleCheckName = (data) => {
    //eslint-disable-next-line
    var format = /[0-9]|[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (!format.test(data)) {
      handleDataEdit(data, "name");
      setErrName(false);
      console.log("datacheckname", data);
    } else {
      //Nếu có lỗi thì ẩn button lưu đi
      setIsFullData(false);
      setErrName(true);
    }
  };
  const handleCheckYear = (data) => {
    setSelectedDate(data);
    if (data.getFullYear() <= new Date().getFullYear()) {
      handleDateChange(data);
      setErrDate(false);
    } else {
      setErrDate(true);
      //Nếu có lỗi thì ẩn button lưu đi
      setIsFullData(false);
    }
  };
  const isCheckImgLink = (url) => {
    if (typeof url !== "string") {
      return false;
    }
    return (
      url.match(
        //eslint-disable-next-line
        /(http[s]*:\/\/)[a-zA-Z0-9][a-zA-Z0-9-.]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|gif|png|tiff|bmp)$/i
      ) !== null
    );
  };
  const handleDataEdit = (data, type) => {
    if (isCheckClick === "true") {
      if (data !== "" && type === "avatar") {
        console.log("data", data);
        newData.avatar = data;
      }
      if (data !== "" && type === "name") {
        console.log("data", data);
        newData.name = data;
      }
      //dùng instanceof Date để kiểm tra biến data có phải là 1 Date không!
      if (data !== "" && data instanceof Date) {
        newData.bornyear = data.getFullYear();
      }
      //điều kiện để kiểm tra các dữ liệu đầu vào có rỗng hay không
      if (
        newData.avatar !== "" &&
        isCheckImgLink(newData.avatar) &&
        newData.name !== "" &&
        newData.bornyear !== "" &&
        newData.bornyear <= new Date().getFullYear()
      )
        setIsFullData(true);
      else setIsFullData(false);

      //ngược lại thì là false
    } else {
      console.log("date", data);
      if (data !== "" && type === "avatar") {
        dataEdit.avatar = data;
      }
      if (data !== "" && type === "name") {
        dataEdit.name = data;
      }
      //dùng instanceof Date để kiểm tra biến data có phải là 1 Date không!
      if (data !== "" && data instanceof Date) {
        dataEdit.bornyear = data.getFullYear();
      }
      //điều kiện để kiểm tra các dữ liệu đầu vào có rỗng hay không
      if (
        dataEdit.avatar !== "" &&
        isCheckImgLink(dataEdit.avatar) &&
        dataEdit.name !== "" &&
        dataEdit.bornyear !== "" &&
        dataEdit.bornyear <= new Date().getFullYear()
      )
        setIsFullData(true);
      else setIsFullData(false);
    }
  };
  return (
    <AtomBox>
      <Dialog
        open={openDialogChangeUser}
        onClose={() => setOpenDialogChangeUser(!openDialogChangeUser)}
        aria-labelledby="form-dialog-title"
      >
        {isCheckClick === "true" ? (
          <AtomBox className={classes.widthDialog}>
            <DialogTitle id="form-dialog-title" className={classes.dialogtitle}>
              Thêm người dùng mới
            </DialogTitle>

            <DialogContent>
              <TextField
                className={classes.muiTextField}
                margin="dense"
                label="Ảnh đại diện"
                required
                fullWidth
                error={Boolean(errAvatar)}
                helperText={errAvatar ? "Không phải là đường dẫn hình ảnh" : ""}
                onChange={(event, data) => {
                  if (
                    event.target.value !== "" &&
                    !isCheckImgLink(event.target.value)
                  ) {
                    setErrAvatar(true);
                    setIsFullData(false);
                  } else {
                    setErrAvatar(false);
                    handleDataEdit(event.target.value, "avatar");
                  }
                }}
              />

              <TextField
                className={classes.muiTextField}
                id="name"
                type="text"
                label="Họ và tên"
                required
                fullWidth
                error={Boolean(errName)}
                helperText={errName ? "Tên không được chứa kí tự, số" : ""}
                onChange={(event, data) => {
                  handleCheckName(event.target.value);
                }}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className={classes.datePicker}
                  views={["year"]}
                  value={selectedDate}
                  label="Năm sinh"
                  error={Boolean(errDate)}
                  helperText={
                    errDate ? "Năm sinh không được quá năm hiện tại" : ""
                  }
                  onChange={(data) => {
                    handleCheckYear(data);
                  }}
                />
              </MuiPickersUtilsProvider>
            </DialogContent>
          </AtomBox>
        ) : (
          <AtomBox className={classes.widthDialog}>
            <DialogTitle id="form-dialog-title" className={classes.dialogtitle}>
              Thay đổi thông tin người dùng
            </DialogTitle>

            <DialogContent>
              <TextField
                className={classes.muiTextField}
                margin="dense"
                label="Ảnh đại diện"
                defaultValue={getDataEdit.avatar.toString()}
                required
                fullWidth
                error={Boolean(errAvatar)}
                helperText={errAvatar ? "Không phải là đường dẫn hình ảnh" : ""}
                onChange={(event, data) => {
                  if (
                    event.target.value !== "" &&
                    !isCheckImgLink(event.target.value)
                  ) {
                    setErrAvatar(true);
                    //Nếu có lỗi thì ẩn button lưu đi
                    setIsFullData(false);
                  } else {
                    setErrAvatar(false);
                    //nếu là url hình ảnh thì truyền data vào hàm handleDataEdit đển xử lý
                    handleDataEdit(event.target.value, "avatar");
                  }
                }}
              />
              <TextField
                className={classes.muiTextField}
                margin="dense"
                id="name"
                label="Họ và tên"
                type="text"
                required
                defaultValue={getDataEdit.name.toString()}
                fullWidth
                error={Boolean(errName)}
                helperText={errName ? "Tên không được chứa kí tự, số" : ""}
                onChange={(event, data) => {
                  handleCheckName(event.target.value);
                }}
              />
              {console.log("getDataEdit.bornyear", typeof getDataEdit.bornyear)}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className={classes.datePicker}
                  views={["year"]}
                  value={selectedDate}
                  label="Năm sinh"
                  error={Boolean(errDate)}
                  helperText={
                    errDate ? "Năm sinh không được quá năm hiện tại" : ""
                  }
                  onChange={(data) => {
                    handleCheckYear(data);
                  }}
                />
              </MuiPickersUtilsProvider>
            </DialogContent>
          </AtomBox>
        )}

        <DialogActions>
          {isFullData ? (
            <AtomButton
              className={classes.buttonstyle}
              color="primary"
              onClick={() => {
                if (isCheckClick === "true") {
                  //dùng hàm setTimeout để cài đặt thời gian hàm handleAddRowsModelChange và thời gian để thực thi khi ta click (tính bằng milisecons)
                  //
                  setTimeout(handleAddRowsModelChange, 0);
                  // handleAddRowsModelChange();
                } else handleEditRowsModelChange(getDataEdit.id);
                setOpenDialogChangeUser(!openDialogChangeUser);
              }}
            >
              Lưu
            </AtomButton>
          ) : (
            <AtomButton
              className={classes.buttonstyle}
              color="primary"
              disabled
            >
              Lưu
            </AtomButton>
          )}
          <AtomButton
            className={classes.buttonstyle}
            onClick={() => setOpenDialogChangeUser(!openDialogChangeUser)}
            color="primary"
          >
            Đóng
          </AtomButton>
        </DialogActions>
      </Dialog>
    </AtomBox>
  );
}
