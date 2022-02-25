import React, { useState, useEffect } from "react";
import { InputLabel, makeStyles } from "@material-ui/core";
import AtomTypography from "../../../Atomic/atoms/AtomTypography";
import AtomTextField from "../../../Atomic/atoms/AtomTextField";
import AtomBox from "../../../Atomic/atoms/AtomBox";
import AtomGrid from "../../../Atomic/atoms/AtomGrid";
import { Paper } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AtomButton from "../../../Atomic/atoms/AtomButton";
import DialogEditUser from "../Table/Dialog/DialogChangeData";
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

  buttonstyle: {
    borderRadius: "20px",
    height: 50,
    textTransform: "none",
  },
  title: {
    paddingBottom: theme.spacing(2),
    fontWeight: "bold",
  },
}));

export default function Form(props) {
  const { arr, setArr, setFilterArr } = props;
  const [selectYearSearch, setSelectYearSearch] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [openDialogChangeUser, setOpenDialogChangeUser] = useState(false);
  const classes = useStyles();
  const handleClickAddUser = () => {
    setOpenDialogChangeUser(true);
  };
  const newData = {
    name: "",
    avatar: "",
    bornyear: "",
    id: arr.length + 1,
  };

  const handleAddRowsModelChange = () => {
    if (
      newData.avatar.trim() !== "" &&
      newData.name.trim() !== "" &&
      newData.bornyear
    ) {
      setArr([...arr, newData]);
      setFilterArr([...arr, newData]);
    }
  };

  //hàm onFilter để filter khi value # null nếu value = null thì return mảng gốc.
  // ngược lại thì tiến hành filter ó điều kiện,  xem có thoả value hay không? rồi tiến hành filter
  const onFilter = () => {
    if (textSearch !== "") {
      const rowNew = arr.filter((item, index) => {
        if (selectYearSearch === "") {
          const textSearchSplit = textSearch.split(" ");
          console.log("textSearchSplit", textSearchSplit);
          let counter = 0;
          for (let i = 0; i < textSearchSplit.length; i++) {
            if (
              item.name
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
                .includes(
                  textSearchSplit[i]
                    .toUpperCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/đ/g, "d")
                    .replace(/Đ/g, "D")
                ) ||
              String(item.bornyear)
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
                .includes(
                  textSearchSplit[i]
                    .toUpperCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/đ/g, "d")
                    .replace(/Đ/g, "D")
                ) ||
              String(item.bornyear).includes(textSearch) ||
              index + 1 === Number(textSearch)
            ) {
              counter++;
            }
          }
          if (counter === textSearchSplit.length) return true;
          return false;
        }
        if (selectYearSearch === "bigger" && Number(textSearch)) {
          return item.bornyear > textSearch;
        }
        if (selectYearSearch === "lesser" && Number(textSearch)) {
          return item.bornyear < textSearch;
        }
        return item.bornyear === Number(textSearch);
      });

      setFilterArr(rowNew);
      console.log("filteredArray", rowNew);
    } else {
      setFilterArr(arr);
      console.log("arr", arr);
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
  useEffect(() => {
    onFilter();
  }, [selectYearSearch, textSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  // data ban dau khi them item

  return (
    <AtomBox>
      <AtomGrid container>
        <AtomGrid item xs={12}>
          <AtomTypography
            component={"span"}
            variant="h5"
            className={classes.title}
          >
            Quản lý người dùng!
          </AtomTypography>
          <AtomTypography align="right">
            <AtomButton
              variant="outlined"
              className={classes.buttonstyle}
              size="large"
              color="primary"
              onClick={() => handleClickAddUser()}
            >
              Thêm người dùng
            </AtomButton>
          </AtomTypography>
        </AtomGrid>

        <AtomGrid item xs={12}>
          <Paper elevation={1}>
            <AtomGrid container>
              <AtomGrid item xs={12}>
                <form className={classes.root}>
                  <AtomGrid container spacing={2}>
                    <AtomGrid item xs={5}>
                      <AtomTextField
                        fullWidth
                        className={classes.muipicker}
                        label="Tìm kiếm người dùng"
                        variant="outlined"
                        placeholder="Nhập họ tên / ID / Năm sinh"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={textSearch}
                        onChange={(event) => {
                          handleSearch(event.target.value);
                        }}
                      />
                    </AtomGrid>
                    <AtomGrid item xs={3}>
                      {/* //điều kiện kiểm tra textSearch có phải là 1 number và là 1 năm hay không nếu thoả điều kiện thì hiện select tìm kiếm year  */}
                      {(textSearch.length === 4 &&
                        !isNaN(Number(textSearch))) ||
                      false ? (
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
                      ) : (
                        <FormControl
                          className={classes.root}
                          fullWidth
                          disabled
                        >
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
                            inputProps={{ "aria-label": "Without label" }}
                            displayEmpty
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </AtomGrid>
                  </AtomGrid>
                </form>
              </AtomGrid>
            </AtomGrid>
          </Paper>
        </AtomGrid>
      </AtomGrid>
      {openDialogChangeUser && (
        <DialogEditUser
          openDialogChangeUser={openDialogChangeUser}
          setOpenDialogChangeUser={setOpenDialogChangeUser}
          handleAddRowsModelChange={handleAddRowsModelChange}
          newData={newData}
          isCheckClick="true"
        />
      )}
    </AtomBox>
  );
}
