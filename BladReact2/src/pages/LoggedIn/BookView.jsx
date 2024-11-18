import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookView from './pages/LoggedIn/BookView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="works/:id" element={<BookView />} />
      </Routes>
    </Router>
  );
}

export default App;