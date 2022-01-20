import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import AtomTypography from "../../../Atomic/atoms/AtomTypography";
import AtomTextField from "../../../Atomic/atoms/AtomTextField";
// import AtomButton from "../../../Atomic/atoms/AtomButton";
import AtomBox from "../../../Atomic/atoms/AtomBox";
import AtomGrid from "../../../Atomic/atoms/AtomGrid";
import { Paper } from "@material-ui/core";
import DialogAddUser from "../Table/Dialog/DialogAddUser";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  const [searchYear, setSearchYear] = useState();
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
  const handleSelectYear = (event) => {
    setSearchYear(event.target.value);
    console.log("value", event.target.value);
  };
  const handleSearch = (value) => {
    if (value !== "") {
      const rowNew = arr.filter(
        (item, index) =>
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
          index + 1 === Number(value)
      );

      setFilterArr(rowNew);
    } else {
      setFilterArr(arr);
    }
  };

  // data ban dau khi them item
  const newData = { id: arr.length + 1, avatar: "", name: "", bornyear: "" };

  const hanldGetNewItem = () => {
    setArr([...arr, newData]);
    setFilterArr([...arr, newData]);
    console.log("arr", arr)
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
          <Paper elevation={1}>
            <AtomGrid container>
              <AtomGrid item xs={12}>
                <form className={classes.root}>
                  <AtomGrid container spacing={2}>
                    <AtomGrid item xs={9}>
                      <AtomTextField
                        fullWidth
                        className={classes.muipicker}
                        id="fullName"
                        type="text"
                        label="Tìm kiếm người dùng"
                        variant="outlined"
                        placeholder="Nhập họ tên / ID / Năm sinh"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(event) => {
                          handleSearch(event.target.value);
                        }}
                      />
                    </AtomGrid>
                    <AtomGrid item xs={1}>
                      <FormControl fullWidth>
                        <Select variant="outlined" onChange={handleSelectYear}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={1}>big</MenuItem>
                          <MenuItem value={2}> small</MenuItem>
                          <MenuItem value={3}> equal</MenuItem>
                          <MenuItem value={4}> greater than equal</MenuItem>
                          <MenuItem value={5}> less than equal</MenuItem>
                        </Select>
                      </FormControl>
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
                        newData={newData}
                        hanldGetNewItem={hanldGetNewItem}
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
