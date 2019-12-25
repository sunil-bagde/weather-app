import React from "react";
import Nav from "react-bootstrap/Nav";

let Navbar = () => {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/home">Weatherpedia</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1">Map</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2">About</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
