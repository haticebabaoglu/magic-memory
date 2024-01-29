import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {
  const handleClick = () => {

  }
return(
    <div className='card' key={card.id}>
           <div className={flipped ? "flipped" : ""}>
              <img className='front' src={card.src}/>
              <img className='back' src='/img/cover.png'
               onClick={handleClick}/>
            </div>
          </div>
)
}