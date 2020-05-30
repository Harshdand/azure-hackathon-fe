import React, { useState } from 'react';
import {
  TextField,
  Stack,
  PrimaryButton,
  Text,
  MessageBar,
  MessageBarType,
  Spinner,
} from '@fluentui/react';
import { ContactIcon, BankIcon, CityNextIcon } from '@fluentui/react-icons';
import { Container } from 'reactstrap';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';

import './login.css';
import { login } from './login.api';
import { setLoginInfo } from './login.utils';

const columnProps = {
  tokens: { childrenGap: 15 },
  styles: {
    root: {
      width: 400,
      backgroundColor: '#fff',
      padding: '40px',
      margin: '200px auto',
    },
  },
};

const formProps = {
  tokens: { childrenGap: 15 },
};

const iconStyles = {
  width: '25px',
  marginRight: '15px',
};

const Login = ({ type, header }) => {
  const [status, setStatus] = useState({ success: true });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const resp = await login(values);
      if (resp.status === 200) {
        setLoginInfo(resp);
        setIsLoading(false);
        setStatus({ user: resp.data, success: true, redirect: true });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setStatus({ success: false });
    }
  };

  return (
    <Container>
      <Stack {...columnProps} className="hc-shadow">
        <Stack horizontal>
          {type === 'user' && <ContactIcon style={iconStyles} />}
          {type === 'bank' && <BankIcon style={iconStyles} />}
          {type === 'govt' && <CityNextIcon style={iconStyles} />}
          <Text variant="xLarge">{header}</Text>
        </Stack>
        {!status.success && (
          <MessageBar
            messageBarType={MessageBarType.error}
            style={{ fontSize: '16px' }}
          >
            Invalid email or password.
          </MessageBar>
        )}
        {status.redirect && <Redirect to={`/${type}/dashboard`} />}
        <Formik
          initialValues={{
            email: '',
            password: '',
            category: type,
          }}
          validateOnBlur
          validateOnChange={false}
          validationSchema={Yup.object({
            email: Yup.string().email('Enter a valid email'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, errors }) => (
            <Form noValidate>
              <Stack {...formProps}>
                <TextField
                  disabled={isLoading}
                  name="email"
                  type="email"
                  label="Email"
                  autoComplete="off"
                  placeholder="example@gmail.com"
                  autoFocus
                  onChange={handleChange}
                  errorMessage={errors.email}
                />
                <TextField
                  disabled={isLoading}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="**********"
                  onChange={handleChange}
                />

                {isLoading && (
                  <Spinner
                    style={{ marginTop: '10px' }}
                    label="Logging In..."
                    labelPosition="right"
                  />
                )}

                <PrimaryButton
                  text="LOGIN"
                  type="submit"
                  disabled={isLoading || !values.email || !values.password}
                />
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default Login;
