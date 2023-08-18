import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { getSetCardsBySetCode } from '../../services/SetServices'
import { updateUserCards } from '../../services/UserServices'
import { AuthContext } from "../../App"

const SetCards = () => {
  const { state } = useContext(AuthContext)
  const { setCode } = useParams()
  const [ sub, setSubset ] = useState(0)
  const [cards, setCards] = useState(null)

  useEffect(() => {
    getSetCardsBySetCode(setCode).then(data => setCards(data))
  }, [setCode])

  const handleAddClick = (event) => {
    event.preventDefault()

    let subset = event.target.getAttribute("data-subset-code")
    let cardNum = event.target.getAttribute("data-card-num")

    // console.log('add')
    // console.log(state.cards[0])

    if(state.cards[0].hasOwnProperty(setCode)) {
        if(state.cards[0][setCode].hasOwnProperty(subset)) {
          if(state.cards[0][setCode][subset].hasOwnProperty(cardNum)) {
            state.cards[0][setCode][subset][cardNum] += 1
          } else {
            state.cards[0][setCode][subset][cardNum] = 1
          }
        } else {
          // Subset not in set
          state.cards[0][setCode][subset] = {}
          state.cards[0][setCode][subset][cardNum] = 1
        }
    } else {
      // setCode not in cards
      state.cards[0][setCode] = {}
      state.cards[0][setCode][subset] = {}
      state.cards[0][setCode][subset][cardNum] = 1
    }

    // Update Num
    event.target.parentElement.previousElementSibling.innerText = state.cards[0][setCode][subset][cardNum]

    // Update Num Owned
    let cnt = Object.keys(state.cards[0][setCode][subset]).length
    if(state.cards[0][setCode][subset].hasOwnProperty('new')) {
      cnt -= 1
    }
    document.getElementById(subset).innerText = cnt + " /"

    updateUserCards(state.accessToken, state.cards).then(data => console.log(data))
  }

  const handleMinusClick = (event) => {
    event.preventDefault()

    let subset = event.target.getAttribute("data-subset-code")
    let cardNum = event.target.getAttribute("data-card-num")

    // console.log('minus')
    // console.log(state.cards[0])

    if(state.cards[0].hasOwnProperty(setCode)) {
        if(state.cards[0][setCode].hasOwnProperty(subset)) {
          if(state.cards[0][setCode][subset].hasOwnProperty(cardNum)) {
            if(state.cards[0][setCode][subset][cardNum] > 1) {
              state.cards[0][setCode][subset][cardNum] -= 1
              // Update Num
              event.target.parentElement.nextElementSibling.innerText = state.cards[0][setCode][subset][cardNum]
            } else {
              delete state.cards[0][setCode][subset][cardNum]
              // Update Num
              event.target.parentElement.nextElementSibling.innerText = 0

              // Update Num Owned
              let cnt = Object.keys(state.cards[0][setCode][subset]).length
              if(state.cards[0][setCode][subset].hasOwnProperty('new')) {
                cnt -= 1
              }
              document.getElementById(subset).innerText = cnt + " /"
            }
            updateUserCards(state.accessToken, state.cards).then(data => console.log(data))
          }
        }
    }
  }

  return (
    <div className="cards-wrapper">

      {cards !== null &&
        <ul className="subsets" id="subset-menu">
          {cards.subsets.map((subset, index) => (
            <li className={sub === index ? "subset selected" : "subset"} data-index={index} data-name={subset.name} onClick={() => setSubset(index)}>
              {subset.name} - {state.isAuthenticated
                ? state.cards !== null &&
                  state.cards[0].hasOwnProperty(setCode)
                    ? state.cards[0][setCode].hasOwnProperty(subset.name)
                      ? <span id={subset.name}>{Object.keys(state.cards[0][setCode][subset.name]).length} /</span>
                      : <span id={subset.name}>0 /</span>
                    : <span id={subset.name}>0 /</span>
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
            <p className="minus-icon">
              <img
                data-set-code={setCode}
                data-subset-code={cards !== null && cards.subsets[sub].name}
                data-card-num={'new'}
                src={'/images/icons/minus.png'}
                alt={"Minus Icon"}
                onClick={handleMinusClick}
              />
            </p>

            <p className="num-owned">
              {state.cards !== null
                ? cards !== null
                  ? state.cards[0].hasOwnProperty(setCode)
                    ? state.cards[0][setCode].hasOwnProperty(cards.subsets[sub].name)
                      ? state.cards[0][setCode][cards.subsets[sub].name].hasOwnProperty('new')
                        ? state.cards[0][setCode][cards.subsets[sub].name].new
                        : 0
                      : 0
                    : 0
                  : 0
                : 0
              }
            </p>

            <p className="add-icon">
              <img
                data-set-code={setCode}
                data-subset-code={cards !== null && cards.subsets[sub].name}
                data-card-num={'new'}
                src={'/images/icons/add.png'}
                alt={"Add Icon"}
                onClick={handleAddClick}
              />
            </p>
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
                  <p className="minus-icon">
                    <img
                      data-set-code={setCode}
                      data-subset-code={cards.subsets[sub].name}
                      data-card-num={card.set_code}
                      src={'/images/icons/minus.png'}
                      alt={"Minus Icon"}
                      onClick={handleMinusClick}
                    />
                  </p>

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

                  <p className="add-icon">
                    <img
                      data-set-code={setCode}
                      data-subset-code={cards.subsets[sub].name}
                      data-card-num={card.set_code}
                      src={'/images/icons/add.png'}
                      alt={"Add Icon"}
                      onClick={handleAddClick}
                    />
                  </p>
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
