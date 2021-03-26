import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import s from './NewsList.module.scss';

/** Yfirlit fréttaflokks 
 *  Sýnir nýjustu fimm fréttir í ákveðnum fréttaflokki
*/
export function NewsList({ id = '', url = '', title = '' }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;

      try {
        const result = await fetch(url);

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();

      } catch (e) {
        setError('Gat ekki sótt fréttir.');
        return;
      } finally {
        setLoading(false);
      }
      setData(json);
    }
    fetchData()
  }, [url])

  if (error) {
    return (
      <div className={s.NewsList__error}>
        <p>Villa kom upp: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={s.NewsList__error}>
        <p>Sæki gögn...</p>
      </div>
    );
  }

  const allData = data || [];

  let frettir = [];
  if (data) {
    frettir = allData.items.slice(0, 5);
  }

  return (
    <div className={s.NewsList}>
      <div className={s.NewsList__content}>
        <h2>{title}</h2>
        <ul className={s.NewsList__content__list}>
          {frettir.length > 0 && frettir.map((frett, i) => {
            return (
              <li className={s.NewsList__content__list__item}>
                <a
                  key={i}
                  href={frett.link}
                  className={s.NewsList__link}>
                  {frett.title}
                </a>
              </li>
            )
          })}
        </ul>
        <b>
          <NavLink
            to={id}
            className={s.NewsList__link}>Allar fréttir</NavLink>
        </b>
      </div>
    </div>

  )
}
