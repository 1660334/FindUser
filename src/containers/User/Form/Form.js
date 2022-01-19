import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import AtomTypography from "../../../Atomic/atoms/AtomTypography";
import AtomTextField from "../../../Atomic/atoms/AtomTextField";
import AtomButton from "../../../Atomic/atoms/AtomButton";
import AtomBox from "../../../Atomic/atoms/AtomBox";
import AtomGrid from "../../../Atomic/atoms/AtomGrid";
import { Paper } from "@material-ui/core";
import DialogAddUser from "../Table/Dialog/DialogAddUser";
// import SearchIcon from "@material-ui/icons/Search";
// import formatDns from "date-fns/format";
// import isValidDns from "date-fns/isValid";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";

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
export default function Form(props) {
  const { arr, setArr, setFilterArr } = props;
  const classes = useStyles();

  // const [selectedDate, setSelectedDate] = React.useState(null);

  // const handleDateChange = (data) => {
  // if (isValidDns(data)) {
  //   const rowNew = arr.filter(
  //     (item) => item.bornyear === formatDns(new Date(data), "yyyy")
  //   );

  //   setFilterArr(rowNew);
  //   setSelectedDate(data);
  // } else {
  //   setFilterArr(arr);
  // }
  // };

  const handleSearch = (value) => {
    if (value !== "") {
      const rowNew = arr.filter(
        (item) =>
          item.name
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .includes(
              value
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
            ) ||
          item.bornyear === value ||
          item.id === Number(value)
      );

      setFilterArr(rowNew);
    } else {
      setFilterArr(arr);
    }
  };
  return (
    <AtomBox>
      <AtomGrid container spacing={1}>
        <AtomGrid item xs={12}>
          <AtomTypography variant="h5" gutterBottom>
            <b>Tìm kiếm người dùng!</b>
          </AtomTypography>
        </AtomGrid>

        <AtomGrid item xs={12}>
          <Paper elevation={3}>
            <AtomGrid container>
              <AtomGrid item xs={12}>
                <form className={classes.root}>
                  <AtomGrid container spacing={2}>
                    <AtomGrid item xs={10}>
                      <AtomTextField
                        fullWidth
                        className={classes.muipicker}
                        id="fullName"
                        type="text"
                        variant="outlined"
                        placeholder="Nhập thông tin muốn tìm"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(event) => {
                          handleSearch(event.target.value);
                        }}
                      />
                    </AtomGrid>
                    {/* <AtomGrid item>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          clearable
                          className={classes.muipicker}
                          label="Nhập hoặc chọn năm sinh"
                          openTo="year"
                          value={selectedDate}
                          views={["year"]}
                          format="yyyy"
                          onChange={(data) => {
                            handleDateChange(data);
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </AtomGrid> */}
                    <AtomGrid item xs={2}>
                      <DialogAddUser
                        setArr={setArr}
                        arr={arr}
                        setFilterArr={setFilterArr}
                      />
                    </AtomGrid>
                  </AtomGrid>
                </form>
              </AtomGrid>
            </AtomGrid>
          </Paper>
        </AtomGrid>
      </AtomGrid>
    </AtomBox>
  );
}
