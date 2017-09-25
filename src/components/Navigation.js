import React from 'react';
import RouteLink from './RouteLink';
import { Nav, NavItem, NavDropdown, MenuItem, Navbar } from 'react-bootstrap';
import Search from '../containers/Search';

const Navigation = () => (
  <Navbar>
    <Nav bsStyle="pills" className="navbar navbar-right">
      <NavItem>
        <RouteLink to="/" onlyActiveOnIndex={true}>HOME</RouteLink>
      </NavItem>
      <NavDropdown title="MOVIES">
        <MenuItem>
          <RouteLink to="/moviespopular">Popular</RouteLink>
        </MenuItem>
        <MenuItem>
          <RouteLink to="/topratedmovies">Top Rated</RouteLink>
        </MenuItem>
        <MenuItem>
          <RouteLink to="/upcomingmovies">Upcoming</RouteLink>
        </MenuItem>
      </NavDropdown>
      <NavDropdown title="TV SHOWS">
        <MenuItem>
          <RouteLink to="/tvshowspopular">Popular</RouteLink>
        </MenuItem>
        <MenuItem>
          <RouteLink to="/topratedtvshows">Top Rated</RouteLink>
        </MenuItem>
        <MenuItem>
          <RouteLink to="/ontv">On Tv</RouteLink>
        </MenuItem>
      </NavDropdown>
    </Nav>
    <Search />
  </Navbar>
);

export default Navigation;
