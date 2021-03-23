import React from 'react';
import { useParams } from 'react-router-dom';

import { NotFound } from './NotFound';

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

export function NewsPage() {
  // TODO útfæra fréttasíðu
  let { id } = useParams();
  

  if(!isNumber(id)) {
    return (
        <NotFound/>
    )
  }
    return (
      <div>
        <p>News page</p>
        {/*
        <NewsList title="allar fréttir" />
        <NewsList title="innlendar" />
        */}
      </div>
    );
}