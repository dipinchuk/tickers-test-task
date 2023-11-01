import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { TickerModal } from './components/TickerModal';

export const App = () => {
  const selectedTicker = useSelector(
    (state: RootState) => state.tickers.selectedTicker
  );

  return (
    <>
      <div data-cy="app">
        <Navbar />

        <div className="section">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>

      {selectedTicker && <TickerModal />}
    </>
  );
};
