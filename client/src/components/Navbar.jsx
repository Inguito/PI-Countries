import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries, getAllActivities } from '../actions'
import styles from './Navbar.module.css'
import Searchbar from './Searchbar'

export default function Navbar({ sort, contFilter, actFilter, actNameFilter,setCurrentPage,setCountriesPerPage }) {
  const dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllCountries())
  }
const activities = useSelector((state) => state.activities);
  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities());
  }, [dispatch])

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <h1 className={styles.country} onClick={(e) => handleClick(e)}>
          Country | <span className={styles.byana}>PI</span>
        </h1>

        <Searchbar 
        setCurrentPage={setCurrentPage}
        setCountriesPerPage={setCountriesPerPage}
           />
        <div className={styles.filterContainer}>
          {/* filtro por continente */}
          <select className={styles.filter} onChange={(e) => contFilter(e)}>
            <option value='All'>Filter by region...</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
          </select>

          {/* filtro por estacion */}
          <select className={styles.filter} onChange={(e) => actFilter(e)}>
            <option value='All'>Filter activities by season...</option>
            <option value='Summer'>Summer</option>
            <option value='Fall'>Fall</option>
            <option value='Winter'>Winter</option>
            <option value='Spring'>Spring</option>
          </select>

          {/* filtro por nombre de actividad */}
          <select className={styles.filter} onChange={(e) => actNameFilter(e)}>
            <option value='All'>Filter by activity...</option>
            {activities &&
            activities.map((el) => (
              <option value={el.name} key={el.name}>
                {el.name}
              </option>
            ))}
          </select>
          
          {/* <select className={styles.filter} onChange={(e) => actNameFilter(e)}>
            <option value='All'>Filter by activity...</option>
            <option value='Skiing'>Skiing</option>
            <option value='Surfing'>Surfing</option>
          </select> */}


          {/* orden por nombre o poblacion */}
          <select className={styles.filter} onChange={(e) => sort(e)}>
            <option value='AZ'>Sort by...</option>
            <option value='AZ'>Name (A-Z)</option>
            <option value='ZA'>Name (Z-A)</option>
            <option value='populationAsc'>Population (asc)</option>
            <option value='populationDesc'>Population (desc)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
