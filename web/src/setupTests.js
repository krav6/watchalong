import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorage from 'mock-local-storage';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.window = {};
window.localStorage = global.localStorage;

console.error = message => {
  throw new Error(message);
};
