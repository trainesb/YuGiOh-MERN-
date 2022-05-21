import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { getSetCardsBySetCode } from '../../services/SetServices'
import { AuthContext } from "../../App"

const SetCards = () => {
  const { state } = useContext(AuthContext)
  const { setCode } = useParams()
  const [ sub, setSubset ] = useState(0)
  const [cards, setCards] = useState(null)

  useEffect(() => {
    getSetCardsBySetCode(setCode).then(data => setCards(data))
  }, [setCode])

  return (
    <div className="cards-wrapper">

      {cards !== null &&
        <ul className="subsets">
          {cards.subsets.map((subset, index) => (
            <li className={sub === index ? "subset selected" : "subset"} data-index={index} data-name={subset.name} onClick={() => setSubset(index)}>
              {subset.name} - {state.isAuthenticated
                ? state.cards !== null &&
                  state.cards[0].hasOwnProperty(setCode)
                    ? state.cards[0][setCode].hasOwnProperty(subset.name)
                      ? Object.keys(state.cards[0][setCode][subset.name]).length + " /"
                      : 0 + " /"
                    : 0 + " /"
                  : ""
              } {subset.num_of_cards}
            </li>
          ))}
        </ul>
      }

      <div className="set-item" style={{ backgroundImage: `url(${"/images/categories/" + setCode + '.jpg'})` }}>
        <h2>{cards !== null && cards.subsets[sub].name}</h2>

        {state.isAuthenticated &&
          <div className="button-controller-wrapper">
            <p className="minus-icon"><img src={'/images/icons/minus.png'} alt={"Minus Icon"} /></p>

            <p className="num-new-owned">
              {state.cards !== null && state.cards[0].hasOwnProperty(setCode)
                ? state.cards[0][setCode].new
                : 0
              }
            </p>

            <p className="add-icon"><img src={'/images/icons/add.png'} alt={"Add Icon"} /></p>
          </div>
        }
      </div>

      {cards !== null &&
        <div className="cards">
          {cards.subsets[sub].cards.map((card) => (
            <div className="card-wrapper" style={{ backgroundImage: `url(${"/images/images/cards/" + card.image_id + ".jpg"})` }}>
              <h2>{card.name}</h2>

              {state.isAuthenticated &&
                <div className="num-owned-wrapper">
                  <p className="minus-icon"><img src={'/images/icons/minus.png'} alt={"Minus Icon"} /></p>
                  
                  {state.cards !== null &&
                    <p className="num-owned">
                      {state.cards[0].hasOwnProperty(setCode)
                        ? state.cards[0][setCode].hasOwnProperty(cards.subsets[sub].name)
                          ? state.cards[0][setCode][cards.subsets[sub].name].hasOwnProperty(card.set_code)
                            ? state.cards[0][setCode][cards.subsets[sub].name][card.set_code]
                            : 0
                          : 0
                        : 0
                      }
                    </p>
                  }

                  <p className="add-icon"><img src={'/images/icons/add.png'} alt={"Add Icon"} /></p>
                </div>
              }

              <p className="set-code">{card.set_code}</p>
            </div>
          ))}
        </div>
      }

    </div>
  )
}
export default SetCards
