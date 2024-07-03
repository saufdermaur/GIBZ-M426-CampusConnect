import { mount } from '@vue/test-utils';
import ModuleCard from '@/components/ModuleCard.vue'; // Adjust the path as needed
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import axios from 'axios';

chai.use(sinonChai);

describe('ModuleCard.vue', () => { // Make sure the component name matches your component file
  let wrapper;
  let axiosGetStub;
  let axiosPostStub;
  let axiosPutStub;
  let axiosDeleteStub;
  const BASE_URL = "http://localhost:6790";

  beforeEach(() => {
    // Restore stubs if they already exist
    if (axiosGetStub) axiosGetStub.restore();
    if (axiosPostStub) axiosPostStub.restore();
    if (axiosPutStub) axiosPutStub.restore();
    if (axiosDeleteStub) axiosDeleteStub.restore();

    // Mock axios methods
    axiosGetStub = sinon.stub(axios, 'get').resolves({ data: [] });
    axiosPostStub = sinon.stub(axios, 'post').resolves({ data: {} });
    axiosPutStub = sinon.stub(axios, 'put').resolves({ data: {} });
    axiosDeleteStub = sinon.stub(axios, 'delete').resolves();

    // Mock localStorage
    global.localStorage = {
      getItem: sinon.stub().returns('test-jwt-token')
    };

    wrapper = mount(ModuleCard, {
      global: {
        mocks: {
          localStorage: global.localStorage
        }
      }
    });
  });

  afterEach(() => {
    // Restore all stubs after each test to ensure a clean state
    sinon.restore();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).to.be.true;
  });

  it('fetches data on created', async () => {
    expect(axiosGetStub).to.have.been.calledWith(`${BASE_URL}/api/module/getAll`);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.modules).to.deep.equal([]);
  });

  it('opens the create module dialog on button click', async () => {
    const createButton = wrapper.find('v-btn');
    await createButton.trigger('click');
    expect(wrapper.vm.newModuleDialog).to.be.true;
  });

  it('opens the edit dialog when editItem is called', async () => {
    const item = { ModuleID: '1', Name: 'Test Module', Description: 'Test Description' };
    wrapper.setData({ modules: [item] });
    wrapper.vm.editItem(item);
    expect(wrapper.vm.dialog).to.be.true;
    expect(wrapper.vm.editedItem).to.deep.equal(item);
  });

  it('opens the delete dialog when deleteItem is called', async () => {
    const item = { ModuleID: '1', Name: 'Test Module', Description: 'Test Description' };
    wrapper.setData({ modules: [item] });
    wrapper.vm.deleteItem(item);
    expect(wrapper.vm.dialogDelete).to.be.true;
    expect(wrapper.vm.editedItem).to.deep.equal(item);
  });

  it('saves a new module', async () => {
    wrapper.setData({
      newModuleDialog: true,
      defaultItem: { Name: 'New Module', Description: 'New Description' }
    });
    await wrapper.vm.saveNewModule();
    expect(axiosPostStub).to.have.been.calledWith(`${BASE_URL}/api/module/create-module`, {
      Name: 'New Module',
      Description: 'New Description'
    });
  });

  it('saves an edited module', async () => {
    const item = { ModuleID: '1', Name: 'Test Module', Description: 'Test Description' };
    wrapper.setData({
      dialog: true,
      editedIndex: 0,
      editedItem: { ...item, Name: 'Updated Module' },
      modules: [item]
    });
    await wrapper.vm.save();
    expect(axiosPutStub).to.have.been.calledWith(`${BASE_URL}/api/module/1`, {
      Name: 'Updated Module',
      Description: 'Test Description'
    });
    expect(wrapper.vm.modules[0].Name).to.equal('Updated Module');
  });

  it('deletes a module', async () => {
    const item = { ModuleID: '1', Name: 'Test Module', Description: 'Test Description' };
    wrapper.setData({ modules: [item], editedIndex: 0, editedItem: item });
    await wrapper.vm.deleteItemConfirm();
    expect(axiosDeleteStub).to.have.been.calledWith(`${BASE_URL}/api/module/1`);
    expect(wrapper.vm.modules).to.not.include(item);
  });
});