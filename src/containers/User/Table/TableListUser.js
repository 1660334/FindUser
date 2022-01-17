import { React, useEffect } from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  button: {
    textTransform: "none",
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  table: {
    minWidth: "700px",
  },
  widthAva: {
    minWidth: "30px",
  },
  widthName: {
    minWidth: "100px",
  },
}));
export default function TableListUser(props) {
  const classes = useStyles();
  const { setArr, filterArr, setFilterArr } = props;

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

  return (
    <AtomBox>
      <AtomGrid container>
        <AtomGrid item xs={12}>
          <Paper elevation={3}>
            <AtomBox px={8}>
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
                      <TableCell>Ảnh đại diện</TableCell>
                      <TableCell>Họ và tên</TableCell>
                      <TableCell>Năm sinh</TableCell>
                      <TableCell align="right">Thông tin chi tiết</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterArr.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className={classes.widthAva}>
                          <Avatar src={user.avatar} />
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.bornyear}</TableCell>
                        <TableCell align="right">
                          <AtomButton>
                            <TableDialog
                              avatar={
                                <Avatar
                                  className={classes.avatar}
                                  src={user.avatar}
                                />
                              }
                              name={user.name}
                              birth={user.bornyear}
                            />
                          </AtomButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AtomBox>
          </Paper>
        </AtomGrid>
      </AtomGrid>
    </AtomBox>
  );
}
