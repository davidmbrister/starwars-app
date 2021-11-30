import './App.css';
import Character from './components/Character';
import NameList from './components/NameList';
import SearchBar from "./components/SearchBar";
import { useInput } from './hooks/useInput';

const [input, setInput] = useInput('');
const [cardData, setCardData] = useCard(null)

const updateInput = async (input) => {
  const filtered = countryListDefault.filter(country => {
   return country.name.toLowerCase().includes(input.toLowerCase())
  })
  setInput(input);
}

function App() {

  return (
    <>
    <SearchBar></SearchBar>
    <Character characterId={8} />
    <NameList />
    </>
  );
}

export default App;
