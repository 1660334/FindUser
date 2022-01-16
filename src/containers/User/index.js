import React from "react";
import { makeStyles } from "@material-ui/core";
import AtomGrid from "../../Atomic/atoms/AtomGrid";
import AtomBox from "../../Atomic/atoms/AtomBox";
import { Container } from "@material-ui/core";
import UserForm from "./Form/Form";
import UserTableSearch from "./TableSearch/TableSearch";
import BackGround from "./TableSearch/Avatar/bg.jpeg";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundImage: `url(${BackGround})`,
    height: "100vh",
    position: "relative",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));
export default function UserProfile() {
  const classes = useStyles();
  const [arr, setArr] = React.useState([]);

  return (
    <AtomBox pt={5} className={classes.box}>
      <Container maxWidth="lg">
        <AtomGrid container spacing={2}>
          <AtomGrid item xs={12}>
            <UserForm arr={arr} setArr={setArr} />
          </AtomGrid>
          <AtomGrid item xs={12}>
            <UserTableSearch arr={arr} setArr={setArr} />
          </AtomGrid>
        </AtomGrid>
      </Container>
    </AtomBox>
  );
}
