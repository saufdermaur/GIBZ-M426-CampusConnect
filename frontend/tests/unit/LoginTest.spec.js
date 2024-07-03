import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
// import axios from 'axios';
import sinon from 'sinon';

describe('LoginForm Component', () => {
  let wrapper;
  // let postStub;

  beforeEach(() => {
    global.localStorage = {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null
    };

    // Stub axios post method
    // postStub = sinon.stub(axios, 'post');

    // Mock Vue router and mount the component with Vue Test Utils
    wrapper = mount(LoginForm, {
      global: {
        mocks: {
          // Mock $router if used in your component
          $router: {
            push: () => {}
          }
        }
      }
    });
  });

  afterEach(() => {
    // Clean up any mocks or wrappers
    wrapper.unmount();
    sinon.restore(); // Restore all stubs
  });

  it('should initialize with empty email and password', () => {
    expect(wrapper.vm.email).to.equal('');
    expect(wrapper.vm.password).to.equal('');
  });

  // it('should login with valid credentials', async () => {
  //   // Mocking successful login response
  //   const mockAccountInfo = {
  //     FirstName: 'John',
  //     LastName: 'Doe',
  //     Email: 'john.doe@example.com'
  //   };
  //   postStub.resolves({ data: { token: 'mock-token' } }); // Stub axios.post

  //   // Set email and password in component
  //   await wrapper.setData({ email: 'test@example.com', password: 'password' });

  //   // Call login method
  //   await wrapper.vm.login();

  //   // Assert expected outcomes
  //   expect(localStorage.getItem('jwt')).to.equal('mock-token');
  //   expect(wrapper.vm.accountInfo).to.deep.equal(mockAccountInfo);
  // });

  it('should logout when requested', async () => {
    // Mocking localStorage.getItem to return a mock token
    localStorage.setItem('jwt', 'mock-token');

    // Call logout method
    await wrapper.vm.logout();

    // Assert expected outcomes
    expect(localStorage.getItem('jwt')).to.be.null;
    expect(wrapper.vm.accountInfo).to.deep.equal({});
  });
});
