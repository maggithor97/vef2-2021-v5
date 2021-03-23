import React from 'react';
//import { render } from 'sass';

//const apiUrl = process.env.REACT_APP_API_URL;



export function NewsList({ id='', url='', title='' }) {
  /** Yfirlit fréttaflokka */
  //const frettirFlokkar = JSON.parse(flokkar);

  return (
      <div>
        <h2>{title}</h2>
        <p>{id}</p>
        <a>{url}</a>
      </div>
    
  )
}
