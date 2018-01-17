import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/fontawesome-free-brands';

const footer = () => (
  <footer className="bg-dark text-light app-footer mt-4 py-4 text-center shadow-lg">
    <p>
      <a href="https://github.com/krav6/watchalong" className="text-muted">
        <FontAwesomeIcon icon={faGithubSquare} fixedWidth />GitHub
      </a>
    </p>
    <p>&copy; 2018 WatchAlong</p>
  </footer>
);

export default footer;
