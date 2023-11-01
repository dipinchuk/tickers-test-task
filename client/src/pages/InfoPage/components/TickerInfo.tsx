import { Ticker } from '../../../types/Ticker';
import { useEffect, useRef, useState } from 'react';
import { tickersInfo } from '../../../utils/tickersHelper';
import { FoundTicker } from '../../../types/FoundTicker';

type Props = {
  ticker: Ticker;
};

export const TickerInfo: React.FC<Props> = ({ ticker }) => {
  const foundTicker = tickersInfo.find(
    tickerToCheck => tickerToCheck.id === ticker.ticker
  );
  const { img, description } = foundTicker as FoundTicker;
  const currentPriceRef = useRef<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);

  useEffect(() => {
    if (currentPriceRef.current !== null) {
      const change = ticker.price - currentPriceRef.current;
      setPriceChange(change);
    }
    currentPriceRef.current = ticker.price;
  }, [ticker.price]);

  return (
    <li>
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={img} alt={ticker.ticker} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{ticker.ticker}</strong>{' '}
              <b
                className={`tag is-normal is-rounded ${
                  priceChange && priceChange < 0 ? 'is-danger' : 'is-success'
                }`}
              >
                {ticker.price}$
              </b>
              {priceChange && (
                <sup>
                  {priceChange > 0
                    ? ` +${priceChange.toFixed(2)}$`
                    : ` ${priceChange.toFixed(2)}$`}
                </sup>
              )}
              <br />
              {description}
            </p>
          </div>
        </div>
      </article>
      <br />
    </li>
  );
};
