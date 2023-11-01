import { useEffect, useState } from 'react';
import { socket } from '../../socket/socket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { tickers } from '../../store/selectors';
import { Ticker } from '../../types/Ticker';
import { setAllTickers } from '../../features/tickersSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { TickerInfo } from './components/TickerInfo';
import { tickersInfo } from '../../utils/tickersHelper';
import { Loader } from '../../components/Loader';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const InfoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allTickers: tickersList } = useAppSelector(tickers);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTickers, setFilteredTickers] = useState([] as Ticker[]);
  const [filterBy, setFilterBy] = useState('ticker');
  const debouncedSearchInput = useDebounce(searchInput, 1000);
  const [searchParams] = useSearchParams();

  useEffect(() => {
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
    const filtered = tickersList.filter(ticker => {
      const lowercasedInput = debouncedSearchInput.toLowerCase();
      if (filterBy === 'ticker') {
        return ticker.ticker.toLowerCase().includes(lowercasedInput);
      } else {
        const foundTicker = tickersInfo.find(
          tickerToCheck => tickerToCheck.id === ticker?.ticker
        );

        const tickerInfo = foundTicker?.description.toLowerCase();
        return tickerInfo?.includes(lowercasedInput);
      }
    });

    setFilteredTickers(filtered);
  }, [debouncedSearchInput, filterBy, tickersList]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (filter: 'ticker' | 'text') => {
    setFilterBy(filter);
  };

  return !tickersList.length ? (
    <Loader />
  ) : (
    <>
      <nav className="panel mt-4">
        <p className="panel-heading">Tickers:</p>

        <p className="panel-tabs">
          <Link
            to={{
              search: getSearchWith(searchParams, { search: 'ticket' }),
            }}
            className={filterBy === 'ticker' ? 'is-active' : ''}
            onClick={() => handleFilterChange('ticker')}
          >
            Search by ticker
          </Link>
          <Link
            to={{
              search: getSearchWith(searchParams, { search: 'text' }),
            }}
            className={filterBy === 'text' ? 'is-active' : ''}
            onClick={() => handleFilterChange('text')}
          >
            Search by description
          </Link>
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchInputChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <ul>
          <div className="box">
            {searchInput === '' ? (
              tickersList.map(ticker => <TickerInfo ticker={ticker} />)
            ) : filteredTickers.length > 0 ? (
              filteredTickers.map(ticker => <TickerInfo ticker={ticker} />)
            ) : (
              <span>No results found.</span>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};
