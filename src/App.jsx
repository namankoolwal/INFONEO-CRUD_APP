import { Provider } from 'react-redux';
import PostList from './components/PostList';
import {store} from './redux/store';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>TASK</h1>
        <h3>CRUD App</h3>
        <PostList />
      </div>
    </Provider>
  );
}