import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemId: number | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemId,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Confirmar Eliminación</ModalHeader>
            <ModalBody>
              <p>
                ¿Estás seguro de que deseas eliminar el elemento con ID{" "}
                <strong>{itemId}</strong>?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Volver
              </Button>
              <Button color="danger" onPress={onConfirm}>
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
