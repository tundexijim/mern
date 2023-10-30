import React, { useEffect, useState } from "react";
import MainScreen from "../../MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hook";
import {
  deleteNoteAction,
  updateNoteAction,
} from "../../../actions/notesAction";
import Errormsg from "../../Errormsg";
import Loading from "../../Loading";
import ReactMarkdown from "react-markdown";
import { Note } from "../../../types/type";
import { useNavigate, useParams } from "react-router-dom";

const SingleNote = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const noteUpdate = useAppSelector((state) => state.UpdateNote);
  const { loading, error } = noteUpdate;

  const noteDelete = useAppSelector((state) => state.DeleteNote);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data }: { data: Note } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <Errormsg variant="danger">{error}</Errormsg>}
            {errorDelete && <Errormsg variant="danger">{errorDelete}</Errormsg>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content" style={{ marginBottom: 20 }}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler()}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
