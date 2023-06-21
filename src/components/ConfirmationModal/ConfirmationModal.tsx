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
  isLoading?: boolean;
  actionColor?: string;
  isLoadingText?: string;
}
const ConfirmationModal = ({
  isOpen = false,
  onClose = undefined,
  title = 'Modal',
  body = 'Are you sure?',
  cancelText = 'Cancel',
  isLoadingText = 'logging out...',
  success = false,
  handleAction = undefined,
  actionText = 'Yes',
  alertProps,
  isLoading = false,
  actionColor = 'danger',
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
                isDisabled: isLoading,
                // colorScheme: 'blueGray',
                onPress: onClose,
              }}>
              {cancelText}
            </CustomButton>
            <CustomButton
              buttonProps={{
                // bg: COLORS.danger,
                colorScheme: actionColor,
                isLoading,
                isLoadingText,
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
