import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Check In Form </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="guest_name">Guest Name</Label>
              <Input
                type="text"
                name="guest_name"
                value={this.state.activeItem.guest_name}
                onChange={this.handleChange}
                placeholder="Enter Guest Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="guest_phone">Guest Phone number</Label>
              <Input
                type="tel"
                name="guest_phone"
                value={this.state.activeItem.guest_phone}
                onChange={this.handleChange}
                placeholder="Enter Guest Phone number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="guest_email">Guest Email ID</Label>
              <Input
                type="email"
                name="guest_email"
                value={this.state.activeItem.guest_email}
                onChange={this.handleChange}
                placeholder="Enter Guest Email ID"
              />
            </FormGroup>
            <FormGroup>
              <Label for="host_name">Host Name</Label>
              <Input
                type="text"
                name="host_name"
                value={this.state.activeItem.host_name}
                onChange={this.handleChange}
                placeholder="Enter Host Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="host_phone">Host Phone number</Label>
              <Input
                type="tel"
                name="host_phone"
                value={this.state.activeItem.host_phone}
                onChange={this.handleChange}
                placeholder="Enter Host Phone number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="host_email">Host Email ID</Label>
              <Input
                type="email"
                name="host_email"
                value={this.state.activeItem.host_email}
                onChange={this.handleChange}
                placeholder="Enter Host Email ID"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Check In
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
