import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { MapPin, Heart, Home, Users, User } from "lucide-react";

const Navigation = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom" className="shadow w-100">
      <Container className="px-0">
        <Nav className="w-100 d-flex justify-content-evenly">
          <NavItem icon={<MapPin size={24} />} />
          <NavItem icon={<Heart size={24} />} />
          <NavItem icon={<Home size={24} />} />
          <NavItem icon={<Users size={24} />} />
          <NavItem icon={<User size={24} />} />
        </Nav>
      </Container>
    </Navbar>
  );
};

const NavItem = ({ icon }) => {
  return (
    <Nav.Link className="d-flex flex-column align-items-center text-dark">
      {icon}
    </Nav.Link>
  );
};

export default Navigation;
