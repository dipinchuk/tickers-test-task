import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTickers } from '../../../features/tickersSlice';
import '../TickersPage.scss';
import { RootState } from '../../../store/store';
import { tickersInfo } from '../../../utils/tickersHelper';

export const TickersMenu: React.FC = () => {
  const allTickers = useSelector(
    (state: RootState) => state.tickers.allTickers
  );
  const selectedTickers = useSelector(
    (state: RootState) => state.tickers.selectedTickers
  );
  const dispatch = useDispatch();

  const handleTickerClick = (tickerId: string) => {
    const selectedTicker = allTickers.find(
      ticker => ticker.ticker === tickerId
    );
    if (selectedTicker) {
      dispatch(toggleTickers(selectedTicker));
    }
  };

  const handleToggleAll = () => {
    const allSelected = selectedTickers.length === allTickers.length;

    if (allSelected) {
      selectedTickers.forEach(ticker => {
        dispatch(toggleTickers(ticker));
      });
    } else {
      allTickers.forEach(ticker => {
        if (
          !selectedTickers.find(
            selectedTicker => selectedTicker.ticker === ticker.ticker
          )
        ) {
          dispatch(toggleTickers(ticker));
        }
      });
    }
  };

  return (
    <div className="column">
      <div className="box">
        <div className="columns is-flex is-align-items-center is-multiline is-mobile is-justify-content-space-between">
          <div
            className="is-1 is-flex is-justify-content-center"
            style={{ flex: 1 }}
          >
            <button
              onClick={handleToggleAll}
              className={`button is-size-4 ${
                selectedTickers.length === tickersInfo.length ? 'selected' : ''
              }`}
            >
              All
            </button>
          </div>
          {tickersInfo.map(ticker => (
            <div
              className="is-1 is-flex is-justify-content-center"
              key={ticker.id}
              style={{ flex: 1 }}
            >
              <img
                src={ticker.img}
                alt={ticker.id}
                onClick={() => handleTickerClick(ticker.id)}
                className={`icon-image ticker-icon ${
                  selectedTickers.find(t => t.ticker === ticker.id)
                    ? 'selected'
                    : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
