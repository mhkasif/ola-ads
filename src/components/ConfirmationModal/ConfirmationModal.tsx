import CustomButton from '@components/CustomButton/CustomButton';
import {COLORS} from '@utils/colors';
import {AlertDialog, Button, Modal, IModalProps} from 'native-base';
import {IAlertDialogComponentType} from 'native-base/lib/typescript/components/composites/AlertDialog/types';
// import { IAlertDialogProps } from 'native-base/lib/typescript/components/composites';
import React, {useRef} from 'react';
interface IConfirmationModalProps {
  title?: string;
  body?: string;
  cancelText?: string;
  success?: boolean;
  // handleAction?: null|() => void;
  handleAction?: {(): void} | undefined;
  actionText?: string;
  alertProps?: IModalProps | undefined;
  isOpen?: boolean;
  onClose?: {(): void} | undefined;
}
const ConfirmationModal = ({
  isOpen = false,
  onClose = undefined,
  title = 'Modal',
  body = 'Are you sure?',
  cancelText = 'Cancel',
  success = false,
  handleAction = undefined,
  actionText = 'Yes',
  alertProps,
}: IConfirmationModalProps) => {
  // const leastDestructiveRef = useRef(null);
  return (
    <Modal
      isOpen={isOpen}
      // leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
      {...(alertProps || {})}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <CustomButton
              textProps={{color: COLORS.primary}}
              noGradient
              buttonProps={{
                variant: 'ghost',
                // colorScheme: 'blueGray',
                onPress: onClose,
              }}>
              {cancelText}
            </CustomButton>
            <CustomButton
              buttonProps={{
                // bg: COLORS.danger,
                colorScheme: 'danger',
                onPress: handleAction,
              }}
              noGradient>
              {actionText}
            </CustomButton>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationModal;
