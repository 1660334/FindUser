import React from "react";
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
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));
export default function FormSearch(props) {
  const { arr, setArr } = props;
  const classes = useStyles();
  const [valueSearch, setValueSearch] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const dateResult = formatDns(new Date(selectedDate), "dd/MM/yyyy");
  const resultValueSearch = valueSearch.toUpperCase();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    if (valueSearch !== "") {
      const rowNew = arr.filter((item) =>
        item.name.toUpperCase().includes(resultValueSearch)
      );
      setArr(rowNew);
    }
    if (isValidDns(selectedDate)) {
      const rowNew = arr.filter((item) => item.namsinh === dateResult);

      setArr(rowNew);
    }
  };
  return (
    <AtomBox>
      <AtomGrid container spacing={2}>
        <AtomGrid item xs={12}>
          <AtomTypography variant="h5" gutterBottom>
            <b>Tìm kiếm người dùng!</b>
          </AtomTypography>
        </AtomGrid>

        <AtomGrid item xs={12}>
          <Paper elevation={3}>
            <AtomGrid container justifyContent="space-between">
              <AtomGrid item>
                <form className={classes.root}>
                  <AtomTextField
                    id="fullName"
                    label="Họ Tên"
                    type="text"
                    style={{ margin: 16, width: "250px" }}
                    placeholder="Nhập họ tên"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      setValueSearch(event.target.value);
                    }}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      margin="normal"
                      id="date-picker-inline"
                      label="Chọn năm sinh"
                      format="dd/MM/yyyy"
                      value={selectedDate}
                      style={{ width: "250px", marginLeft: "100px" }}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </form>
              </AtomGrid>
              <AtomGrid item>
                <AtomButton
                  variant="contained"
                  style={{ margin: 32, borderRadius: "20px" }}
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
