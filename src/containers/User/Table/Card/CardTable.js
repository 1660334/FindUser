import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import AtomTypography from "../../../../Atomic/atoms/AtomTypography";
import AtomBox from "../../../../Atomic/atoms/AtomBox";
import AtomButton from "../../../../Atomic/atoms/AtomButton";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
  root: { minWidth: "100%", paddingTop: theme.spacing(2) },

  button: {
    textTransform: "none",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  //   typography: {
  //     marginLeft: "40px",
  //   },
}));
export default function ListCard(props) {
  const classes = useStyles();
  const {
    filterArr,
    handleGetDataEditRows,
    handleGetDataProfile,
    handleGetDataDeleteRows,
  } = props;
  return (
    <AtomBox>
      {filterArr.length > 0 ? (
        filterArr.map((user) => (
          <AtomBox className={classes.root}>
            <Card key={user.id}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <Avatar className={classes.large} src={user.avatar} />
                  }
                  title={` Họ và tên:  ${user.name}`}
                  subheader={` Năm sinh:  ${user.bornyear}`}
                />
              </CardActionArea>
              <CardActions>
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
                <AtomButton
                  className={classes.button}
                  size="small"
                  color="primary"
                  onClick={(data) => handleGetDataEditRows(user)} //truyền data user vào hàm handleGetDataEditRows khi ta click
                >
                  Sửa
                </AtomButton>
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
              </CardActions>
            </Card>
          </AtomBox>
        ))
      ) : (
        <AtomTypography align="center">
          Không tìm thấy dữ liệu tìm kiếm
        </AtomTypography>
      )}
    </AtomBox>
  );
}
