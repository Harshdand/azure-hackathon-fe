import React from 'react';
import { Row, Col } from 'reactstrap';
import { Stack, Text } from '@fluentui/react';
import { ContactIcon } from '@fluentui/react-icons';

const iconStyles = {
  width: '25px',
  marginRight: '15px',
};

const UserCard = ({ details = {} } = {}) => {
  const {
    firstName = '',
    middleName = '',
    lastName = '',
    phone = '-',
    email = '-',
    aadhaar = '-',
    pan = '-',
    address = {},
    isAlive,
    deathDetails = {},
  } = details;

  return (
    <>
      <Stack horizontal>
        {<ContactIcon style={iconStyles} />}
        <Text variant="xLarge">
          {firstName} {middleName} {lastName}
        </Text>
      </Stack>
      <Row>
        <Col sm={3}>
          <Text className="font-bold" variant="mediumPlus">
            Phone:
          </Text>
          <Text variant="mediumPlus"> {phone}</Text>
        </Col>
        <Col>
          <Text className="font-bold" variant="mediumPlus">
            Email:
          </Text>
          <Text variant="mediumPlus"> {email}</Text>
        </Col>
        <Col>
          <Text className="font-bold" variant="mediumPlus">
            Aadhaar:
          </Text>
          <Text variant="mediumPlus"> {aadhaar}</Text>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <Text className="font-bold" variant="mediumPlus">
            PAN:
          </Text>
          <Text variant="mediumPlus"> {pan}</Text>
        </Col>
        {!isAlive && (
          <Col sm={3}>
            <Text className="font-bold" variant="mediumPlus">
              Date of Death:
            </Text>
            <Text variant="mediumPlus"> {deathDetails.dod}</Text>
          </Col>
        )}
      </Row>
      <Row>
        <Col sm={6}>
          <Row>
            <Col>
              <Text className="font-bold" variant="mediumPlus">
                Address:
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text className="font-bold" variant="mediumPlus">
                Line 1:
              </Text>
              <Text variant="mediumPlus"> {address.line1}</Text>
            </Col>
            <Col>
              <Text className="font-bold" variant="mediumPlus">
                Line 2:
              </Text>
              <Text variant="mediumPlus"> {address.line2}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text className="font-bold" variant="mediumPlus">
                City:
              </Text>
              <Text variant="mediumPlus"> {address.city}</Text>
            </Col>
            <Col>
              <Text className="font-bold" variant="mediumPlus">
                State:
              </Text>
              <Text variant="mediumPlus"> {address.state}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text className="font-bold" variant="mediumPlus">
                Country:
              </Text>
              <Text variant="mediumPlus"> {address.country}</Text>
            </Col>
            <Col>
              <Text className="font-bold" variant="mediumPlus">
                ZIP:
              </Text>
              <Text variant="mediumPlus"> {address.zip}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default UserCard;
