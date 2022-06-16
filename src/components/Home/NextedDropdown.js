import React from "react";
import { Dropdown } from "react-bootstrap";
export default class NestedDropdown extends React.Component {
  render() {
    return (
      <Dropdown.Item className="p-0">
        <Dropdown variant="primary" drop="end" autoClose="outside">
          <Dropdown.Toggle className="ps-3 w-100 d-flex justify-content-start"
            style={{ backgroundColor: "white", color: "black", border: "none", boxShadow: "none" }}>{this.props.title}</Dropdown.Toggle> <Dropdown.Menu>
            {this.props.children}
          </Dropdown.Menu>
        </Dropdown>
      </Dropdown.Item>
    );
  }
}