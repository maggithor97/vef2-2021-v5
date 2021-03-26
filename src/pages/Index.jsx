import React, { useState, useEffect } from 'react';

import './Index.modules.scss'
import { NewsList } from '../components/news-list/NewsList'


const apiUrl = process.env.REACT_APP_API_URL;


/**
 * Býr til yfirlitssýðu
 */
export function Index() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;

      try {
        const result = await fetch(apiUrl);

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
    <div  className="Index">
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
