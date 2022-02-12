import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import AtomTypography from "../../../Atomic/atoms/AtomTypography";
import AtomButton from "../../../Atomic/atoms/AtomButton";
import AtomGrid from "../../../Atomic/atoms/AtomGrid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import { allImage } from "./Avatar/Avatar";
import TableDialog from "./Dialog/DialogTable";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// const randomNumber = () => {
//   const num = Math.floor(Math.random() * 10000);
//   return num;
// };

const useStyles = makeStyles((theme) => ({
  root: {},

  table: {
    minWidth: "700px",
  },
  widthTableCellname: {
    maxWidth: "100px",
  },
  widthNoData: {
    minWidth: 200,
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
  const { arr, setArr, filterArr, setFilterArr } = props;

  const userData = [
    {
      id: 1,
      avatar: allImage.h1,
      name: "Võ Lâm Quỳnh Như",
      bornyear: "2022",
    },
    {
      id: 2,
      avatar: allImage.h2,
      name: "Hoàng Võ Kì Lân",
      bornyear: "1990",
    },

    {
      id: 3,
      avatar: allImage.h3,
      name: "Huỳnh Quốc Luân",
      bornyear: "1996",
    },
    {
      id: 4,
      avatar: allImage.h4,
      name: "Võ Thị Thu Diễm",
      bornyear: "1996",
    },
    {
      id: 5,
      avatar: allImage.h5,
      name: "Huỳnh Thị Đào",
      bornyear: "1994",
    },
    {
      id: 6,
      avatar: allImage.h6,
      name: "Lê Đông Quốc",
      bornyear: "1998",
    },
    {
      id: 7,
      avatar: allImage.h2,
      name: "Trần Lê Anh Thư",
      bornyear: "2001",
    },
    {
      id: 8,
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

  const handleClickDeleteRows = (data) => {
    const rowNew = arr.filter((item) => item.id !== data);

    setArr(rowNew);
    setFilterArr(rowNew);
    console.log("rowNew", rowNew);
  };
  const handleGetData = (data) => {
    //đây là hàm khi click vào button thì sẻ mở dialog lên , trong hàm thì ta truyền data vào khi dialog dc mở lên
    setDataDialog(data);
    setOpen(true);
  };

  return (
    <AtomGrid container>
      <AtomGrid item xs={12}>
        <Card>
          <CardContent>
            <AtomTypography component={"div"} variant="h6" gutterBottom>
              {" "}
              <b>Danh sách người dùng</b>
            </AtomTypography>
            <Card>
              <TableContainer className={classes.root}>
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
                      <TableCell align="right"></TableCell>
                      <TableCell className={classes.widthTableCell}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterArr.length > 0 ? (
                      filterArr.map((user) => (
                        <TableRow key={user.id}>
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
                          <TableCell align="right">
                            <AtomButton
                              className={classes.button}
                              component={"span"}
                              size="small"
                              color="primary"
                              onClick={() => handleGetData(user)}
                            >
                              Xem chi tiết
                            </AtomButton>
                          </TableCell>
                          <TableCell>
                            <AtomButton
                              className={classes.button}
                              size="small"
                              color="primary"
                              onClick={(data) => handleClickDeleteRows(user.id)}
                            >
                              Xoá
                            </AtomButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className={classes.widthId}></TableCell>
                        <TableCell
                          className={classes.widthTableCell}
                        ></TableCell>
                        <TableCell
                          align="right"
                          className={classes.widthNoData}
                        >
                          Không tìm thấy dữ liệu tìm kiếm
                        </TableCell>
                        <TableCell
                          className={classes.widthTableCell}
                          align="center"
                        ></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </CardContent>
        </Card>
      </AtomGrid>
      {/* //chỉ khi nào open bằng true mới mở dialog và truyền data từ mảng vào cho props data bên component TableDialog */}
      {open && <TableDialog data={dataDialog} setOpen={setOpen} open={open} />}
    </AtomGrid>
  );
}
