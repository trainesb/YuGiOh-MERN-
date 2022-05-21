import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import { getAllCardSets, getAllSetsByCategoryId } from '../../services/SetServices'
import { getAllCategories } from '../../services/CategoryServices'
import { AuthContext } from "../../App"

const Set = () => {
  const { state } = useContext(AuthContext)
  const { id } = useParams()
  const [ set, setSet ] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if( typeof id !== 'undefined' && id) {
      getAllSetsByCategoryId(id).then(sets => setSet(sets))
    } else {
      getAllCardSets().then(cards => setSet(cards))
    }
    getAllCategories().then(cats => setCategories(cats))
  }, [id])

  return (
    <div className="set-cards-wrapper">

      {set.length > 0 &&
        set.map((s) => (
          <Link className="set-card-wrapper" to={"/setcards/" + s.set_code} style={{ backgroundImage: `url(${"/images/categories/" + s.set_code + '.jpg'})` }}>
            <h2>{s.set_name}</h2>

            {s.subsets.length > 0 &&
              <ul className="subset-list">
                {s.subsets.map((subset) => (
                  <li className="subset-item">
                    {subset.name} -
                    {state.isAuthenticated
                      ? state.cards[0].hasOwnProperty(s.set_code)
                        ? state.cards[0][s.set_code].hasOwnProperty(subset.name)
                          ? " " + Object.keys(state.cards[0][s.set_code][subset.name]).length + " /"
                          : " " + 0 + " /"
                        : " " + 0 + " /"
                      : ""} {subset.num_of_cards}
                  </li>
                ))}
              </ul>
            }

            <p className="tcg-date">{s.tcg_date}</p>
          </Link>
        ))
      }

    </div>
  )
}
export default Set
