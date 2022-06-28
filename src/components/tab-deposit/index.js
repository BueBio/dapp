import React, { useEffect, useState } from 'react';
import { deposit } from '../../services/vaults';
import { getBalanceWallet, transfer } from '../../utils/erc20-helper';
import { useRLogin } from '../../context';

export default function TabDeposit({
  vault,
  token,
  showTab,
  walletVault,
}) {
  const { state: rloginState } = useRLogin();
  const { address, provider } = rloginState;
  const [balanceDeposit, setBalanceDeposit] = useState(0);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    if (vault && address) {
      getBalanceWallet(address, vault.coinAddress, provider)
        .then((balance) => {
          setUserBalance(balance);
        })
        .catch(console.log);
    }
  }, [vault, address]);

  const setMaxDeposit = () => {
    setBalanceDeposit(userBalance);
  };

  const checkIfBtnDisabled = () => {
    let disabled = false;
    if (balanceDeposit > userBalance) {
      disabled = true;
    }
    if (balanceDeposit <= 0) {
      disabled = true;
    }
    return disabled;
  };

  const setClassBtnDeposit = () => {
    const classDisable = checkIfBtnDisabled() && 'disabled';
    return `btn-secondary ${classDisable}`;
  };

  const handleDeposit = (e) => {
    const { value } = e.target;
    setBalanceDeposit(value);
  };

  const submitDeposit = () => {
    return transfer(
      vault.walletAddress,
      vault.coinAddress,
      provider,
      balanceDeposit,
      token.decimals,
    )
      .then((transactionHash) => {
        return deposit({
          walletAddress: address,
          vault: vault._id,
          transactionHash,
          amount: balanceDeposit,
        });
      })
      .then(() => {
        setUserBalance(userBalance - balanceDeposit);
        setBalanceDeposit(0);
      });
  };

  if (!showTab) {
    return <div />;
  }

  const youHave = `You have ${(walletVault && walletVault.balance) || '-'} ${token.symbol}`;

  return (
    <>
      <h5>From Wallet</h5>
      <div className="wallet-deposit">
        <div className="img-deposit">
          <img src={vault.urlImage} alt="vault" />
        </div>
        <div className="text-deposit">
          <p>
            {`You have ${userBalance} ${token.symbol}`}
          </p>
          <input type="number" value={balanceDeposit} onChange={handleDeposit} />
          <button onClick={setMaxDeposit} type="button">Max</button>
        </div>
      </div>
      <h5>To Vault</h5>
      <div className="vault-deposit">
        <div className="img-deposit">
          <img src={vault.urlImage} alt="vault" />
        </div>
        <div className="text-deposit">
          <p>
            {youHave}
          </p>
          <h3>-</h3>
        </div>
      </div>
      <div className="action-buttons">
        <button
          type="button"
          className={setClassBtnDeposit()}
          onClick={submitDeposit}
          disabled={checkIfBtnDisabled()}
        >
          Deposit
        </button>
      </div>
    </>
  );
}
