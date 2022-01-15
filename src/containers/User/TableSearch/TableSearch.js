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
import TableDialog from "./Dialog/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  button: {
    textTransform: "none",
  },
}));
export default function UserTableSearch(props) {
  const classes = useStyles();
  const { arr, setArr } = props;
  const row = [
    {
      avatar: <Avatar src={allImage.h3} />,
      name: "Võ Lâm Quỳnh Như",
      namsinh: "22/06/2022",

      xemchitiet: (
        <AtomButton>
          <TableDialog
            avatar={
              <Avatar
                src={allImage.h3}
                style={{ width: "100%", height: "100%" }}
              />
            }
            fullnameDetail="Võ Lâm Quỳnh Như"
            birth="22/06/2000"
            phone="0909090909"
            city="Quảng Ngãi"
          />
        </AtomButton>
      ),
    },
    {
      avatar: <Avatar src={allImage.h1} />,
      name: "Hoàng Võ Kì Lân",
      namsinh: "22/06/2000",

      xemchitiet: (
        <AtomButton>
          <TableDialog
            avatar={
              <Avatar
                src={allImage.h1}
                style={{ width: "100%", height: "100%" }}
              />
            }
            fullnameDetail="Võ Lâm Quỳnh Như"
            birth="22/06/2000"
            phone="0909090909"
            city="Quảng Ngãi"
          />
        </AtomButton>
      ),
    },

    {
      avatar: <Avatar src={allImage.h2} />,
      name: "Huỳnh Quốc Luân",
      namsinh: "13/08/1996",

      xemchitiet: (
        <AtomButton>
          <TableDialog
            avatar={
              <Avatar
                src={allImage.h2}
                style={{ width: "100%", height: "100%" }}
              />
            }
            fullnameDetail="Huỳnh Quốc Luân"
            birth="13/08/1996"
            phone="0909090908"
            city="Quảng Nam"
          />
        </AtomButton>
      ),
    },
    {
      avatar: <Avatar src={allImage.h3} />,
      name: "Võ Thị Thu Diễm",
      namsinh: "01/04/1996",

      xemchitiet: (
        <AtomButton>
          <TableDialog
            avatar={
              <Avatar
                src={allImage.h3}
                style={{ width: "100%", height: "100%" }}
              />
            }
            fullnameDetail="Võ Thị Thu Diễm"
            birth="01/04/1996"
            phone="0909090907"
            city="Quảng Trị"
          />
        </AtomButton>
      ),
    },
    {
      avatar: <Avatar src={allImage.h4} />,
      name: "Huỳnh Thị Đào",
      namsinh: "17/09/1994",

      xemchitiet: (
        <AtomButton>
          <TableDialog
            avatar={
              <Avatar
                src={allImage.h4}
                style={{ width: "100%", height: "100%" }}
              />
            }
            fullnameDetail="Huỳnh Thị Đào"
            birth="17/09/1994"
            phone="0909090906"
            city="Quảng Bình"
          />
        </AtomButton>
      ),
    },
    {
      avatar: <Avatar src={allImage.h5} />,
      name: "Lê Đông Quốc",
      namsinh: "18/04/1998",

      xemchitiet: (
        <AtomButton>
          <TableDialog
            avatar={
              <Avatar
                src={allImage.h5}
                style={{ width: "100%", height: "100%" }}
              />
            }
            fullnameDetail="Lê Đông Quốc"
            birth="18/04/1998"
            phone="0909090904"
            city="Hồ Chí Minh"
          />
        </AtomButton>
      ),
    },
    {
      avatar: <Avatar src={allImage.h6} />,
      name: "Trần Lê Anh Thư",
      namsinh: "12/12/2001",

      xemchitiet: (
        <AtomButton>
          <TableDialog
            avatar={
              <Avatar
                src={allImage.h6}
                style={{ width: "100%", height: "100%" }}
              />
            }
            fullnameDetail="Trần Lê Anh Thư"
            birth="12/12/2001"
            phone="0909090903"
            city="Đà Nẵng"
          />
        </AtomButton>
      ),
    },
    {
      avatar: <Avatar src={allImage.h7} />,
      name: "Nguyễn Thị Cẩm Hồng",
      namsinh: "12/02/2002",

      xemchitiet: (
        <AtomButton>
          <TableDialog
            avatar={
              <Avatar
                src={allImage.h7}
                style={{ width: "100%", height: "100%" }}
              />
            }
            fullnameDetail="Nguyễn Thị Cẩm Hồng"
            birth="12/02/2002"
            phone="0909090901"
            city="Thừa Thiên - Huế"
          />
        </AtomButton>
      ),
    },
  ];
  useEffect(() => {
    setArr(row);
  }, []);
  return (
    <AtomBox>
      <AtomGrid container>
        <AtomGrid item xs={12}>
          <Paper elevation={3}>
            <AtomBox px={8}>
              <TableContainer className={classes.root}>
                <AtomTypography variant="h5" gutterBottom>
                  {" "}
                  <b>Table User</b>
                </AtomTypography>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "18px" }}>Avatar</TableCell>
                      <TableCell align="right" style={{ fontSize: "18px" }}>
                        Họ và Tên
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "18px" }}>
                        Năm sinh
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "18px" }}>
                        Thông tin chi tiết
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {arr.map((item) => (
                      <TableRow>
                        <TableCell>{item.avatar}</TableCell>
                        <TableCell align="right">{item.name}</TableCell>
                        <TableCell align="right">{item.namsinh}</TableCell>
                        <TableCell align="right">{item.xemchitiet}</TableCell>
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
