import React, { ReactNode } from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";
const MainScreen = ({
  title,
  children,
}: {
  title: String;
  children: ReactNode;
}) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
