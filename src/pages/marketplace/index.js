import { React, useState } from 'react';
import './styles.scss';
import TOKEN_TYPES from '../../utils/tokentypes';
import MarketplaceItem from '../../components/marketplace-item';
import Header from '../../components/header';
import FiltersIcon from '../../assets/filters.svg';
import SearchIcon from '../../assets/zoom.svg';

export default function Marketplace() {
  const [tokenType, setTokenType] = useState(TOKEN_TYPES.TODO);

  const tokensFromApi = [
    {
      id: 1,
      dataToken: {
        productName: 'producto 1',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.IMPACT,
    },
    {
      id: 2,
      dataToken: {
        productName: 'producto 2',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.FUTURE,
    },
    {
      id: 3,
      dataToken: {
        productName: 'producto 3',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.IMPACT,
    },
    {
      id: 3,
      dataToken: {
        productName: 'producto 3',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.IMPACT,
    },
    {
      id: 3,
      dataToken: {
        productName: 'producto 3',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.IMPACT,
    },
    {
      id: 3,
      dataToken: {
        productName: 'producto 3',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.IMPACT,
    },
    {
      id: 3,
      dataToken: {
        productName: 'producto 3',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.IMPACT,
    },
    {
      id: 3,
      dataToken: {
        productName: 'producto 3',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.IMPACT,
    },
    {
      id: 3,
      dataToken: {
        productName: 'producto 3',
        productDescription: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      },
      type: TOKEN_TYPES.IMPACT,
    },
  ];

  function renderMarketplaceItems() {
    if (tokenType === TOKEN_TYPES.TODO) {
      return tokensFromApi.map((token) => {
        return <MarketplaceItem futureToken={token.type} dataToken={token.dataToken} />;
      });
    }
    const filteredTokens = tokensFromApi.filter((token) => token.type === tokenType);
    return filteredTokens.map((token) => {
      return <MarketplaceItem futureToken={token.type} dataToken={token.dataToken} />;
    });
  }

  return (
    <>
      <Header />
      <div className="main-marketplace-container">
        <div className="marketplace-tokens-container">
          <div className="marketplace-tokens-title">
            <h1>Explore our tokens</h1>
          </div>
          <div className="filters-tokens-container">
            <div className="marketplace-tokens-filters">
              <div className="primary-filters">
                <div>
                  <button type="button" onClick={() => setTokenType(TOKEN_TYPES.TODO)}>
                    <span className={`${tokenType === TOKEN_TYPES.TODO && 'active'}`}>Todo</span>
                  </button>
                  <button type="button" onClick={() => setTokenType(TOKEN_TYPES.IMPACT)}>
                    <span className={`${tokenType === TOKEN_TYPES.IMPACT && 'active'}`}>Impact token</span>
                  </button>
                  <button type="button" onClick={() => setTokenType(TOKEN_TYPES.FUTURE)}>
                    <span className={`${tokenType === TOKEN_TYPES.FUTURE && 'active'}`}>Future token</span>
                  </button>
                </div>
              </div>
              <div className="secondary-filters">
                <div>
                  <input type="text" placeholder="Search" className="search-bar" />
                  <div className="search-icon-container">
                    <img alt="search-icon" src={SearchIcon} />
                  </div>
                </div>
                <div className="filters-icon-container">
                  <img alt="filters-icon" src={FiltersIcon} />
                  <span>Filters</span>
                </div>
              </div>
            </div>
            <div className="marketplace-tokens">
              {renderMarketplaceItems()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
