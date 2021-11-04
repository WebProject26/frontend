//import styles from './App.module.css';
//import axios from './axios';
import Login from './components/Login'

class App extends React.Component {
  constructor(props)
  {
    super(props)

    this.state = {
     
    }
  }
/*
  componentDidMount() {
    axios.get('http://localhost:3030/products')
      .then(response => this.setState( { products: response.data }))
      .catch(error => console.log(error))

    axios.get('http://localhost:3030/cart')
         .then(response => this.setState( { cart: response.data } ))
         .catch(error => console.log(error))
  }
  */

  render() {
    return (
      <div className= { styles.App }>
        <Login></Login>
      </div>
    )
  }
}

export default App;
