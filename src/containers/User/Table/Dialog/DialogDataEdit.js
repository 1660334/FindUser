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
import isUrl from "validator/lib/isURL";
import AtomTypography from "../../../../Atomic/atoms/AtomTypography";

const useStyles = makeStyles((theme) => ({
  widthDialog: {
    width: "400px",
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
}));

export default function FormDialog(props) {
  const {
    openDialogEditUser,
    setOpenDialogEditUser,
    dataDialogEdit,
    handleClickEditRowUser,
    hanldClickAddRowUser,
    dataEdit,
    newData,
    isClick,
  } = props;
  const classes = useStyles();
  //bắt buộc phải khai báo useState khi ta muốn dữ liêuj tự động rander khi ta nhập

  const [selectedDate, setSelectedDate] = useState(null);
  const [isFullData, setIsFullData] = useState(false);
  const [errAvatar, setErrAvatar] = useState(null);
  const [errDate, setErrDate] = useState(null);
  const [errName, setErrName] = useState(null);
  const handleDateChange = (data) => {
    setSelectedDate(data);
    handleDataEdit(data);
    console.log("date", data);
  };
  const handleDataEdit = (data, type) => {
    if (isClick === "true") {
      console.log("date", data);
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
        isUrl(newData.avatar) &&
        newData.name !== "" &&
        newData.bornyear !== "" &&
        newData.bornyear <= new Date().getFullYear()
      )
        //nếu không rỗng thì thoả điều kiện và hàm setFullData sẻ được thay đổi thành true
        setIsFullData(true);
      else setIsFullData(false);
      //ngược lại thì là false
    } else {
      console.log("date", data);
      if (data !== "" && type === "avatar") {
        console.log("data", data);
        dataEdit.avatar = data;
      }
      if (data !== "" && type === "name") {
        console.log("data", data);
        dataEdit.name = data;
      }
      //dùng instanceof Date để kiểm tra biến data có phải là 1 Date không!
      if (data !== "" && data instanceof Date) {
        dataEdit.bornyear = data.getFullYear();
      }
      //điều kiện để kiểm tra các dữ liệu đầu vào có rỗng hay không
      if (
        dataEdit.avatar !== "" &&
        isUrl(dataEdit.avatar) &&
        dataEdit.name !== "" &&
        dataEdit.bornyear !== "" &&
        dataEdit.bornyear <= new Date().getFullYear()
      )
        //nếu không rỗng thì thoả điều kiện và hàm setFullData sẻ được thay đổi thành true
        setIsFullData(true);
      else setIsFullData(false);
      //ngược lại thì là false
    }
  };
  return (
    <AtomBox>
      <Dialog
        open={openDialogEditUser}
        onClose={() => setOpenDialogEditUser(!openDialogEditUser)}
        aria-labelledby="form-dialog-title"
      >
        {isClick === "true" ? (
          <AtomBox className={classes.widthDialog}>
            <DialogTitle id="form-dialog-title" className={classes.dialogtitle}>
              Thêm người dùng mới
            </DialogTitle>

            <DialogContent>
              <TextField
                className={classes.muiTextField}
                margin="dense"
                label="Ảnh đại diện"
                placeholder="Nhập đường dẩn hình ảnh"
                required
                fullWidth
                onChange={(event, data) => {
                  if (event.target.value !== "" && !isUrl(event.target.value)) {
                    setErrAvatar(
                      <AtomTypography
                        className={classes.error}
                        component={"span"}
                      >
                        Hình ảnh phải là đường dẩn http
                      </AtomTypography>
                    );
                  } else {
                    setErrAvatar("");
                    handleDataEdit(event.target.value, "avatar");
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <AtomTypography>{errAvatar}</AtomTypography>
              <TextField
                className={classes.muiTextField}
                margin="dense"
                id="name"
                label="Họ và tên"
                required
                placeholder="Nhập họ và tên"
                type="text"
                fullWidth
                onChange={(event, data) => {
                  if (
                    !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?1-9]/g.test(
                      event.target.value
                    )
                  ) {
                    console.log("da vao day");
                    handleDataEdit(event.target.value, "name");
                    setErrName("");
                  } else {
                    setErrName(
                      <AtomTypography
                        className={classes.error}
                        component={"span"}
                      >
                        Không hợp lệ! Họ tên không được chứa kí tự đặt biệt, số
                      </AtomTypography>
                    );
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <AtomTypography>{errName}</AtomTypography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className={classes.datePicker}
                  views={["year"]}
                  value={selectedDate}
                  label="Năm sinh"
                  placeholder="Chọn năm sinh"
                  onChange={(data) => {
                    if (data.getFullYear() <= new Date().getFullYear()) {
                      handleDateChange(data);
                      setErrDate("");
                    } else
                      setErrDate(
                        <AtomTypography
                          className={classes.error}
                          component={"span"}
                        >
                          Không hợp lệ! Năm chọn phải nhỏ hơn năm hiện tại
                        </AtomTypography>
                      );
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <AtomTypography>{errDate}</AtomTypography>
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
                placeholder={dataDialogEdit.avatar.toString()}
                required
                fullWidth
                onChange={(event, data) => {
                  if (event.target.value !== "" && !isUrl(event.target.value)) {
                    setErrAvatar(
                      <AtomTypography
                        className={classes.error}
                        component={"span"}
                      >
                        Hình ảnh phải là đường dẩn http
                      </AtomTypography>
                    );
                  } else {
                    setErrAvatar("");
                    handleDataEdit(event.target.value, "avatar");
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <AtomTypography>{errAvatar}</AtomTypography>
              <TextField
                className={classes.muiTextField}
                margin="dense"
                id="name"
                label="Họ và tên"
                required
                placeholder={dataDialogEdit.name.toString()}
                type="text"
                fullWidth
                onChange={(event, data) => {
                  if (
                    !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?1-9]/g.test(
                      event.target.value
                    )
                  ) {
                    console.log("da vao day");
                    handleDataEdit(event.target.value, "name");
                    setErrName("");
                  } else {
                    setErrName(
                      <AtomTypography
                        className={classes.error}
                        component={"span"}
                      >
                        Không hợp lệ! Họ tên không được chứa kí tự đặt biệt, số
                      </AtomTypography>
                    );
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <AtomTypography>{errName}</AtomTypography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className={classes.datePicker}
                  views={["year"]}
                  value={selectedDate}
                  label="Năm sinh"
                  placeholder={dataDialogEdit.bornyear.toString()}
                  onChange={(data) => {
                    if (data.getFullYear() <= new Date().getFullYear()) {
                      handleDateChange(data);
                      setErrDate("");
                    } else
                      setErrDate(
                        <AtomTypography
                          className={classes.error}
                          component={"span"}
                        >
                          Không hợp lệ! Năm chọn phải nhỏ hơn năm hiện tại
                        </AtomTypography>
                      );
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <AtomTypography>{errDate}</AtomTypography>
              </MuiPickersUtilsProvider>
            </DialogContent>
          </AtomBox>
        )}

        <DialogActions>
          {isFullData ? (
            <AtomButton
              color="primary"
              onClick={() => {
                if (isClick === "true") {
                  hanldClickAddRowUser();
                  setOpenDialogEditUser(!openDialogEditUser);
                } else handleClickEditRowUser(dataDialogEdit.id);
                setOpenDialogEditUser(!openDialogEditUser);
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
            onClick={() => setOpenDialogEditUser(!openDialogEditUser)}
            color="primary"
          >
            đóng
          </AtomButton>
        </DialogActions>
      </Dialog>
    </AtomBox>
  );
}
