import {
	Button,
	Form,
	Input,
	Modal as AntdModal,
} from "antd";
import { FormikProps } from "formik";
import { IAddAdmin } from "../..";
interface IModalFilter {
	handleCancel: () => void,
	handleSubmit: () => void,
    isShow: boolean;
    form: FormikProps<IAddAdmin>,
}

export const ModalAdd = ({
    handleCancel,
	  handleSubmit,
    isShow,
    form
}:IModalFilter) => {
    return (
      <AntdModal
        title={
          <h3 className="title-page">Tambah Admin</h3>
        }
        footer={
          <Button className='btn-primary' style={{width: "250px"}} onClick={handleSubmit}>
            Simpan
          </Button>
        }
        onCancel={handleCancel}
        open={isShow}
        width={650}
        destroyOnClose
      >
        <Form onFinish={form.handleSubmit}>
          <Form.Item>
            <div className="form-group">
              <p className="title-form">Nama</p>
              <Input
                name="name"
                type="text"
                className="form-control ps-15 bg-transparent"
                placeholder="Masukkan Nama Anda"
                style={{height: "48px"}}
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="form-group">
              <p className="title-form">Email</p>
              <Input
                name="email"
                type="text"
                className="form-control ps-15 bg-transparent"
                placeholder="Email"
                style={{height: "48px"}}
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="form-group">
              <p className="title-form">No. Handphone</p>
              <Input
                name="number_phone"
                type="text"
                className="form-control ps-15 bg-transparent"
                placeholder="Phone"
                style={{height: "48px"}}
                value={form.values.number_phone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>
          </Form.Item>
        </Form>
		</AntdModal>
    )
}