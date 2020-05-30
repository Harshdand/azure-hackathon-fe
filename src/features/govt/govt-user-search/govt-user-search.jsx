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

import './govt-user-search.css';
import DeathDialog from '../death-dialog/death-dialog';

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

const GovtUserSearch = () => {
  const [searchResult, setSearchResult] = useState({
    success: true,
  });
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

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
                Unable to find the user with provided info. Please enter correct
                info and try again.
              </MessageBar>
            </>
          )}
        </Stack>
      </Container>
      {isSuccessful && (
        <Container style={{ padding: '0 80px' }}>
          <MessageBar
            messageBarType={MessageBarType.success}
            style={{ fontSize: '16px' }}
          >
            Action was successful.
          </MessageBar>
        </Container>
      )}
      {searchResult?.user?.id && !isSuccessful && (
        <Stack {...columnProps} className="hc-shadow">
          <UserCard details={searchResult.user} />
          {searchResult?.user?.isAlive && (
            <Row>
              <Col sm={8}></Col>
              <Col sm={4} style={{ textAlign: 'right' }}>
                <PrimaryButton
                  text="DECLARE DEAD"
                  style={{ width: '180px' }}
                  onClick={() => {
                    setShowDialog(true);
                  }}
                />
              </Col>
            </Row>
          )}
        </Stack>
      )}

      <DeathDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        userId={searchResult?.user?.id}
        onConfirm={(value) => {
          setIsSuccessful(value.success);
          setTimeout(() => {
            setIsSuccessful(false);
            setSearchResult({ success: true });
          }, 10000);
          setShowDialog(false);
        }}
      />
    </>
  );
};

export default GovtUserSearch;
