import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../store';
import '../styles/globals.css';

const ByteBankBase = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ByteBankBase;
