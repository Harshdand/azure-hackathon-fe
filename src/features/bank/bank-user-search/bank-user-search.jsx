import React, { useState } from 'react';
import {
  Stack,
  PrimaryButton,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { Container, Row, Col } from 'reactstrap';
import UserSearch from '../../../common/user-search/user-search';
import UserCard from '../../../common/user-card/user-card';
import { useHistory, useRouteMatch } from 'react-router-dom';

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

const BankUserSearch = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [searchResult, setSearchResult] = useState({
    success: true,
  });

  const onSearch = (value) => {
    setSearchResult(value);
  };

  return (
    <>
      <Container>
        <Stack {...columnProps} className="hc-shadow">
          <UserSearch onSearch={onSearch}></UserSearch>
          {!searchResult.success && (
            <>
              <MessageBar
                messageBarType={MessageBarType.warning}
                style={{ fontSize: '16px' }}
              >
                Unable to find the user with provided info.
              </MessageBar>

              <PrimaryButton
                text="CREATE NEW USER"
                style={{ width: '180px', marginTop: '30px' }}
                onClick={() => {
                  history.push(`${path}/user/new`);
                }}
              />
            </>
          )}
        </Stack>
      </Container>
      {searchResult?.user?.id && (
        <Stack {...columnProps} className="hc-shadow">
          <UserCard details={searchResult.user} />
          {searchResult?.user?.isAlive && (
            <Row>
              <Col sm={8}></Col>
              <Col sm={4} style={{ textAlign: 'right' }}>
                <PrimaryButton
                  text="NEXT"
                  style={{ width: '180px' }}
                  onClick={() => {
                    history.push(`${path}/user/update/${searchResult.user.id}`);
                  }}
                />
              </Col>
            </Row>
          )}
        </Stack>
      )}
    </>
  );
};

export default BankUserSearch;
