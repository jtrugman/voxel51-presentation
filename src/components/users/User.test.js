import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import User from './User';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const mockGithubContext = {
  loading: false,
  user: { login: "JohnDoe", bio: "Hello, world!", avatar_url: "some_avatar_url" },
  repos: [],
  getUser: jest.fn(),
  getUserRepos: jest.fn(),
};

const mockAlertContext = {
  alert: null,
};

it('should render User component correctly', () => {
    const history = createMemoryHistory();
    history.push('/user/JohnDoe');
  
    render(
      <Router history={history}>
        <GithubContext.Provider value={mockGithubContext}>
          <AlertContext.Provider value={mockAlertContext}>
            <Route path="/user/:login" component={User} />
          </AlertContext.Provider>
        </GithubContext.Provider>
      </Router>
    );
  
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByText('JohnDoe')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', 'some_avatar_url');
  });
  