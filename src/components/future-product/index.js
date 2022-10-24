import React, { useEffect, useState } from 'react';
import { getFutureProductions } from '../../services/tokens';
import Loader from '../loader';
import NewFutureProductGeneric from '../new-future-product-generic';
import './styles.scss';

export default function FutureProduct() {
  const [futureTokenData, setFutureTokenData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const limit = 4;

  function updateFutureProductions() {
    setLoading(true);
    getFutureProductions(limit)
      .then((data) => {
        setLoading(false);
        setError(false);
        setFutureTokenData(data);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }

  useEffect(() => {
    updateFutureProductions();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-msg">
        <h3>There was an error in our system, please try again...</h3>
        <button type="button" className="btn-gral" onClick={() => updateFutureProductions()}>Try Again</button>
      </div>
    );
  }
  if (!futureTokenData) {
    return (
      <div>
        There are no tokens published yet...
      </div>
    );
  }
  return (
    futureTokenData.map((data) => {
      return (
        <NewFutureProductGeneric tokenData={data} />
      );
    })
  );
}
