import React, { useEffect, useState } from "react";
import MainScreen from "../../MainScreen";
import { NavLink } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { RootState } from "../../../store";
import { deleteNoteAction, listNotes } from "../../../actions/notesAction";
import Loading from "../../Loading";
import Errormsg from "../../Errormsg";
import { Note } from "../../../types/type";
import { useNavigate } from "react-router-dom";

const CustomToggle = ({
  children,
  eventKey,
}: {
  children: React.ReactNode;
  eventKey: string;
}) => {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button type="button" onClick={decoratedOnClick}>
      {children}
    </button>
  );
};
const MyNotes = ({ search }: any) => {
  const dispatch = useAppDispatch();
  const noteList = useAppSelector((state: RootState) => state.NoteLists);
  const userLogin = useAppSelector((state: RootState) => state.userLogin);
  // const noteCreate = useAppSelector((state) => state.NoteCreate);
  // const { success: successCreate } = noteCreate;
  const noteDelete = useAppSelector((state) => state.DeleteNote);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = noteDelete;
  const { userInfo } = userLogin;
  const { loading, notes, error } = noteList;
  const navigate = useNavigate();

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
      window.location.reload();
    }
  };
  useEffect(() => {
    dispatch(listNotes());

    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successDelete]);
  return (
    <div>
      <MainScreen title={`Welcome Back ${userInfo.name}`}>
        <NavLink to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create new Note
          </Button>
        </NavLink>
        {errorDelete && <Errormsg variant="danger">{errorDelete}</Errormsg>}
        {loadingDelete && <Loading />}
        {error && <Errormsg variant="danger">{error}</Errormsg>}
        {loading && <Loading />}
        {notes &&
          [...notes]
            .filter((filteredNote: Note) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((note: Note) => (
              <Accordion key={note._id}>
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      // onClick={() => ModelShow(note)}
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <CustomToggle eventKey="0"> {note.title}</CustomToggle>
                    </span>

                    <div>
                      <Button href={`/note/${note._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>

                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h4>
                        <Badge bg="success">Category - {note.category}</Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
