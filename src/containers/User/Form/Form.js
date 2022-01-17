import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import AtomTypography from "../../../Atomic/atoms/AtomTypography";
import AtomTextField from "../../../Atomic/atoms/AtomTextField";
import AtomButton from "../../../Atomic/atoms/AtomButton";
import AtomBox from "../../../Atomic/atoms/AtomBox";
import AtomGrid from "../../../Atomic/atoms/AtomGrid";
import { Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import formatDns from "date-fns/format";
import isValidDns from "date-fns/isValid";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
  },
  muipicker: {
    marginTop: theme.spacing(0),
    width: "250px",
    marginRight: theme.spacing(4),
  },
  buttonstyle: {
    margin: 16,
    borderRadius: "20px",
    textTransform: "none",
  },
}));
export default function Form(props) {
  const { arr, setFilterArr } = props;
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (data) => {
    console.log("input", data);

    if (isValidDns(data)) {
      const rowNew = arr.filter(
        (item) => item.bornyear === formatDns(new Date(data), "yyyy")
      );

      setFilterArr(rowNew);
      setSelectedDate(data);
    } else {
      setFilterArr(arr);
    }
  };

  const handleSearch = (value) => {
    console.log("input", value);
    if (value !== "") {
      const rowNew = arr.filter((item) =>
        item.name.toUpperCase().includes(value.toUpperCase())
      );

      setFilterArr(rowNew);
    } else {
      setFilterArr(arr);
    }
  };
  return (
    <AtomBox>
      <AtomGrid container>
        <AtomGrid item xs={12}>
          <AtomTypography variant="h5" gutterBottom>
            <b>Tìm kiếm người dùng!</b>
          </AtomTypography>
        </AtomGrid>

        <AtomGrid item xs={12}>
          <Paper elevation={3}>
            <AtomGrid container>
              <AtomGrid item xs={12} md="true">
                <form className={classes.root}>
                  <AtomGrid container>
                    <AtomGrid item>
                      <AtomTextField
                        className={classes.muipicker}
                        id="fullName"
                        type="text"
                        label="Nhập họ tên"
                        placeholder="Nhập họ tên muốn tìm"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(event) => {
                          handleSearch(event.target.value);
                        }}
                      />
                    </AtomGrid>
                    <AtomGrid item>
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
                    </AtomGrid>
                  </AtomGrid>
                </form>
              </AtomGrid>
              <AtomGrid item xs={12} md="auto">
                <AtomButton
                  variant="contained"
                  className={classes.buttonstyle}
                  size="large"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </AtomButton>
              </AtomGrid>
            </AtomGrid>
          </Paper>
        </AtomGrid>
      </AtomGrid>
    </AtomBox>
  );
}
