import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelectedTicker } from '../../features/tickersSlice';
import { useAppDispatch } from '../../store/hooks';
import { FoundTicker } from '../../types/FoundTicker';
import { tickersInfo } from '../../utils/tickersHelper';

export const TickerModal: React.FC = () => {
  const selectedTicker = useSelector(
    (state: RootState) => state.tickers.selectedTicker
  );
  const foundTicker = tickersInfo.find(
    tickerToCheck => tickerToCheck.id === selectedTicker?.ticker
  );
  const { img, description } = foundTicker as FoundTicker;
  const dispatch = useAppDispatch();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-centered has-text-weight-medium"
            data-cy="modal-header"
          >
            {`${selectedTicker?.ticker}`}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(setSelectedTicker(null))}
          />
        </header>

        <div className="modal-card-body">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={img} alt={selectedTicker?.ticker} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>{description}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
