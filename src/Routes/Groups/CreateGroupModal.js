import React from 'react';
import PropTypes from 'prop-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import Modal from '../../components/Modal';
import { createGroup } from '../../api';
import { nameValidator } from '../../constants';
import apiWithToast from '../../utils/apiWithToast';
import { useDispatch } from 'react-redux';

const createGroupSchema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'Group name',
      helperText:
        'Can only contain letters, numbers, spaces, hyphens ( - ), and underscores( _ ).',
      isRequired: true,
      validate: [
        { type: validatorTypes.REQUIRED },

        { type: validatorTypes.MAX_LENGTH, threshold: 50 },
        nameValidator,
      ],
    },
  ],
};

const CreateGroupModal = ({ isModalOpen, setIsModalOpen, reloadData }) => {
  const dispatch = useDispatch();

  const handleCreateGroup = (values) => {
    const statusMessages = {
      onSuccess: {
        title: 'Success',
        description: `${values.name} has been created successfully`,
      },
      onError: { title: 'Error', description: 'Failed to create group' },
    };
    apiWithToast(dispatch, () => createGroup(values), statusMessages);
  };
  return (
    <Modal
      isOpen={isModalOpen}
      openModal={() => setIsModalOpen(false)}
      title="Create Group"
      submitLabel="Create"
      schema={createGroupSchema}
      onSubmit={handleCreateGroup}
      reloadData={reloadData}
    />
  );
};

export default CreateGroupModal;

CreateGroupModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  reloadData: PropTypes.func,
};
