import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NewsList } from '../components/news-list/NewsList'





export function Index() {
  // TODO útfæra yfirlitssíðu
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;

      const url = `https://vef2-2021-ruv-rss-json-proxy.herokuapp.com/`;

      try {
        const result = await fetch(url);

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();

      } catch (e) {
        setError('Gat ekki sótt gögn.');
        return;
      } finally {
        setLoading(false);
      }
      console.log(json)
      setData(json);
    }
    fetchData()
  },[])

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  let flokkar = data || [];


  return (
    <div>
      {flokkar.length > 0 && flokkar.map((flokkur, i) => {
        const {id,url,title} = flokkur;
        return(
          <NewsList 
          key = {i} 
          id = {id} 
          url = {url} 
          title = {title}
          />
        )
      })
      }
    </div>
    
  )
}
