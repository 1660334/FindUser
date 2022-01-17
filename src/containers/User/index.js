import React from "react";
import AtomGrid from "../../Atomic/atoms/AtomGrid";
import AtomBox from "../../Atomic/atoms/AtomBox";
import { Container } from "@material-ui/core";
import UserForm from "./Form/Form";
import UserTableSearch from "./TableSearch/TableSearch";
export default function UserProfile() {
  const [arr, setArr] = React.useState([]);
  const [filterArr, setFilterArr] = React.useState([]);
  return (
    <AtomBox pt={5}>
      <Container maxWidth="lg">
        <AtomGrid container spacing={2}>
          <AtomGrid item xs={12}>
            <UserForm
              arr={arr}
              setArr={setArr}
              filterArr={filterArr}
              setFilterArr={setFilterArr}
            />
          </AtomGrid>
          <AtomGrid item xs={12}>
            <UserTableSearch
              arr={arr}
              setArr={setArr}
              filterArr={filterArr}
              setFilterArr={setFilterArr}
            />
          </AtomGrid>
        </AtomGrid>
      </Container>
    </AtomBox>
  );
}
