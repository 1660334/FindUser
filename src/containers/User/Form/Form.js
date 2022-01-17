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
    padding: theme.spacing(0),
  },
  muipicker: {
    marginTop: theme.spacing(0),
  },
}));
export default function FormSearch(props) {
  const { arr, filterArr, setFilterArr } = props;
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
      setFilterArr(rowNew);
    } else {
      setFilterArr(arr);
    }
    if (isValidDns(selectedDate)) {
      const rowNew = arr.filter((item) => item.namsinh === dateResult);

      setFilterArr(rowNew);
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
                  <AtomGrid container justifyContent="space-evenly" spacing={2}>
                    <AtomGrid item>
                      <AtomTextField
                        id="fullName"
                        type="text"
                        style={{
                          width: "250px",
                          paddingTop: "15px",
                        }}
                        placeholder="Nhập họ tên muốn tìm"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(event) => {
                          setValueSearch(event.target.value);
                        }}
                      />
                    </AtomGrid>
                    <AtomGrid item>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className={classes.muipicker}
                          disableToolbar
                          variant="inline"
                          margin="normal"
                          id="date-picker-inline"
                          label="Chọn năm sinh muốn tìm"
                          format="dd/MM/yyyy"
                          value={selectedDate}
                          style={{ width: "250px", paddingBotton: "10px" }}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </AtomGrid>
                  </AtomGrid>
                </form>
              </AtomGrid>
              <AtomGrid item xs={12} md="auto">
                <AtomGrid container justifyContent="center">
                  <AtomGrid item>
                    <AtomButton
                      variant="contained"
                      style={{
                        margin: 16,
                        borderRadius: "20px",
                      }}
                      size="large"
                      color="primary"
                      startIcon={<SearchIcon />}
                      onClick={handleSearch}
                    >
                      Tìm kiếm
                    </AtomButton>
                  </AtomGrid>
                </AtomGrid>
              </AtomGrid>
            </AtomGrid>
          </Paper>
        </AtomGrid>
      </AtomGrid>
    </AtomBox>
  );
}
