import './App.css';
import Character from './components/Character';
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
        <Character characterId={characterID ?? 1} />
        <NameList />
      </>
  );
}

export default App;
