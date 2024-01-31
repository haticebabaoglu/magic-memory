import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }

]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
// shuffle card
const shuffleCards = () => {
 const shuffledCards = [...cardImages, ...cardImages]
 .sort(() => Math.random() - 0.5)
 .map((card) => ({...card, id: Math.random()}))
 
  setChoiceOne(null)
  setChoiceTwo(null )
  setCards(shuffledCards)
  setTurns(0)
}
 // handle choice
 const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card); }

 useEffect(() => {
  
  if (choiceOne && choiceTwo) {
    setDisabled(true);
    if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card === choiceOne || card === choiceTwo ? { ...card, matched: true } : card
        )
      );
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }
}, [choiceOne, choiceTwo]);

  
  //reset choice
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  

  return (
    <div className="App">
      <h1>Magic Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App