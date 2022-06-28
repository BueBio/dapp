import React, { useEffect, useState } from 'react';
import BoxHighest from '../../components/box-highest';
import Content from '../../components/content';
import Strategies from '../../components/strategies';
import { getVaults } from '../../services/vaults';
import urlFromImage from '../../services/images';
import InfoBox from '../../components/infobox';

export default function Vaults() {
  const [vaults, setVaults] = useState([]);
  useEffect(() => {
    getVaults()
      .then((data) => {
        setVaults(data);
      })
      .catch(console.log);
  }, []);

  const elementsVaults = vaults.map((vault) => (
    <BoxHighest
      image={urlFromImage(vault.image)}
      title={vault.name}
      description={`${vault.apy}%`}
      key={vault._id}
    />
  ));
  return (
    <Content title="Vaults">
      <InfoBox title="Spend your time wisely">
        <p>
          TIP Vaults are a way to use technology to help manage your holdings.
          You choose the strategy that best suits you,
          deposit into that vault, and TIP tech helps maximize yield through
          shifting capital, auto-compounding, and rebalancing.
        </p>
        <p>Custody, and responsibility, for your holdings remains yours.</p>
        <p>You can withdraw anytime.</p>
      </InfoBox>
      <div className="vault-box">
        <div className="content-box with-margin">
          <h3>Highest Scoring Pools</h3>
          <div className="info-box">
            {elementsVaults}
          </div>
        </div>
        <Strategies vaults={vaults} />
      </div>
    </Content>
  );
}
