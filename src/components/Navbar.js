import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { MapPin, Heart, Home, Users, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom" className="shadow w-100">
      <Container className="px-0">
        <Nav className="w-100 d-flex justify-content-evenly">
          <NavItem icon={<MapPin size={24} />} to="/map" />
          <NavItem icon={<Heart size={24} />} to="/saved" />
          <NavItem icon={<Home size={24} />} to="/" />
          <NavItem icon={<Users size={24} />} to="/friends" />
          <NavItem icon={<User size={24} />} to="/profile" />
        </Nav>
      </Container>
    </Navbar>
  );
};

const NavItem = ({ icon, to = "#" }) => {
  return (
    <Nav.Link 
      as={NavLink} 
      to={to} 
      className={({ isActive }) => 
        `d-flex flex-column align-items-center text-dark ${
          isActive ? "active-nav-item" : ""
        }`
      }
      end
    >
      {icon}
    </Nav.Link>
  );
};

export default Navigation;