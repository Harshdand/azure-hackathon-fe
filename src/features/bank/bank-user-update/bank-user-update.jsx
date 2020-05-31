import React, { useState, useEffect } from 'react';
import {
  Stack,
  PrimaryButton,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { Container, Row, Col } from 'reactstrap';
import UserCard from '../../../common/user-card/user-card';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { userSearch } from '../../../common/user-search/user-search.api';
import BankAsset from '../bank-asset/bank-asset';

const columnProps = {
  tokens: { childrenGap: 15 },
  styles: {
    root: {
      width: 800,
      backgroundColor: '#fff',
      padding: '40px',
      margin: '20px auto',
    },
  },
};

const BankUserUpdate = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);
  const [assetEdit, setAssetEdit] = useState(false);
  const [user, setUser] = useState();
  const { id } = useParams();

  const onLoad = async (id) => {
    try {
      setIsLoading(true);
      const resp = await userSearch({ id });
      if (resp.status === 200) {
        setIsLoading(false);
        setUser(resp.data.data);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onLoad(id);
  }, [id]);

  return (
    <>
      <Container>
        <Stack {...columnProps} className="hc-shadow">
          <UserCard details={user} hideAddress />
          {user && (
            <PrimaryButton
              text="ADD ASSET"
              style={{ width: '230px', marginTop: '30px' }}
              onClick={() => {
                setAssetEdit(true);
              }}
            />
          )}
        </Stack>

        {user && assetEdit && <BankAsset userId={id}></BankAsset>}
      </Container>
    </>
  );
};

export default BankUserUpdate;
