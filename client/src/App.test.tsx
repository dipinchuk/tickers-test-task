import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InfoPage } from './pages/InfoPage/InfoPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HashRouter as Router } from 'react-router-dom';

jest.mock('@uiball/loaders', () => {
  return {
    JellyTriangle: () => <div>Mocked Loader</div>,
  };
});

describe('InfoPage', () => {
  it("displays information for AAPL when ticker search is selected and 'AAPL' is entered", async () => {
    render(
      <Provider store={store}>
        <Router>
          <InfoPage />
        </Router>
      </Provider>
    );

    await screen.findByText('Mocked Loader', {}, { timeout: 5000 });

    await waitFor(() => screen.getByText('Search by ticker'));

    const tickerFilterButton = screen.getByText('Search by ticker');
    fireEvent.click(tickerFilterButton);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });

    const aaplInfo = await screen.findByText(
      /Apple Inc\. is an American multinational technology company headquartered in Cupertino, California\./,
      {},
      { timeout: 5000 }
    );
    expect(aaplInfo).toBeInTheDocument();

    const aaplImage = screen.getByAltText('AAPL');
    expect(aaplImage).toBeInTheDocument();
  });
});
