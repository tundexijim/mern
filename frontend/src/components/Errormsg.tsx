import React from "react";
import { Alert } from "react-bootstrap";

const Errormsg = ({
  children,
  variant = "info",
}: {
  children: string | boolean;
  variant: string;
}) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default Errormsg;
