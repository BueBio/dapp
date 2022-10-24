import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import Error from '../../components/error';
import Production from '../../assets/honey-big-img.svg';
import ConnectMetamaskButton from '../../components/connect-metamask-button';
import TokenCharacteristics from '../../components/token-characteristics';
import Loader from '../../components/loader';
import BtnBuyToken from '../../components/btn-buy-token';
import { useRLogin } from '../../context';
import { getFutureProductionsById } from '../../services/tokens';
import { balanceOfContract } from '../../utils/buebio-future-helper';
import './styles.scss';

const IMAGE_URL = `${process.env.REACT_APP_API_URL}public/resources`;

export default function TokenDetails() {
  const [generalData, setGeneralData] = useState({
    productName: '',
    currentPrice: '',
    productDescription: '',
    tokenAddress: '',
    expiredAt: '',
    availabledAt: '',
    description: '',
    producer: {
      name: '',
      description: '',
    },
    image: {
      filename: '',
      mimetype: '',
      originalname: '',
    },
  });
  const [available, setAvailable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { state } = useRLogin();

  const img = generalData.image && generalData.image.filename;
  const tokenImg = img ? `${IMAGE_URL}/${generalData.image.filename}` : Production;

  useEffect(() => {
    getFutureProductionsById(id)
      .then((data) => {
        setLoading(false);
        setGeneralData(data);
        return balanceOfContract(data.tokenId);
      })
      .then((balance) => {
        setAvailable(balance.toNumber());
      })
      .catch(() => {
        setError(true);
      });
  }, [id]);

  function renderButtonIfItsConnected() {
    const btn = state.address
      ? <BtnBuyToken production={generalData} />
      : <ConnectMetamaskButton />;
    return (
      <div className="token-button-container">
        {btn}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="loader-center">
          <Loader />
          <h2>Getting data...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Header />
        <Error text="There was an error trying to get the future production..." />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <div className="token-description-container">
        <div className="image-description-section">
          <div className="token-image-section">
            <img src={tokenImg} alt="img" />
          </div>
          <div className="token-description-section">
            <div className="token-description-title-section">
              <span>Future product</span>
              <h2>{generalData.productName}</h2>
              <p>{generalData.productDescription}</p>
            </div>
            <div className="section-container">
              <div className="token-characteristics-container">
                <TokenCharacteristics
                  availabledAt={generalData.availabledAt}
                  expiredAt={generalData.expiredAt}
                />
              </div>
              <div className="production-description-section">
                <div className="description-info">
                  <h2>Production Description</h2>
                  <p>{generalData.description}</p>
                </div>
              </div>
              <div className="token-price-section">
                <div className="current-price-section">
                  <h4>Current price</h4>
                  <h2>
                    {generalData.priceTokenSymbol}
                    {' '}
                    {generalData.priceAmount}
                  </h2>
                </div>
                <div className="stock-availabled-section">
                  <h2>Stock</h2>
                  <p>
                    {available}
                    /
                    {generalData.totalQuantity}
                    {' '}
                    available
                  </p>
                </div>
              </div>
              {renderButtonIfItsConnected()}
              <div className="token-image-section">
                <h2>Producer Information</h2>
                <div className="producer-image-name">
                  <div className="producer-name-description-container">
                    <img src={tokenImg} alt="prod" />
                    <div className="producer-name-section">
                      <p>Name</p>
                      <h4>{generalData.producer.name}</h4>
                    </div>
                  </div>
                  <div className="producer-description-section">
                    <p>{generalData.producer.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
