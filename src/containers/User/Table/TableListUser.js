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

import Hidden from "@material-ui/core/Hidden";
import ListCard from "./Card/CardTable";

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
  alertNoData: {
    width: "40%",
  },
}));
export default function TableListUser(props) {
  const { arr, setArr, filterArr, setFilterArr } = props;
  const classes = useStyles();

  useEffect(() => {
    setArr(dataUser); //truyền data từ file .json cho hàm setArr để thay đổi giá trị biến arr ban đầu khi reload
    setFilterArr(dataUser);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //các state để mở và đóng dialog và lưu dữ liệu vào
  const [openDialogProfile, setOpenDialogProfile] = useState(false);
  const [dataDialogProfile, setDataDialogProfile] = useState({});
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [getIdDelete, setGetIdDelete] = useState({});
  const [getDataEdit, setGetDataEdit] = useState({});
  const [openDialogChangeUser, setOpenDialogChangeUser] = useState(false);

  const handleDeleteRowsModel = (data) => {
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
  //hàm handleEditRowsModelChange xử lý sự kiện click Lưu và trả về kết quả
  const handleEditRowsModelChange = (data) => {
    return arr.filter((item) => {
      if (item.id === data) {
        item.name = dataEdit.name;
        item.avatar = dataEdit.avatar;
        item.bornyear = dataEdit.bornyear;
        setFilterArr(arr);
      }
      return setFilterArr(arr);
    });
  };

  const handleGetDataEditRows = (data) => {
    setOpenDialogChangeUser(true);
    setGetDataEdit(data);
  };
  const handleGetDataDeleteRows = (data) => {
    setOpenDialogDelete(true);
    setGetIdDelete(data);
  };
  //hàm handleGetDataProfile xử lý sự kiện click buttom xemchitiet mở dialog và truyền data vào hàm setDataDialogProfile
  const handleGetDataProfile = (data) => {
    setOpenDialogProfile(true);
    setDataDialogProfile(data);
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
            <Hidden only={["sm", "md", "lg", "xl"]}>
              {" "}
              <ListCard
                filterArr={filterArr}
                handleGetDataEditRows={handleGetDataEditRows}
                handleGetDataProfile={handleGetDataProfile}
                handleGetDataDeleteRows={handleGetDataDeleteRows}
              />
            </Hidden>

            <Hidden xsDown>
              <Card>
                <TableContainer className={classes.root} overflow="auto">
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
                        <TableCell>Họ và tên</TableCell>
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
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                              <Avatar
                                className={classes.marginAvt}
                                src={user.avatar}
                              />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell align="center">
                              {user.bornyear}
                            </TableCell>
                            <TableCell align="right">
                              <AtomButton
                                className={classes.button}
                                component={"span"}
                                size="small"
                                color="primary"
                                onClick={() => {
                                  handleGetDataProfile(user); //truyền data user vào hàm handleGetDataProfile khi ta click
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
                                onClick={(data) => handleGetDataEditRows(user)} //truyền data user vào hàm handleGetDataEditRows khi ta click
                              >
                                Sửa
                              </AtomButton>
                            </TableCell>
                            <TableCell>
                              <AtomButton
                                className={classes.button}
                                size="small"
                                color="secondary"
                                onClick={(data) => {
                                  handleGetDataDeleteRows(user.id); //truyền data user.id vào hàm handleGetDataDeleteRows khi ta click
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
                          <TableCell colSpan={3} align="right">
                            Không tìm thấy dữ liệu tìm kiếm
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Hidden>
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
          handleDeleteRowsModel={handleDeleteRowsModel}
        />
      )}
      {openDialogChangeUser && (
        <DialogEditDataUser
          openDialogChangeUser={openDialogChangeUser}
          setOpenDialogChangeUser={setOpenDialogChangeUser}
          getDataEdit={getDataEdit}
          handleEditRowsModelChange={handleEditRowsModelChange}
          dataEdit={dataEdit}
          isCheckClick="false"
        />
      )}
    </AtomGrid>
  );
}
