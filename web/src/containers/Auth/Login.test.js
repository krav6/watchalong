import React from 'react';

import { Login } from './Login';

describe('<Login />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Login />)).toBeTruthy();
  });

  it('should dispatch action when submitting form', () => {
    const email = 'a@a.com';
    const password = 'password';
    const tryLogin = jest.fn();
    const comp = shallow(<Login tryLogin={tryLogin} />);

    comp
      .find('input[name="email"]')
      .simulate('change', { target: { name: 'email', value: email } });
    comp
      .find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: password } });
    comp.find('form').simulate('submit', { preventDefault: () => true });

    expect(tryLogin).toHaveBeenCalledWith(email, password);
  });

  it('should clear errorMessage when unmounting', () => {
    const errorMessage = 'Error';
    const setErrorMessage = jest.fn();
    const comp = shallow(
      <Login errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    expect(comp).toBeTruthy();
    comp.unmount();
    expect(setErrorMessage).toHaveBeenCalled();
  });

  it('should not try to clear errorMessage when unmounting if it is not set', () => {
    const errorMessage = undefined;
    const setErrorMessage = jest.fn();
    const comp = shallow(
      <Login errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    expect(comp).toBeTruthy();
    comp.unmount();
    expect(setErrorMessage).toHaveBeenCalledTimes(0);
  });
});
