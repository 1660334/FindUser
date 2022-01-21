import React, { useState } from "react";
import { InputLabel, makeStyles } from "@material-ui/core";
import AtomTypography from "../../../Atomic/atoms/AtomTypography";
import AtomTextField from "../../../Atomic/atoms/AtomTextField";
import AtomBox from "../../../Atomic/atoms/AtomBox";
import AtomGrid from "../../../Atomic/atoms/AtomGrid";
import { Paper } from "@material-ui/core";
import DialogAddUser from "../Table/Dialog/DialogAddUser";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
  },
  muipicker: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(4),
  },
  borderRadius: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default function Form(props) {
  const { arr, setArr, setFilterArr } = props;
  const [selectYearSearch, setSelectYearSearch] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const classes = useStyles();
  //hàm onFilter để filter khi value # null nếu value = null thì return mảng gốc.
  // ngược lại thì tiến hành filter ó điều kiện,  xem có thoả value hay không? rồi tiến hành filter
  const onFilter = () => {
    if (textSearch !== "") {
      const rowNew = arr.filter((item, index) => {
        if (selectYearSearch === "") {
          //nếu value selectYear là null thì filter ra những giá trị thoả một trong các điều kiện bên dưới
          return (
            //ĐK 1 : value textSearch === item.name trong mảng ban đầu(arr) thì filter những row thoả điều kiện
            item.name
              .toUpperCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D")
              .includes(
                textSearch
                  .toUpperCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/đ/g, "d")
                  .replace(/Đ/g, "D")
              ) || //hoặc
            //ĐK 2: value textSearch === item.bornyear trong mảng ban đầu(arr) thì filter những row thoả điều kiện
            item.bornyear === textSearch ||
            //ĐK 3: value textSearch === ID index + 1(lấy id của table mui)   thì filter những row thoả điều kiện
            index + 1 === Number(textSearch)
          );
        }
        //nếu value selectYear === "big" thì filter ra những row thoả  điều kiện item.bornyear > textSearch từ mảng ban đầu
        if (selectYearSearch === "bigger" && Number(textSearch)) {
          return item.bornyear > textSearch;
        }
        //nếu value selectYear === "small" thì filter ra những row thoả  điều kiện item.bornyear < textSearch; từ mảng ban đầu
        if (selectYearSearch === "lesser" && Number(textSearch)) {
          return item.bornyear < textSearch;
        }
        return item.bornyear === textSearch;
      });
      setFilterArr(rowNew);
    } else {
      setFilterArr(arr);
    }
  };
  // hàm handleSelectYear truyền value ta select chọn cho hàm setTextSearch() để thay đổi giá trị hiện tại của selectYear
  const handleSelectYearSearch = (event) => {
    setSelectYearSearch(event.target.value);
  };
  // hàm handleSearch truyền value nhập vào cho hàm setTextSearch()
  const handleSearch = (value) => {
    setTextSearch(value);
  };
  // dùng useEffect để theo dõi xem selectYear, textSearch có thay đổi hay không
  // nếu có bất kì thay đổi nào thì render hamf firter onFilter()
  React.useEffect(() => {
    onFilter();
  }, [selectYearSearch, textSearch]);

  // data ban dau khi them item
  const newData = { id: arr.length + 1, avatar: "", name: "", bornyear: "" };
  //hàm thêm 1 object data vào table sau khi click lưu
  const hanldGetNewItem = () => {
    setArr([...arr, newData]);
    setFilterArr([...arr, newData]);
  };

  return (
    <AtomBox>
      <AtomGrid container>
        <AtomGrid item xs={12}>
          <AtomTypography variant="h5" gutterBottom>
            <b>Quản lý người dùng!</b>
          </AtomTypography>
        </AtomGrid>

        <AtomGrid item xs={12}>
          <Paper elevation={1}>
            <AtomGrid container>
              <AtomGrid item xs={12}>
                <form className={classes.root}>
                  <AtomGrid container spacing={2}>
                    <AtomGrid item xs={8}>
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
                    <AtomGrid item xs={2}>
                      <FormControl className={classes.root} fullWidth>
                        <InputLabel
                          shrink
                          id="demo-simple-select-placeholder-label-label"
                        >
                          Select Year Search
                        </InputLabel>
                        <Select
                          autoWidth
                          className={classes.borderRadius}
                          value={selectYearSearch}
                          onChange={handleSelectYearSearch}
                          inputProps={{ "aria-label": "Without label" }}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="bigger">bigger</MenuItem>
                          <MenuItem value="lesser"> lesser</MenuItem>
                          <MenuItem value="equal"> equal</MenuItem>
                        </Select>
                      </FormControl>
                    </AtomGrid>

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
