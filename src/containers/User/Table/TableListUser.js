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
import TableDialog from "./Dialog/DialogTable";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import dataUser from "../../../database/db.json";
import DialogAddUser from "./Dialog/DialogAddUser";

const useStyles = makeStyles((theme) => ({
  root: { minWidth: "600px" },

  table: {
    minWidth: "600px",
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
  widthTableCellbutton: {
    width: 40,
  },
  widthId: {
    width: 10,
  },
}));
export default function TableListUser(props) {
  const classes = useStyles();
  const { arr, setArr, filterArr, setFilterArr } = props;
  useEffect(() => {
    setArr(dataUser);
    setFilterArr(dataUser);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //tạo 1 state để mở và đóng dialog
  const [open, setOpen] = React.useState(false);

  const [dataDialog, setDataDialog] = useState({}); //tạo 1 biến để gan dữ liệu của row khi rander ra
  const [dataDialogEdit, setDataDialogEdit] = useState({});
  const [openModalAddUser, setOpenModalSetUser] = useState(false);

  const handleClickDeleteRows = (data) => {
    const rowNew = arr.filter((item) => item.id !== data);

    setArr(rowNew);
    setFilterArr(rowNew);
    console.log("rowNew", rowNew);
  };
  const handleClickEditRows = (data) => {
    setDataDialogEdit(data);
    setOpenModalSetUser(true);
    console.log("rowID", data);
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
                      <TableCell
                        align="right"
                        className={classes.widthTableCellbutton}
                      ></TableCell>
                      <TableCell
                        className={classes.widthTableCellbutton}
                      ></TableCell>
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
                              onClick={() => handleClickEditRows(user)}
                            >
                              Sửa
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
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="center">
                          Không tìm thấy dữ liệu tìm kiếm
                        </TableCell>
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
      {openModalAddUser && (
        <DialogAddUser
          setArr={setArr}
          arr={arr}
          setFilterArr={setFilterArr}
          newData={dataDialogEdit}
          openModalAddUser={openModalAddUser}
          setOpenModalSetUser={setOpenModalSetUser}
          isUpdate={true}
          title={"Thay đổi thông tin người dùng"}
        />
      )}
    </AtomGrid>
  );
}
