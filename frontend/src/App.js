import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCheckout: false,
      activeItem: {
        guest_name: "",
        guest_phone: "",
        guest_email: "",
        host_name: "",
        host_phone: "",
        host_email: "",
        checkout: false
      },
      checkinList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("/api/checkin/")
      .then(res => this.setState({ checkinList: res.data }))
      .catch(err => console.log(err));
  };
  displayCheckout = status => {
    if (status) {
      return this.setState({ viewCheckout: true });
    }
    return this.setState({ viewCheckout: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCheckout(true)}
          className={this.state.viewCheckout ? "active" : ""}
        >
          Checked Out
        </span>
        <span
          onClick={() => this.displayCheckout(false)}
          className={this.state.viewCheckout ? "" : "active"}
        >
          Checked In
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCheckout } = this.state;
    const newItems = this.state.checkinList.filter(
      item => item.checkout === viewCheckout
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCheckout ? "checkedout-todo" : ""
          }`}
          title={item.guest_name}
        >
          {item.guest_name}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            View{" "}
          </button>
          <button
            onClick={
              this.state.viewCheckout
                ? () => this.handleDelete(item)
                : () => this.handleCheckout(item)
            }
            className="btn btn-danger"
          >
            Check Out
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .post(`/api/checkin/?id=${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios.post("/api/checkin/", item).then(res => this.refreshList());
  };
  handleCheckout = item => {
    const item_checkout = {
      guest_name: item.guest_name,
      guest_phone: item.guest_phone,
      guest_email: item.guest_email,
      host_name: item.host_name,
      host_phone: item.host_phone,
      host_email: item.host_email,
      checkout: true
    };
    axios
      .post(`/api/checkin/?id=${item.id}&val=1`, item_checkout)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .post(`/api/checkin/?id=${item.id}&delete=1`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = {
      guest_name: "",
      guest_phone: "",
      guest_email: "",
      host_name: "",
      host_phone: "",
      host_email: "",
      checkout: false
    };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">
          CheckIn Desk
        </h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Check In
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
