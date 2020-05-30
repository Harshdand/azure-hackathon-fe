import React, { useState } from 'react';
import {
  TextField,
  Stack,
  PrimaryButton,
  Text,
  MaskedTextField,
  Spinner,
} from '@fluentui/react';
import { ProfileSearchIcon } from '@fluentui/react-icons';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { userSearch } from './user-search.api';

const formProps = {
  tokens: { childrenGap: 15 },
};

const iconStyles = {
  width: '25px',
  marginRight: '15px',
};

const UserSearch = ({ onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const resp = await userSearch(values);

      if (resp.status === 200) {
        setIsLoading(false);
        onSearch({ success: true, user: resp.data.data });
      }
    } catch (error) {
      setIsLoading(false);
      onSearch({ success: false });
    }
  };

  return (
    <>
      <Stack horizontal>
        {<ProfileSearchIcon style={iconStyles} />}
        <Text variant="xLarge">Search for an existing User</Text>
      </Stack>

      <Formik
        initialValues={{
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
              <MaskedTextField
                disabled={isLoading}
                name="aadhaar"
                mask="9999-9999-9999"
                label="Aadhaar Number"
                placeholder="999999999999"
                autoFocus
                autoComplete="off"
                style={{ width: '230px' }}
                onChange={handleChange}
                errorMessage={errors.aadhaar}
              />
              <Text variant="large" style={{ marginTop: '30px' }}>
                or
              </Text>
              <TextField
                disabled={isLoading}
                name="pan"
                type="text"
                label="PAN Card Number"
                maxLength={10}
                autoComplete="off"
                placeholder="ABCDE11223"
                style={{ width: '230px', textTransform: 'uppercase' }}
                onChange={handleChange}
                errorMessage={errors.pan}
              />

              <PrimaryButton
                text="SEARCH"
                type="submit"
                style={{ width: '200px', marginTop: '30px' }}
                disabled={isLoading || !(values.aadhaar || values.pan)}
              />
            </Stack>
          </Form>
        )}
      </Formik>
      {isLoading && (
        <Spinner
          style={{ marginTop: '10px' }}
          label="Searching..."
          labelPosition="right"
        />
      )}
    </>
  );
};

export default UserSearch;
