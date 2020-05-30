import React, { useState } from 'react';
import { ContactIcon } from '@fluentui/react-icons';
import {
  Stack,
  PrimaryButton,
  MessageBar,
  MessageBarType,
  Text,
  MaskedTextField,
  TextField,
  Spinner,
} from '@fluentui/react';
import { Container } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { createUser } from '../bank.api';

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

const BankUserCreate = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [message, setMessage] = useState({});
  const [formDisabled, setFormDisabled] = useState(false);

  const iconStyles = {
    width: '25px',
    marginRight: '15px',
  };

  const formProps = {
    tokens: { childrenGap: 15 },
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const payload = { ...values, pan: values.pan.toUpperCase() };
      const resp = await createUser(payload);
      if (resp.status === 200) {
        setIsLoading(false);
        setFormDisabled(true);
        setId(resp?.data?.data?.id);
        setMessage({ success: true, message: '' });
      }
    } catch (error) {
      setIsLoading(false);
      setMessage({ success: false, message: '' });
    }
  };

  return (
    <>
      <Container>
        <Stack {...columnProps} className="hc-shadow">
          <Stack horizontal>
            {<ContactIcon style={iconStyles} />}
            <Text variant="xLarge">New User</Text>
          </Stack>

          <Formik
            initialValues={{
              firstName: '',
              middleName: '',
              lastName: '',
              phone: '',
              email: '',
              pan: '',
              aadhaar: '',
            }}
            validateOnBlur
            validateOnChange={false}
            validationSchema={Yup.object({
              pan: Yup.string().min(10, 'Enter a valid PAN Card Number'),
              aadhaar: Yup.string().matches(/[0-9]-/, {
                excludeEmptyString: true,
                message: 'Enter a valid Aadhaar Number',
              }),
            })}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, errors }) => (
              <Form noValidate>
                <Stack {...formProps} horizontal>
                  <TextField
                    disabled={isLoading || formDisabled}
                    name="firstName"
                    label="First Name"
                    maxLength={30}
                    required
                    placeholder="First Name"
                    autoFocus
                    autoComplete="off"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    errorMessage={errors.firstName}
                  />
                  <TextField
                    disabled={isLoading || formDisabled}
                    name="middleName"
                    maxLength={30}
                    label="Middle Name"
                    placeholder="Middle Name"
                    autoComplete="off"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    errorMessage={errors.middleName}
                  />
                  <TextField
                    disabled={isLoading || formDisabled}
                    name="lastName"
                    maxLength={30}
                    required
                    label="Last Name"
                    placeholder="Last Name"
                    autoComplete="off"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    errorMessage={errors.lastName}
                  />
                </Stack>

                <Stack {...formProps} horizontal>
                  <TextField
                    disabled={isLoading || formDisabled}
                    name="phone"
                    type="number"
                    label="Phone Number"
                    required
                    placeholder="10 Digit Phone Number"
                    autoComplete="off"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    errorMessage={errors.phone}
                  />
                  <TextField
                    disabled={isLoading || formDisabled}
                    name="email"
                    label="Email"
                    maxLength={100}
                    placeholder="Email"
                    autoComplete="off"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    errorMessage={errors.email}
                  />
                </Stack>

                <Stack {...formProps} horizontal>
                  <MaskedTextField
                    disabled={isLoading || formDisabled}
                    name="aadhaar"
                    mask="9999-9999-9999"
                    label="Aadhaar Number"
                    required
                    placeholder="999999999999"
                    autoComplete="off"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    errorMessage={errors.aadhaar}
                  />
                  <TextField
                    disabled={isLoading || formDisabled}
                    name="pan"
                    type="text"
                    label="PAN Card Number"
                    maxLength={10}
                    required
                    autoComplete="off"
                    placeholder="ABCDE11223"
                    style={{ width: '230px', textTransform: 'uppercase' }}
                    onChange={handleChange}
                    errorMessage={errors.pan}
                  />
                </Stack>

                <PrimaryButton
                  text="CREATE"
                  type="submit"
                  disabled={isLoading || formDisabled}
                  style={{ width: '230px', marginTop: '30px' }}
                />
              </Form>
            )}
          </Formik>
          {isLoading && (
            <Spinner
              style={{ marginTop: '10px' }}
              label="Creating User..."
              labelPosition="right"
            />
          )}
          {!isLoading && message.success && (
            <>
              <MessageBar
                messageBarType={MessageBarType.success}
                style={{ fontSize: '16px' }}
              >
                Created the user successfully.
              </MessageBar>

              <PrimaryButton
                text="NEXT"
                style={{ width: '230px', marginTop: '30px' }}
                onClick={() => {
                  history.push(`/bank/dashboard/user/update/${id}`);
                }}
              />
            </>
          )}

          {!isLoading && message.success === false && (
            <MessageBar
              messageBarType={MessageBarType.warning}
              style={{ fontSize: '16px' }}
            >
              Unable to create the user. Please try again later.
            </MessageBar>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default BankUserCreate;
