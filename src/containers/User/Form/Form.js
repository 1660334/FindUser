import React from "react";
import { makeStyles } from "@material-ui/core";
import AtomTypography from "../../../Atomic/atoms/AtomTypography";
import AtomTextField from "../../../Atomic/atoms/AtomTextField";
import AtomButton from "../../../Atomic/atoms/AtomButton";
import AtomBox from "../../../Atomic/atoms/AtomBox";
import AtomGrid from "../../../Atomic/atoms/AtomGrid";
import { Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));
export default function FormSearch(props) {
  console.log(props);
  const { arr, setArr } = props;
  const classes = useStyles();
  const [valueSearch, setValueSearch] = React.useState("");
  const handleSearch = () => {
    const rowNew = arr.filter((item) => item.name.name === valueSearch);
    setArr(rowNew);
  };
  return (
    <AtomBox>
      <AtomGrid container spacing={5}>
        <AtomGrid item xs={12}>
          <AtomTypography variant="h4" gutterBottom>
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
                    style={{ margin: 16, width: "300px" }}
                    placeholder="Nhập họ tên"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      setValueSearch(event.target.value);
                    }}
                  />
                  <AtomTextField
                    id="date"
                    label="Năm sinh"
                    type="date"
                    style={{ margin: 16, width: "300px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    
                  />
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
