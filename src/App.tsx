import {Provider} from 'react-redux';
import state from './state/state';

import './App.css';
import Navigation from './navigation';



function App() {
  return (
    <Provider store={state}>
        <Navigation />
      </Provider>
       );
}
export default App;
