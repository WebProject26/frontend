import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props)
  {
    super(props)

    this.state = {
      sdsd
      sdsdd
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/products')
      .then(response => this.setState( { products: response.data }))
      .catch(error => console.log(error))

    axios.get('http://localhost:3030/cart')
         .then(response => this.setState( { cart: response.data } ))
         .catch(error => console.log(error))
  }
}

export default App;
