import React from 'react';
import { Modal, Form, Input } from 'antd';


const PlatformModal = props => {
  const { currentModalData, isModalOpen, toggleModal, handleModal } = props;

  const [form] = Form.useForm();

  const handleUpdateModal = formValues => {
    const platformUpdateModalObj = {
      filter: { _id: currentModalData._id },
      updateDocument: formValues
    };

    handleModal(platformUpdateModalObj);
    toggleModal();
  }

  return (<Modal
    layout="vertical"
    title="Update Platform"
    okText="Update"
    cancelText="Cancel"
    visible={isModalOpen}
    onOk={() => {
      form
        .validateFields()
        .then((values) => {
          handleUpdateModal(values)
        }).catch((err) => console.log("Validation Error: ", err))
    }}
    onCancel={() => toggleModal()}
  >
    <Form
      form={form}
      initialValues={{
        _id: currentModalData._id,
        platDisplayName: currentModalData.platDisplayName,
      }}
    >
      <Form.Item
        label="ID"
        name="_id"
      >
        <Input placeholder="Platform Id" />
      </Form.Item>
      <Form.Item
        label="Display Name"
        name="platDisplayName"
      >
        <Input placeholder="Platform Id" />
      </Form.Item>
    </Form>
  </Modal>)
};

export default PlatformModal;