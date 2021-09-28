import React from 'react';
import {withAuth0} from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import AddFruit from './AddFruit';
import './Home.css'
class Home extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
      fruitsArr:[],
      newfruit:[],
      showFlag:false,
      show:false,
      name:'',
      image:'',
      price:''
    }
  }
  componentDidMount = () =>{
    const {user} = this.props.auth0
    const email = user.email
    axios
    .get(`http://localhost:3800/fruits?email=${email}`)
    .then(result=>{
      this.setState({
        fruitsArr:result.data
      })
    })
    .catch(error=>{
      console.log('error');
    })
  }
  addFruit=(selectedFruit)=>{
    const {user} = this.props.auth0
    const email = user.email
    const object={
      name:selectedFruit.name,
      image:selectedFruit.image,
      price:selectedFruit.price,
      email:email
    }
    axios
    .post(`http://localhost:3800/addFruit`,object)
    .then(result =>{
      this.setState({
        newfruit:result.data
      })
    })
    .catch(error=>{
      console.log('error');
    })
  }



  render() {
    return (
      <>
        <h1>API Fruits</h1>
        <AddFruit
        fruitsArr={this.state.fruitsArr}
        addFruit = {this.addFruit}
        />
      </>
    )
  }
}

export default withAuth0(Home);
