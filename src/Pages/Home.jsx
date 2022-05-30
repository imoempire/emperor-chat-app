import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Contacts } from "../Components/Contacts";
import { allContacts } from "../Utils/APIs";
function Home() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const getCurrentUser = async () => {
    if (!localStorage.getItem("emperor")) {
      navigate("/signin");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("emperor")));
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allContacts}/${currentUser._id}`);
        setContacts(data.data);
        console.log(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  };

  useEffect(() => {
    getContacts();
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Home;
