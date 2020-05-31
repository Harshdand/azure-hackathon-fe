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
  Dropdown,
} from '@fluentui/react';
import { Container } from 'reactstrap';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { addAsset } from '../bank.api';

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

const BankAsset = ({ userId }) => {
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
      const payload = { ...values, id: userId };
      const resp = await addAsset(payload);
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

  const addHeir = (values, setFieldValue) => {
    const { heirs } = values;
    const newHeir = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      aadhaar: '',
      pan: '',
      percentage: '100',
    };

    setFieldValue('heirs', [...heirs, newHeir]);
  };

  return (
    <>
      <Container>
        <Stack {...columnProps} className="hc-shadow">
          <Stack horizontal>
            {<ContactIcon style={iconStyles} />}
            <Text variant="xLarge">New Asset</Text>
          </Stack>

          <Formik
            initialValues={{
              assetType: '',
              assetId: '',
              amount: '',
              heirs: [],
            }}
            validateOnBlur
            validateOnChange={false}
            validationSchema={Yup.object({
              assetType: Yup.string().required('Asset Type is required'),
              assetId: Yup.string().required('Asset Id is required'),
              amount: Yup.string().required('Amount is required'),
            })}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, errors, setFieldValue }) => (
              <Form noValidate>
                <Stack {...formProps} horizontal>
                  <Dropdown
                    name="assetType"
                    disabled={isLoading || formDisabled}
                    required
                    placeholder="Select an option"
                    label="Asset Type"
                    style={{ width: '230px' }}
                    onChange={(e, index) => {
                      setFieldValue('assetType', index.key);
                    }}
                    options={[
                      { key: 'axis-fd', text: 'Axis Bank FD' },
                      { key: 'axis-savings', text: 'Axis Bank Savings' },
                    ]}
                  />

                  <TextField
                    disabled={isLoading || formDisabled}
                    name="assetId"
                    maxLength={30}
                    required
                    label="Asset Id"
                    placeholder="Enter Asset Id"
                    autoComplete="off"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    errorMessage={errors.assetId}
                  />
                  <TextField
                    disabled={isLoading || formDisabled}
                    name="amount"
                    type="number"
                    required
                    label="Amount"
                    placeholder="Amount"
                    autoComplete="off"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    errorMessage={errors.amount}
                  />
                </Stack>

                <Stack {...formProps} horizontal>
                  <PrimaryButton
                    disabled={
                      isLoading ||
                      formDisabled ||
                      !values.assetType ||
                      !values.assetId ||
                      !values.amount
                    }
                    text="ADD LEGAL HEIR"
                    style={{ width: '230px', marginTop: '30px' }}
                    onClick={() => {
                      addHeir(values, setFieldValue);
                    }}
                  />
                </Stack>

                <FieldArray
                  name="heirs"
                  render={() => (
                    <div>
                      {values?.heirs?.length
                        ? values.heirs.map((heir, index) => {
                            return (
                              <div key={`heir${index}`}>
                                <br />
                                <br />
                                <Text variant="xLarge">
                                  Legal Heir {index + 1}
                                </Text>
                                <Stack {...formProps} horizontal>
                                  <TextField
                                    disabled={isLoading || formDisabled}
                                    name={`heirs[${index}].firstName`}
                                    required
                                    label="First Name"
                                    placeholder="First Name"
                                    autoComplete="off"
                                    style={{ width: '230px' }}
                                    onChange={handleChange}
                                    errorMessage={
                                      errors?.heirs
                                        ? `${errors?.heirs[index]?.firstName}`
                                        : ''
                                    }
                                  />
                                  <TextField
                                    disabled={isLoading || formDisabled}
                                    name={`heirs[${index}].middleName`}
                                    label="Middle Name"
                                    placeholder="Middle Name"
                                    autoComplete="off"
                                    style={{ width: '230px' }}
                                    onChange={handleChange}
                                    errorMessage={
                                      errors?.heirs
                                        ? `${errors?.heirs[index]?.middleName}`
                                        : ''
                                    }
                                  />
                                  <TextField
                                    disabled={isLoading || formDisabled}
                                    name={`heirs[${index}].lastName`}
                                    required
                                    label="Last Name"
                                    placeholder="Last Name"
                                    autoComplete="off"
                                    style={{ width: '230px' }}
                                    onChange={handleChange}
                                    errorMessage={
                                      errors?.heirs
                                        ? `${errors?.heirs[index]?.lastName}`
                                        : ''
                                    }
                                  />
                                </Stack>
                                <Stack {...formProps} horizontal>
                                  <TextField
                                    disabled={isLoading || formDisabled}
                                    name={`heirs[${index}].phone`}
                                    label="Phone"
                                    required
                                    placeholder="Phone"
                                    autoComplete="off"
                                    style={{ width: '230px' }}
                                    onChange={handleChange}
                                    errorMessage={
                                      errors?.heirs
                                        ? `${errors?.heirs[index]?.phone}`
                                        : ''
                                    }
                                  />
                                  <TextField
                                    disabled={isLoading || formDisabled}
                                    name={`heirs[${index}].email`}
                                    label="Email"
                                    required
                                    placeholder="Email"
                                    autoComplete="off"
                                    style={{ width: '230px' }}
                                    onChange={handleChange}
                                    errorMessage={
                                      errors?.heirs
                                        ? `${errors?.heirs[index]?.email}`
                                        : ''
                                    }
                                  />
                                </Stack>
                                <Stack {...formProps} horizontal>
                                  <MaskedTextField
                                    disabled={isLoading || formDisabled}
                                    name={`heirs[${index}].aadhaar`}
                                    mask="9999-9999-9999"
                                    label="Aadhaar Number"
                                    placeholder="999999999999"
                                    autoComplete="off"
                                    style={{ width: '230px' }}
                                    onChange={handleChange}
                                    errorMessage={
                                      errors?.heirs
                                        ? `${errors?.heirs[index]?.aadhaar}`
                                        : ''
                                    }
                                  />

                                  <TextField
                                    disabled={isLoading || formDisabled}
                                    name={`heirs[${index}].pan`}
                                    type="text"
                                    label="PAN Card Number"
                                    maxLength={10}
                                    autoComplete="off"
                                    placeholder="ABCDE11223"
                                    style={{
                                      width: '230px',
                                      textTransform: 'uppercase',
                                    }}
                                    onChange={handleChange}
                                    errorMessage={
                                      errors?.heirs
                                        ? `${errors?.heirs[index]?.pan}`
                                        : ''
                                    }
                                  />
                                </Stack>
                                <Stack {...formProps} horizontal>
                                  <TextField
                                    disabled={isLoading || formDisabled}
                                    name={`heirs[${index}].percentage`}
                                    type="number"
                                    defaultValue={
                                      values.heirs[index].percentage
                                    }
                                    min={1}
                                    max={100}
                                    label="Percentage"
                                    placeholder="% of the asset"
                                    autoComplete="off"
                                    style={{ width: '230px' }}
                                    onChange={handleChange}
                                    errorMessage={
                                      errors?.heirs
                                        ? `${errors?.heirs[index]?.percentage}`
                                        : ''
                                    }
                                  />
                                </Stack>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  )}
                ></FieldArray>

                <PrimaryButton
                  text="SAVE"
                  disabled={
                    isLoading ||
                    formDisabled ||
                    !values.assetType ||
                    !values.assetId ||
                    !values.amount
                  }
                  type="submit"
                  style={{ width: '230px', marginTop: '30px' }}
                />
              </Form>
            )}
          </Formik>
          {isLoading && (
            <Spinner
              style={{ marginTop: '10px' }}
              label="Saving asset details..."
              labelPosition="right"
            />
          )}
          {!isLoading && message.success && (
            <>
              <MessageBar
                messageBarType={MessageBarType.success}
                style={{ fontSize: '16px' }}
              >
                Saved asset details successfully.
              </MessageBar>

              <PrimaryButton
                text="BACK TO DASHBOARD"
                style={{ width: '230px', marginTop: '30px' }}
                onClick={() => {
                  history.push(`/bank/dashboard`);
                }}
              />
            </>
          )}

          {!isLoading && message.success === false && (
            <MessageBar
              messageBarType={MessageBarType.warning}
              style={{ fontSize: '16px' }}
            >
              Unable to save asset details. Please try again later.
            </MessageBar>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default BankAsset;
