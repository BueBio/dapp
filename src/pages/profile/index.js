import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenIcon from '../../assets/my-tokens-icon.svg';
import Header from '../../components/header';
import ShowMyTokens from '../../components/show-my-tokens';
import Loader from '../../components/loader';
import { useRLogin } from '../../context';
import { getCodesWallet, getFutureProductions } from '../../services/profile';
import { getBalanceWalletTokens } from '../../utils/buebio-impact-helper';
import { getBalanceTokens } from '../../utils/buebio-future-helper';
import './styles.scss';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: '',
  });
  const [impactTokens, setImpactTokens] = useState([]);
  const [futureTokens, setFutureTokens] = useState([]);
  const [viewTable, setViewTable] = useState('mytokens');
  const { state } = useRLogin();
  const [filter, setFilter] = useState('myTokens');
  const navigate = useNavigate();

  function getFutureTokens() {
    let futureProductionsData;
    const walletsArray = [];
    const tokensId = [];

    return getFutureProductions()
      .then((futureProductions) => {
        futureProductions.forEach((futureProduction) => {
          walletsArray.push(state.address);
          tokensId.push(futureProduction.tokenId);
        });
        futureProductionsData = futureProductions;
        return getBalanceTokens(walletsArray, tokensId, state.provider);
      })
      .then((balances) => {
        const data = [];
        futureProductionsData.forEach((elem, index) => {
          if (balances[index] > 0) {
            for (let i = 0; i < balances[index]; i++) {
              data.push(elem);
            }
          }
        });
        setFutureTokens(data);
      });
  }

  function getImpactTokens() {
    let productionsData;
    const walletsArray = [];
    const codesArray = [];

    return getCodesWallet(state.address)
      .then((productions) => {
        productions.forEach((production) => {
          walletsArray.push(state.address);
          codesArray.push(production.tokenId);
        });
        productionsData = productions;
        return getBalanceWalletTokens(walletsArray, codesArray, state.provider);
      })
      .then((balances) => {
        const data = [];
        productionsData.forEach((elem, index) => {
          if (balances[index] > 0) {
            for (let i = 0; i < balances[index]; i++) {
              let transactionId;
              if (elem.transactionIds && elem.transactionIds[i]) {
                transactionId = elem.transactionIds[i];
              }
              data.push({
                image: elem.image,
                productName: elem.productName,
                productDescription: elem.productDescription,
                transactionId,
              });
            }
          }
        });
        setImpactTokens(data);
      });
  }

  useEffect(() => {
    if (!state.address) {
      navigate('/');
    }
  }, [state.address]);

  useEffect(() => {
    setLoading(true);
    setError({
      state: false,
      message: '',
    });

    Promise.all([
      getImpactTokens(),
      getFutureTokens(),
    ])
      .catch(() => {
        setError({
          state: true,
          message: 'Error get tokens',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const setFilterSelected = (newFilter) => {
    if (newFilter === filter) {
      setFilter('');
    } else {
      setFilter(newFilter);
    }
  };

  function isActiveButton(id) {
    if (id === filter) {
      return 'active';
    }
    return '';
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="step-box">
          <Loader />
        </div>
      );
    }

    if (error.state) {
      return (
        <div className="step-box">
          <p>{error.message}</p>
        </div>
      );
    }

    return (
      <div>
        <ShowMyTokens
          showTable={viewTable}
          impactTokens={impactTokens}
          futureTokens={futureTokens}
        />
      </div>
    );
  };

  return (
    <div className="page-container">
      <Header />
      <div className="profile-container">
        <div className="profile-tokens-container">
          <div className="welcome-text">
            <h2 className="welcome-text-h2">
              Welcome back,
              {' '}
              <span id="wallet-id">{state.address}</span>
              !
              😊
            </h2>
          </div>
          <div className="profile-tokens-navbar">
            <button
              value="myTokens"
              className={`${isActiveButton('myTokens')}`}
              onClick={(e) => {
                setFilterSelected(e.target.value);
                setViewTable('mytokens');
              }}
              type="button"
            >
              <img src={TokenIcon} alt="img-token" />
              My Tokens
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
