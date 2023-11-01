import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTickers } from '../../features/tickersSlice';
import './TickersPage.scss';
import { socket } from '../../socket/socket';
import { RootState } from '../../store/store';
import { Ticker } from '../../types/Ticker';
import { useAppSelector } from '../../store/hooks';
import { TickersMenu } from './components/TickersMenu';
import { tickers } from '../../store/selectors';
import { TickersTable } from './components/TickersTable';
import { useSearchParams } from 'react-router-dom';
import { prepareTickers } from '../../utils/tickersHelper';
import { Loader } from '../../components/Loader';

export const TickersPage: React.FC = () => {
  const selectedTickers = useSelector(
    (state: RootState) => state.tickers.selectedTickers
  );
  const dispatch = useDispatch();

  const { allTickers: tickersList } = useAppSelector(tickers);
  let tickersListToRender: Ticker[] = tickersList.filter((ticker: Ticker) =>
    selectedTickers.some(tick => tick.ticker === ticker.ticker)
  );

  const [newInterval, setNewInterval] = useState<number>(5000);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
    socket.connect();
    socket.emit('start');
    socket.on('ticker', (response: Ticker[]) => {
      dispatch(setAllTickers(response));
    });

    return () => {
      socket.close();
    };
  }, [dispatch]);

  useEffect(() => {
    socket.connect();
    socket.emit('start');
    socket.on('currentInterval', currentInterval => {
      setNewInterval(currentInterval);
    });

    updateIntervalDisplay();

    return () => {
      socket.close();
    };
  }, []);

  const decreaseIntervalElement = document.getElementById(
    'decrease-interval'
  ) as HTMLButtonElement | null;
  if (decreaseIntervalElement && newInterval === 1000) {
    decreaseIntervalElement.disabled = true;
  }

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  tickersListToRender = React.useMemo(() => {
    return prepareTickers(tickersListToRender, {
      sort,
      order,
    });
  }, [sort, order, tickersListToRender]);

  const increaseInterval = () => {
    let interval = newInterval + 1000;
    setNewInterval(interval);
    updateIntervalDisplay();

    const decreaseIntervalElement = document.getElementById(
      'decrease-interval'
    ) as HTMLButtonElement | null;
    if (decreaseIntervalElement) {
      decreaseIntervalElement.disabled = false;
    }
    socket.emit('updateInterval', interval);
  };

  const decreaseInterval = () => {
    let interval;
    if (newInterval > 2000) {
      interval = newInterval - 1000;
      setNewInterval(interval);
    } else {
      interval = 1000;
      setNewInterval(interval);
      const decreaseIntervalElement = document.getElementById(
        'decrease-interval'
      ) as HTMLButtonElement | null;
      if (decreaseIntervalElement) {
        decreaseIntervalElement.disabled = true;
      }
    }
    updateIntervalDisplay();
    socket.emit('updateInterval', interval);
  };

  const updateIntervalDisplay = () => {
    const intervalValueElement = document.getElementById(
      'interval-value'
    ) as HTMLButtonElement | null;
    if (intervalValueElement) {
      intervalValueElement.value = `${newInterval}`;
    }
  };

  function handleIntervalChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    let interval = 1000;

    if (/^[1-9]\d*000$/.test(inputValue)) {
      interval = Number(inputValue);
    }

    setNewInterval(interval);
    socket.emit('updateInterval', interval);
    updateIntervalDisplay();
  }

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-column">
        <div className="column is-7-tablet is-narrow-desktop"></div>
        {!tickersListToRender.length && firstRender ? (
          <Loader />
        ) : (
          <>
            <TickersMenu />

            {tickersListToRender.length > 0 && (
              <div className="column">
                <div className="box table-container">
                  <div
                    className="columns is-flex is-align-items-center is-multiline is-mobile is-justify-content-center"
                    style={{ gap: '20px' }}
                  >
                    <div className="is-flex is-align-items-center">
                      <label className="subtitle is-4" htmlFor="interval-value">
                        Interval:
                      </label>
                    </div>
                    <br />
                    <div
                      className="is-flex is-align-items-center"
                      style={{ gap: '5px' }}
                    >
                      <button
                        className="button"
                        id="decrease-interval"
                        onClick={decreaseInterval}
                      >
                        -
                      </button>
                      <input
                        className="input "
                        type="number"
                        id="interval-value"
                        value={newInterval}
                        min="1000"
                        onChange={handleIntervalChange}
                        step="1000"
                        style={{ width: '50%' }}
                      />
                      <button
                        className="button"
                        id="increase-interval"
                        onClick={increaseInterval}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <TickersTable tickers={tickersListToRender} />
          </>
        )}
      </div>
    </div>
  );
};
