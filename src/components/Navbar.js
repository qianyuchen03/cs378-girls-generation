import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { MapPin, Heart, Home, Users, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar fixed="bottom" className="shadow w-100 navigation-bar">
      <Container className="px-0">
        <Nav className="w-100 d-flex justify-content-evenly">
          <NavItem icon={<MapPin size={24} />} to="/recommendations" />
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
        `d-flex flex-column align-items-center nav-link-custom ${
          isActive ? "active-nav-item" : ""
        }`
      }
      end
    >
      {({ isActive }) =>
        React.cloneElement(icon, { color: isActive ? "#E4D6BE" : "#000000" })
      }
    </Nav.Link>
  );
};

export default Navigation;