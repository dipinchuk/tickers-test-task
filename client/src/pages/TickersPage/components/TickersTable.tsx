import { Link, useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import { getSearchWith } from '../../../utils/searchHelper';

import { Ticker } from '../../../types/Ticker';
import { TickerData } from './TickerData';

interface Props {
  tickers: Ticker[];
}

const sortByParams = [
  { title: 'Ticker', key: 'ticker' },
  { title: 'Price', key: 'price' },
];

export const TickersTable: React.FC<Props> = ({ tickers }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  function setSort(colKey: string) {
    let sortParams = {};

    switch (true) {
      case colKey !== sortBy:
        sortParams = {
          sort: colKey,
        };
        break;

      case order !== 'desc':
        sortParams = {
          order: 'desc',
        };
        break;

      default:
        sortParams = {
          sort: null,
          order: null,
        };
    }

    return getSearchWith(searchParams, sortParams);
  }

  let formattedDate;

  if (tickers.length > 0) {
    const dateString = tickers[0].last_trade_time;
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <div className="column">
        <div className="box table-container">
          {tickers.length > 0 && (
            <h2 className="subtitle is-4">Last trade time: {formattedDate}</h2>
          )}
          <table className="table is-striped is-hoverable is-narrow is-fullwidth">
            <thead>
              <tr>
                {sortByParams.map(col => (
                  <th
                    key={col.key}
                    style={{
                      minWidth: col.title === 'Price' ? '130px' : 'auto',
                    }}
                  >
                    <span
                      className={`is-flex is-flex-wrap-nowrap is-flex-direction-row`}
                    >
                      {col.title}
                      <Link
                        to={{
                          search: setSort(col.key),
                        }}
                      >
                        {tickers.length > 0 && (
                          <span className="icon">
                            <i
                              className={classnames('fas', {
                                'fa-sort': sortBy !== col.key,
                                'fa-sort-up':
                                  sortBy === col.key && order !== 'desc',
                                'fa-sort-down':
                                  sortBy === col.key && order === 'desc',
                              })}
                            />
                          </span>
                        )}
                      </Link>
                    </span>
                  </th>
                ))}

                <th>Exchange</th>
                <th>Change</th>
                <th>%Change</th>
                <th>Dividend</th>
                <th>Yield</th>
              </tr>
            </thead>

            <tbody>
              {tickers.length > 0 ? (
                tickers.map(ticker => (
                  <TickerData key={ticker.ticker} ticker={ticker} />
                ))
              ) : (
                <tr className="is-empty">
                  <td colSpan={7}>
                    <section className="section">
                      <div className="content has-text-grey has-text-centered">
                        <p>
                          <span className="icon is-large">
                            <i className="mdi mdi-emoticon-sad mdi-48px"></i>
                          </span>
                        </p>
                        <p>Nothing's there&hellip;</p>
                      </div>
                    </section>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
