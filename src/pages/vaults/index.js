import React, { useEffect, useState } from 'react';
import BoxHighest from '../../components/box-highest';
import Content from '../../components/content';
import Strategies from '../../components/strategies';
import getVaults from '../../services/vaults';
import urlFromImage from '../../services/images';

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
