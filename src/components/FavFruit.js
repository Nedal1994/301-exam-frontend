import React from 'react';
import { withAuth0 } from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import UpdateForm from './UpdateForm'
import FruitCard from './FruitCard'
import './FavFruit.css'
class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitsArr: [],
      showFlag: false,
      show: false,
      name: '',
      image: '',
      price: '',
      fruitId: ''
    }
  }
  componentDidMount = () => {
    const { user, isAuthenticated } = this.props.auth0
    const email = user.email
    if (isAuthenticated) {
      axios
        .get(`https://final-exam301.herokuapp.com/getFruits?email=${email}`)
        .then(result => {
          this.setState({
            fruitsArr: result.data
          })
        })
        .catch(error => {
          console.log('error');
        })
    }
  }


  updateFruit = (event) => {
    event.preventDefault()
    const { user } = this.props.auth0
    const email = user.email
    const object = {
      name: event.target.name.value,
      image: event.target.image.value,
      price: event.target.price.value,
      email: email
    }
    axios
      .put(`https://final-exam301.herokuapp.com/updateFruit/${this.state.fruitId}`, object)
      .then(result => {
        this.setState({
          fruitsArr: result.data
        })
      })
      .catch(error => {
        console.log('error');
      })
  }


  deleteFruit = (id) => {
    const { user } = this.props.auth0
    const email = user.email
    axios
      .delete(`https://final-exam301.herokuapp.com/deleteFruit/${id}?email=${email}`)
      .then(result => {
        this.setState({
          fruitsArr: result.data
        })
      })
      .catch(error => {
        console.log('error');
      })
  }

  handleClose = () => {
    this.setState({
      show: false,
      showFlag: false
    })
  }
  handleShow = () => {
    this.setState({
      show: true,
      showFlag: true
    })
  }
  showUpdateForm = () => {
    this.setState({
      show: true,
    })
  }


  render() {
    console.log(this.state.fruitsArr);
    return (
      <>
        <h1>My Favorite Fruits</h1>
        {this.state.fruitsArr.map((item) => {
          return (
            <FruitCard
              item={item}
              updateFruit={this.updateFruit}
            />
          )
        })}

        <UpdateForm
          show={this.state.showFlag}
          handleShow={this.handleShow}
          fruitsArr={this.state.fruitsArr}
          name={this.state.name}
          image={this.state.image}
          price={this.state.price}
          showUpdateForm={this.showUpdateForm}
        />
      </>
    )
  }
}
export default withAuth0(FavFruit);