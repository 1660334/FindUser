import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import AtomTypography from "../../../Atomic/atoms/AtomTypography";
import AtomButton from "../../../Atomic/atoms/AtomButton";
import AtomBox from "../../../Atomic/atoms/AtomBox";
import AtomGrid from "../../../Atomic/atoms/AtomGrid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import { allImage } from "./Avatar/Avatar";
import TableDialog from "./Dialog/DialogTable";
import { useUniqueId } from "../../helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  table: {
    minWidth: "700px",
  },
  widthTableCellname: {
    maxWidth: "100px",
  },
  button: {
    textTransform: "none",
  },
  marginAvt: {
    marginLeft: theme.spacing(2),
  },
  widthTableCell: {
    width: 80,
  },
  widthId: {
    width: 10,
  },
}));
export default function TableListUser(props) {
  const classes = useStyles();
  const { setArr, arr, filterArr, setFilterArr } = props;

  const userData = [
    {
      id: useUniqueId(),
      avatar: allImage.h1,
      name: "Võ Lâm Quỳnh Như",
      bornyear: "2022",
    },
    {
      id: useUniqueId(),
      avatar: allImage.h2,
      name: "Hoàng Võ Kì Lân",
      bornyear: "1990",
    },

    {
      id: useUniqueId(),
      avatar: allImage.h3,
      name: "Huỳnh Quốc Luân",
      bornyear: "1996",
    },
    {
      id: useUniqueId(),
      avatar: allImage.h4,
      name: "Võ Thị Thu Diễm",
      bornyear: "1996",
    },
    {
      id: useUniqueId(),
      avatar: allImage.h5,
      name: "Huỳnh Thị Đào",
      bornyear: "1994",
    },
    {
      id: useUniqueId(),
      avatar: allImage.h6,
      name: "Lê Đông Quốc",
      bornyear: "1998",
    },
    {
      id: useUniqueId(),
      avatar: allImage.h2,
      name: "Trần Lê Anh Thư",
      bornyear: "2001",
    },
    {
      id: useUniqueId(),
      avatar: allImage.h7,
      name: "Nguyễn Thị Cẩm Hồng",
      bornyear: "2002",
    },
  ];

  useEffect(() => {
    setArr(userData);
    setFilterArr(userData);
  }, []);
  //tạo 1 state để mở và đóng dialog
  const [open, setOpen] = React.useState(false);

  const [dataDialog, setDataDialog] = useState({}); //tạo 1 biến để gan dữ liệu của row khi rander ra

  const handleGetData = (data) => {
    //đây là hàm khi click vào button thì sẻ mở dialog lên , trong hàm thì ta truyền data vào khi dialog dc mở lên
    setDataDialog(data);
    setOpen(true);
  };

  return (
    <AtomBox>
      <AtomGrid container>
        <AtomGrid item xs={12}>
          <Paper elevation={3}>
            <AtomBox>
              <TableContainer className={classes.root}>
                <AtomTypography variant="h6" gutterBottom>
                  {" "}
                  <b>Danh sách người dùng</b>
                </AtomTypography>
                <Table
                  size="small"
                  aria-label="a dense table"
                  className={classes.table}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.widthId}>ID</TableCell>
                      <TableCell className={classes.widthTableCell}>
                        Ảnh đại diện
                      </TableCell>
                      <TableCell className={classes.widthTableCellname}>
                        Họ và tên
                      </TableCell>
                      <TableCell
                        className={classes.widthTableCell}
                        align="center"
                      >
                        Năm sinh
                      </TableCell>
                      <TableCell>Thông tin chi tiết</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterArr.length > 0 ? (
                      filterArr.map((user) => (
                        <TableRow>
                          <TableCell className={classes.widthId}>
                            {user.id}
                          </TableCell>
                          <TableCell className={classes.widthTableCell}>
                            <Avatar
                              className={classes.marginAvt}
                              src={user.avatar}
                            />
                          </TableCell>
                          <TableCell className={classes.widthTableCellname}>
                            {user.name}
                          </TableCell>
                          <TableCell
                            className={classes.widthTableCell}
                            align="center"
                          >
                            {user.bornyear}
                          </TableCell>
                          <TableCell>
                            <AtomButton
                              className={classes.button}
                              size="small"
                              color="primary"
                              onClick={() => handleGetData(user)}
                            >
                              Xem chi tiết
                            </AtomButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </AtomBox>
          </Paper>
        </AtomGrid>
      </AtomGrid>
      {/* //chỉ khi nào open bằng true mới mở dialog và truyền data từ mảng vào cho props data bên component TableDialog */}
      {open && <TableDialog data={dataDialog} setOpen={setOpen} open={open} />}
    </AtomBox>
  );
}
