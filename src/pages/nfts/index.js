import React, { useEffect, useState } from 'react';
import Content from '../../components/content';
import checkIfHaveNft from '../../utils/erc721-helper';
import { useRLogin } from '../../context';
import getNfts from '../../services/nfts';
import BoxHighest from '../../components/box-highest';
import NftsTable from '../../components/nfts-table';
import urlFromImage from '../../services/images';
import InfoBox from '../../components/infobox';

function filterNfts(nfts, rlogin) {
  const promisesChecked = nfts.map((nft) => {
    const nftAddress = nft.address.toLowerCase();
    const { address, provider } = rlogin;

    if (rlogin.address) {
      return checkIfHaveNft(address, nftAddress, provider);
    }
    return Promise.resolve();
  });

  return Promise.all(promisesChecked)
    .then((nftsChecked) => {
      return nfts.filter((nft, index) => nftsChecked[index]);
    });
}

export default function Nfts() {
  const { state: rloginState } = useRLogin();
  const [nfts, setNfts] = useState([]);
  const [ownNfts, setOwnNfts] = useState([]);

  useEffect(() => {
    const params = {
      populate: 'image vault.image',
    };
    getNfts({ params })
      .then((data) => {
        setNfts(data);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (rloginState.address) {
      filterNfts(nfts, rloginState)
        .then((nftsFiltered) => {
          setOwnNfts(nftsFiltered);
        });
    }
  }, [rloginState.address, nfts]);

  const elementsVaults = (!ownNfts || ownNfts.length === 0) ? "You don't have nfts"
    : ownNfts.map((nft) => {
      return (
        <BoxHighest
          image={urlFromImage(nft.image)}
          title={nft.name}
          description=""
          key={nft._id}
        />
      );
    });

  return (
    <Content title="NFTS">
      <InfoBox title="Do more with your NFTs">
        <p>
          To participate in most of our pools, you need to manage certain NFTs as membership.
          It´s important to understand that you can own or rent anytime you want.
        </p>
        <p>
          The NFTs will remain always in your wallet, the only thing that
          vaults do if to verify access.
        </p>
      </InfoBox>
      <div className="nft-box">
        <div className="content-box with-margin">
          <h3>My Active NFTs</h3>
          <div className="info-box">
            {elementsVaults || "You don't have nfts"}
          </div>
        </div>
        <NftsTable nfts={nfts} />
      </div>
    </Content>
  );
}
