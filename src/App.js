import {Component} from "react"
import './App.css'
import CardList from "./components/card-list/card-list.component"
import SearchBox from "./components/search-box/search-box.component"

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()

    this.state = {
      monsters: [],
      searchField: '',
    }
  }

  onSearchChange = ({target: {value}}) => {
    const searchField = value.toLowerCase()
    this.setState(() => {
      return {searchField}
    })
  }

  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return {monsters: users}
      }))
  }

  render() {
    const {monsters, searchField} = this.state
    const {onSearchChange} = this

    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField))

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox
          className='search-box'
          placeholder='search monsters'
          onChangeHandler={onSearchChange}
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    )
  }
}

export default App
