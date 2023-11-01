import { Ticker } from '../types/Ticker';
import * as icons from '../icons';

interface Params {
  sort: string;
  order: string;
}

export function sortTickers(tickers: Ticker[], sortBy: string) {
  if (tickers.length < 2) {
    return tickers;
  }

  const copy = [...tickers];

  switch (sortBy) {
    case 'ticker':
      return copy.sort((a, b) => {
        return a.ticker.localeCompare(b.ticker);
      });

    case 'price':
      return copy.sort((a, b) => a.price - b.price);

    default:
      return tickers;
  }
}

export function prepareTickers(
  tickers: Ticker[],
  { sort, order }: Params
): Ticker[] {
  let copy = [...tickers];

  if (sort) {
    copy = sortTickers(copy, sort);
  }

  if (sort && order) {
    copy.reverse();
  }

  return copy;
}

export const tickersInfo = [
  {
    id: 'AAPL',
    img: icons.apple,
    description:
      "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the world's largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the world's biggest company by market capitalization. As of June 2022, Apple is the fourth-largest personal computer vendor by unit sales and the second-largest mobile phone manufacturer in the world.",
  },
  {
    id: 'AMZN',
    description:
      'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence. It has been often referred to as "one of the most influential economic and cultural forces in the world," and is often regarded as one of the world\'s most valuable brands.',
    img: icons.amazon,
  },
  {
    id: 'TSLA',
    description:
      'Tesla, Inc. is an American multinational automotive and clean energy company headquartered in Austin, Texas. Tesla designs and manufactures electric vehicles (cars and trucks), stationary battery energy storage devices from home to grid-scale, solar panels and solar roof tiles, and related products and services.',
    img: icons.tesla,
  },
  {
    id: 'GOOGL',
    description:
      "Alphabet Inc. is an American multinational technology conglomerate holding company headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015, and became the parent company of Google and several former Google subsidiaries. Alphabet is the world's third-largest technology company by revenue and one of the world's most valuable companies.",
    img: icons.google,
  },
  {
    id: 'MSFT',
    description:
      "Microsoft Corporation is an American multinational technology corporation headquartered in Redmond, Washington. Microsoft's best-known software products are the Windows line of operating systems, the Microsoft 365 suite of productivity applications, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. ",
    img: icons.microsoft,
  },
  {
    id: 'FB',
    description:
      'Facebook is an online social media and social networking service owned by American technology giant Meta Platforms. Created in 2004 by Mark Zuckerberg with fellow Harvard College students and roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes, its name derives from the face book directories often given to American university students.',
    img: icons.facebook,
  },
];
