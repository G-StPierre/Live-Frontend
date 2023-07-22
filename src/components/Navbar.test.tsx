import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import { login, logout, selectStatus } from './Login/AuthSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Navbar component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue(false);
  });

  test('renders Home link', () => {
    render(
      <Navbar setIsRegisterOpen={jest.fn()} setIsLoginOpen={jest.fn()} isLoggedIn={false} />
    );
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('renders Register and Login buttons when not logged in', () => {
    render(
      <Navbar setIsRegisterOpen={jest.fn()} setIsLoginOpen={jest.fn()} isLoggedIn={false} />
    );
    const registerButton = screen.getByText('Register');
    const loginButton = screen.getByText('Login');
    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
