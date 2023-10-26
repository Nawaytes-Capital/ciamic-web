import {
	Button,
	Form,
	Input,
	Modal as AntdModal,
} from "antd";
interface IModalFilter {
	handleCancel: () => void,
	handleSubmit: () => void,
    isShow: boolean;
    form: any,
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
                <h3 className="title-page">Add New Batch</h3>
			}
			footer={
				<div className='flex justify-center mt-8'>
					<Button className='btn-primary' style={{width: "250px"}} onClick={handleSubmit}>
						Continue
					</Button>
				</div>
			}
			onCancel={handleCancel}
			open={isShow}
			width={850}
			destroyOnClose
			className="modal-forgot"
		>
			<Form onFinish={form.handleSubmit}>
                <Form.Item>
                  <div className="form-group">
                    <p className="title-form">ID Batch</p>
                    <div className="input-group mb-3">
                      <Input
                        name="id_batch"
                        type="text"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Masukkan Email Anda"
                        style={{height: "48px"}}
                        value={form.values.id_batch}
                        disabled
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="form-group">
                    <p className="title-form">Pertanyaan 1</p>
                    <div className="input-group mb-3">
                      <Input
                        name="id_batch"
                        type="text"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Masukkan Email Anda"
                        style={{height: "48px"}}
                        value={form.values.id_batch}
                        disabled
                      />
                    </div>
                  </div>
                </Form.Item>
            </Form>
		</AntdModal>
    )
}