import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Content from '../../components/content';
import TabDeposit from '../../components/tab-deposit';
import TabWithdraw from '../../components/tab-withdraw';
import './style.scss';
import { getVaultById, getWalletVault } from '../../services/vaults';
import { getInfoToken } from '../../utils/erc20-helper';
import { useRLogin } from '../../context';

const URL_IMAGE = process.env.REACT_APP_IMAGE_URL_BASE;

export default function DetailsVault() {
  const { state: rloginState } = useRLogin();
  const { address, provider } = rloginState;
  const [vault, setVault] = useState();
  const [token, setToken] = useState({
    name: '',
    symbol: '',
    decimals: '',
  });
  const [walletVault, setWalletVault] = useState();
  const [option, setOption] = useState('deposit');
  const { id } = useParams();

  useEffect(() => {
    getVaultById(id)
      .then((data) => {
        const urlImage = `${URL_IMAGE}/${data.image.originalname}`;
        const dataVault = { ...data, urlImage };
        setVault(dataVault);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    getWalletVault(id, address)
      .then((data) => {
        if (data && data[0]) {
          setWalletVault(data[0]);
        }
      })
      .catch(console.log);
  }, [vault, address]);

  useEffect(() => {
    if (vault && provider) {
      getInfoToken(vault.coinAddress, provider)
        .then((tokenInfo) => {
          setToken(tokenInfo);
        })
        .catch(console.log);
    }
  }, [vault, provider]);

  const formatStrategyAddress = (strategy) => {
    return `${strategy.substring(0, 4)}...${strategy.substring(strategy.length - 3, strategy.length)}`;
  };

  const selectOption = (optionSelected) => {
    setOption(optionSelected);
  };

  const setClassBtnOption = (opt) => {
    const classSelected = opt === option && 'btn-unstyle-selected';
    return `btn-unstyle ${classSelected}`;
  };

  if (!vault) {
    return <div />;
  }

  const boxActions = (
    <>
      <div className="title-deposit">
        <button
          type="button"
          className={setClassBtnOption('deposit')}
          onClick={() => { selectOption('deposit'); }}
        >
          Deposit
        </button>
        <button
          type="button"
          className={setClassBtnOption('withdraw')}
          disabled={!walletVault}
          onClick={() => { selectOption('withdraw'); }}
        >
          Withdraw
        </button>
      </div>
      <div className="line-deposit"> </div>
      <TabDeposit
        vault={vault}
        walletVault={walletVault}
        token={token}
        showTab={option === 'deposit'}
      />
      <TabWithdraw
        vault={vault}
        walletVault={walletVault}
        token={token}
        showTab={option === 'withdraw' && walletVault.balance > 0}
      />
    </>
  );

  const boxLogin = (
    <p>
      Sign in is required
    </p>
  );

  return (
    <Content title="Vaults / Name-Vault">
      <div className="box-details">
        <div className="details-info">
          <h5>{vault.name}</h5>
          <h5>Overview</h5>
          <div className="details-vault">
            <div className="img-details">
              <img src={vault.urlImage} alt="vault" />
            </div>
            <table>
              <tr>
                APY
                <td>{`%${vault.apy}`}</td>
              </tr>
              <tr>
                Total Assets
                <td>$100</td>
              </tr>
              <tr>
                Type
                <td>{token.symbol}</td>
              </tr>
              <tr>
                Price per share
                <td>1.48</td>
              </tr>
              <tr>
                Strategy Address
                <td>{formatStrategyAddress(vault.coinAddress)}</td>
              </tr>
              <tr>
                NFT
                <td>{token.name}</td>
              </tr>
            </table>
          </div>
          <h5>About</h5>
          <div className="details-text">
            <p>{vault.description}</p>
          </div>

        </div>
        <div className="details-deposit">
          {
            address ? boxActions : boxLogin
          }
        </div>
      </div>
    </Content>

  );
}
