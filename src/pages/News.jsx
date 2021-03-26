import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import s from './News.module.scss';
import { NotFound } from './NotFound';

const apiUrl = process.env.REACT_APP_API_URL;


export function NewsPage() {
  // TODO útfæra fréttasíðu
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);
  let { id } = useParams();
  const url = `${apiUrl}${id}`

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

  const pages = ["allar", "innlent", "erlent", "ithrottir", "menning"];
  if (!pages.includes(id)) {
    return (
      <NotFound />
    )
  }
  if (error) {
    return (
      <div>
        <p>Villa kom upp: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }


  const allData = data || [];
  let title;
  let frettir = [];
  if (data) {
    frettir = allData.items;
    title = allData.title;
  }


  return (
    <div className={s.News}>
      <div className={s.News__content}>
        <h2>{title}</h2>
        <ul className={s.News__content__list}>
          {frettir.length > 0 && frettir.map((frett, i) => {
            return (
              <li className={s.News__content__list__item}>
                <a
                  href={frett.link}
                  className={s.News__link}
                  key={i}>
                  {frett.title}
                </a>
              </li>
            )
          })}
        </ul>
        <b>
          <NavLink className={s.News__link} to="/">Til baka</NavLink>
        </b>
      </div>
    </div>
  );
}