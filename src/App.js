import logo from './logo.svg';
import './App.css';
import React, { createElement as h } from 'react';

function App() {
  return h('div', { className: 'App' },
    h('header', {
      className: 'App-header'
    }, [
      h('img', {src: logo, className: 'App-logo', alt: 'logo'}),
      h('p', {}, ['Edit ', h('code', {}, 'src/App.js'), ' and save to reload.']),
      h('a', {
        className: 'App-link',
        href: 'https://reactjs.org',
        target: '_blank',
        rel: 'noopener noreferrer'
      }, 'Learn React'),
      h('span', {}, (new Date()).getFullYear())
    ])
)
}

export default App;
