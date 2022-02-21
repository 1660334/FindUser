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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import dataUser from "../../../database/db.json";
import TableDialog from "./Dialog/DialogTable";
import DialogDeleteUser from "./Dialog/DialogDeleteUser";
import DialogEditDataUser from "./Dialog/DialogChangeData";

const useStyles = makeStyles((theme) => ({
  root: { maxWidth: "100%" },

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
  buttonstyle: {
    borderRadius: "20px",
    height: 50,
    textTransform: "none",
  },
}));
export default function TableListUser(props) {
  const { arr, setArr, filterArr, setFilterArr } = props;
  const classes = useStyles();

  useEffect(() => {
    setArr(dataUser); //truyền data từ file .json cho hàm setArr để thay đổi giá trị biến arr ban đầu khi reload
    setFilterArr(dataUser);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //tạo 1 state để mở và đóng dialog
  const [openDialogProfile, setOpenDialogProfile] = useState(false);
  const [dataDialogProfile, setDataDialogProfile] = useState({}); //tạo 1 biến để gan dữ liệu của row khi rander ra
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [getIdDelete, setGetIdDelete] = useState({});
  const [getDataEdit, setGetDataEdit] = useState({});
  const [openDialogChangeUser, setOpenDialogChangeUser] = useState(false);

  const handleClickDeleteRows = (data) => {
    const rowNew = filterArr.filter((item) => item.id !== data);

    setFilterArr(rowNew);

    console.log("rowNew", rowNew);
  };

  const dataEdit = {
    name: "",
    avatar: "",
    bornyear: "",
    id: getDataEdit.id,
  };
  const handleClickEditRowUser = (data) => {
    return arr.filter((item) => {
      if (item.id === data) {
        arr[0] = dataEdit;
        setFilterArr(arr);
      }
      return setFilterArr(arr);
    });
  };

  const handleGetDataDialogEditUser = (data) => {
    setOpenDialogChangeUser(true);
    setGetDataEdit(data);
  };
  const handleGetDataDelete = (data) => {
    setOpenDialogDelete(true);
    setGetIdDelete(data);
  };
  const handleGetDataDialogProfile = (data) => {
    //KHI CLICK VÀO THÌ BIẾN OPEN SẺ THAY ĐỔI THÀNH TRUE VÀ MỞ DIALOG XEM CHI TIẾT LÊN
    setOpenDialogProfile(true);
    setDataDialogProfile(data);
  };

  //hàm thêm 1 object data vào table sau khi click lưu

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
                              onClick={() => {
                                handleGetDataDialogProfile(user);
                                console.log("user", user);
                              }}
                            >
                              Xem chi tiết
                            </AtomButton>
                          </TableCell>
                          <TableCell>
                            <AtomButton
                              className={classes.button}
                              size="small"
                              color="primary"
                              onClick={(data) =>
                                handleGetDataDialogEditUser(user)
                              }
                            >
                              Sửa
                            </AtomButton>
                          </TableCell>
                          <TableCell>
                            <AtomButton
                              className={classes.button}
                              size="small"
                              color="primary"
                              onClick={(data) => {
                                handleGetDataDelete(user.id);
                                console.log("id", user.id);
                              }}
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
      {openDialogProfile && (
        <TableDialog
          dataDialogProfile={dataDialogProfile}
          setOpenDialogProfile={setOpenDialogProfile}
          openDialogProfile={openDialogProfile}
        />
      )}
      {openDialogDelete && (
        <DialogDeleteUser
          getIdDelete={getIdDelete}
          openDialogDelete={openDialogDelete}
          setOpenDialogDelete={setOpenDialogDelete}
          handleClickDeleteRows={handleClickDeleteRows}
        />
      )}
      {openDialogChangeUser && (
        <DialogEditDataUser
          openDialogChangeUser={openDialogChangeUser}
          setOpenDialogChangeUser={setOpenDialogChangeUser}
          getDataEdit={getDataEdit}
          handleClickEditRowUser={handleClickEditRowUser}
          dataEdit={dataEdit}
          isCheckClick="false"
        />
      )}
    </AtomGrid>
  );
}
