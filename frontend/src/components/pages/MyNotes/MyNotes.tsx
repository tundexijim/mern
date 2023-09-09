import React from 'react'
import MainScreen from '../../MainScreen'
import { NavLink } from 'react-router-dom'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import {notes} from '../../../data/data'
const CustomToggle = ({ children, eventKey }: any) => {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button
      type="button"
      
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
const MyNotes = () => {
  const deleteHandler = (id: String) => {
    if (window.confirm("Are you sure?")) {
    }
  };
  return (
    <div>
        <MainScreen title="This is my note">
        <NavLink to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
        </NavLink>
        {
          notes.map(note =>(
            <Accordion>
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
                <CustomToggle eventKey="0">
               { note.title}
               </CustomToggle>
              </span>
              <div>
                <Button href={`/note/${note.id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note.id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
            <Card.Body>
            <h4>
                      <Badge bg='success'>
                        Category - {note.category}
                      </Badge>
                    </h4>
            <blockquote className="blockquote mb-0">
           <p>
           {note.content}
          </p>
          <footer className="blockquote-footer">Created On -date</footer>
        </blockquote>
      </Card.Body>
      </Accordion.Collapse>
      </Card>
      </Accordion>
          ))
        }    
        </MainScreen>
    </div>
  )
}

export default MyNotes