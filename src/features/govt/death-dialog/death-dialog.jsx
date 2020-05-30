import React, { useState } from 'react';
import {
  Dialog,
  DatePicker,
  DialogFooter,
  DefaultButton,
  PrimaryButton,
  DialogType,
  Spinner,
} from '@fluentui/react';
import { confirmUserDeath } from '../user-death/user-death.api';

const modalProps = {
  isBlocking: true,
  styles: { main: { width: '600px' } },
};

const dialogContentProps = {
  type: DialogType.normal,
  title: 'Confirm Death',
  subText: 'Please select Date of Death and confirm.',
};

const DeathDialog = ({ showDialog, setShowDialog, userId, onConfirm }) => {
  const [dod, setDod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const confirmDeath = async () => {
    if (dod && userId) {
      try {
        setIsLoading(true);
        const resp = await confirmUserDeath(dod, userId);

        if (resp.status === 200) {
          setIsLoading(false);
          onConfirm({ success: true });
        }
      } catch (error) {
        setIsLoading(false);
        onConfirm({ success: false });
      }
    }
  };

  return (
    <Dialog
      hidden={!showDialog}
      onDismiss={() => {
        if (!isLoading) {
          setShowDialog(false);
        }
      }}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps}
    >
      <DatePicker
        isRequired
        label="Date of Death"
        disabled={isLoading}
        maxDate={new Date()}
        value={dod ? new Date(dod) : ''}
        placeholder="Select a date..."
        onSelectDate={(date) => {
          const isoDate = date.toISOString();
          setDod(isoDate);
        }}
      />
      {isLoading && (
        <Spinner
          style={{ marginTop: '10px' }}
          label="Processing the request..."
          labelPosition="right"
        />
      )}
      <DialogFooter>
        <DefaultButton
          disabled={isLoading}
          onClick={() => {
            setShowDialog(false);
          }}
          text="Cancel"
        />
        <PrimaryButton
          onClick={confirmDeath}
          text="Confirm"
          disabled={isLoading}
        />
      </DialogFooter>
    </Dialog>
  );
};

export default DeathDialog;
