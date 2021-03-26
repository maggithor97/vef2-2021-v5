import React from 'react';

import './NotFound.modules.scss'

export function NotFound() {
  return (
    <div>
      <div className="image">
        <h1 className="fjorirNullFjorir">404 síða fannst ekki</h1>
      </div>
      <h2><a href="/">Til baka</a></h2>
    </div>
  );
}