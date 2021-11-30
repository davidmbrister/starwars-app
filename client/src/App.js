import './App.css';
import CharacterCard from './components/CharacterCard';
import NameList from './components/NameList';
import SearchBar from "./components/SearchBar";
import  {useCardId}  from './hooks/useCard';


/* const updateInput = async (input) => {
  const filtered = countryListDefault.filter(country => {
    return country.name.toLowerCase().includes(input.toLowerCase())
  })
  setInput(input);
} */

function App() {
 const {getCardData} = useCardId()
 const characterID =  getCardData() ?? 1
  return (
      <>
        <SearchBar />
        <CharacterCard characterId={characterID ?? 1} />
        <NameList />
      </>
  );
}

export default App;
