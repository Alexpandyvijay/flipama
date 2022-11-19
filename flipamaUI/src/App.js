import StoreCart from './component/main';
import './App.css';
import store from './store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <StoreCart/>
    </div>
    </Provider>
  );
}

export default App;
