import React from 'react';

import { Register } from './Register';

describe('<Register />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Register />)).toBeTruthy();
  });

  it('should dispatch error when passwords do not match', () => {
    const email = 'a@a.com';
    const username = 'username';
    const password = 'password';
    const setErrorMessage = jest.fn();
    const comp = shallow(<Register setErrorMessage={setErrorMessage} />);

    comp
      .find('input[name="email"]')
      .simulate('change', { target: { name: 'email', value: email } });
    comp
      .find('input[name="username"]')
      .simulate('change', { target: { name: 'username', value: username } });
    comp
      .find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: password } });
    comp.find('input[name="passwordConfirm"]').simulate('change', {
      target: { name: 'passwordConfirm', value: 'p' }
    });
    comp.find('form').simulate('submit', { preventDefault: () => true });

    expect(setErrorMessage).toHaveBeenCalledWith('Passwords do not match.');
  });

  it('should dispatch action when submitting form', () => {
    const email = 'a@a.com';
    const username = 'username';
    const password = 'password';
    const tryRegister = jest.fn();
    const comp = shallow(<Register tryRegister={tryRegister} />);

    comp
      .find('input[name="email"]')
      .simulate('change', { target: { name: 'email', value: email } });
    comp
      .find('input[name="username"]')
      .simulate('change', { target: { name: 'username', value: username } });
    comp
      .find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: password } });
    comp.find('input[name="passwordConfirm"]').simulate('change', {
      target: { name: 'passwordConfirm', value: password }
    });
    comp.find('form').simulate('submit', { preventDefault: () => true });

    expect(tryRegister).toHaveBeenCalledWith(email, username, password);
  });

  it('should clear errorMessage when unmounting', () => {
    const errorMessage = 'Error';
    const setErrorMessage = jest.fn();
    const comp = shallow(
      <Register errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    expect(comp).toBeTruthy();
    comp.unmount();
    expect(setErrorMessage).toHaveBeenCalled();
  });

  it('should not try to clear errorMessage when unmounting if it is not set', () => {
    const errorMessage = undefined;
    const setErrorMessage = jest.fn();
    const comp = shallow(
      <Register errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    expect(comp).toBeTruthy();
    comp.unmount();
    expect(setErrorMessage).toHaveBeenCalledTimes(0);
  });
});
