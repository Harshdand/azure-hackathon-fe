import React from 'react';
import { TextField, Stack, PrimaryButton, Text } from '@fluentui/react';
import { ContactIcon, EMIIcon, CityNext2Icon } from '@fluentui/react-icons';
import { Container } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './login.css';

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
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container>
      <Stack {...columnProps} className="hc-shadow">
        <Stack horizontal>
          {type === 'user' && <ContactIcon style={iconStyles} />}
          {type === 'bank' && <EMIIcon style={iconStyles} />}
          {type === 'govt' && <CityNext2Icon style={iconStyles} />}
          <Text variant="xLarge">{header}</Text>
        </Stack>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validateOnBlur
          validateOnChange={false}
          validationSchema={Yup.object({
            email: Yup.string().email('Enter a valid email'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, isSubmitting, handleChange, errors }) => (
            <Form noValidate>
              <Stack {...formProps}>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  autoFocus
                  onChange={handleChange}
                  errorMessage={errors.email}
                />
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="**********"
                  onChange={handleChange}
                />

                <PrimaryButton
                  text="LOGIN"
                  type="submit"
                  disabled={!values.email || !values.password}
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
