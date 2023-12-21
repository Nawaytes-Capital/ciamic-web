import {
	Button,
	Form,
	Input,
	Modal as AntdModal,
} from "antd";
import { FormikProps } from "formik";
import { IAddAdmin } from "../..";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
interface IModalFilter {
  handleCancel: () => void;
  handleSubmit: () => void;
  isShow: boolean;
  form: FormikProps<IAddAdmin>;
  isLoading: boolean;
}

export const ModalAdd = ({
  handleCancel,
  handleSubmit,
  isShow,
  form,
  isLoading,
}: IModalFilter) => {
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <AntdModal
      title={<h3 className='title-page'>Tambah Admin</h3>}
      footer={
        <Button
          className='btn-primary'
          style={{ width: "250px" }}
          onClick={handleSubmit}
          htmlType='submit'
          loading={isLoading}
          disabled={isLoading}
        >
          Simpan {isLoading && <LoadingOutlined />}
        </Button>
      }
      onCancel={handleCancel}
      open={isShow}
      width={650}
      destroyOnClose
    >
      <Form onFinish={form.handleSubmit}>
        <Form.Item name='name'>
          <div className='form-group'>
            <p className='title-form'>Nama</p>
            <Input
              disabled={isLoading}
              name='name'
              type='text'
              className='form-control ps-15 bg-transparent'
              placeholder='Masukkan Nama Anda'
              style={{ height: "48px" }}
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <p className='text-error'>{form.errors.name}</p>
          </div>
        </Form.Item>
        <Form.Item name='email'>
          <div className='form-group'>
            <p className='title-form'>Email</p>
            <Input
              disabled={isLoading}
              name='email'
              type='text'
              className='form-control ps-15 bg-transparent'
              placeholder='Email'
              style={{ height: "48px" }}
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <p className='text-error'>{form.errors.email}</p>
          </div>
        </Form.Item>
        <Form.Item>
          <div className='form-group'>
            <p className='title-form'>No. Handphone</p>
            <Input
              disabled={isLoading}
              name='number_phone'
              type='text'
              className='form-control ps-15 bg-transparent'
              placeholder='Phone'
              style={{ height: "48px" }}
              value={form.values.number_phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <p className='text-error'>{form.errors.number_phone}</p>
          </div>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};