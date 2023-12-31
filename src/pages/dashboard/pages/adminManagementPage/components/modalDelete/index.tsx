import { WarningTwoTone } from "@ant-design/icons";
import { Modal as AntdModal, Button } from "antd";
import "./styles.scss";

interface IModalFilter {
  handleCancel: () => void;
  handleSubmit: () => void;
  isShow: boolean;
}

export const ModalDelete = ({
  handleCancel,
  handleSubmit,
  isShow,
}: IModalFilter) => {
  return (
    <AntdModal
      title={
        <div className='title-wrapper'>
          <WarningTwoTone twoToneColor='#FD594A' />
          <h3 className='title-page'>Konfirmasi Penghapusan Data</h3>
        </div>
      }
      footer={
        <div className='btn-wrapper'>
          <Button danger onClick={handleCancel}>
            Batal
          </Button>
          <Button type='primary' danger onClick={handleSubmit}>
            Hapus
          </Button>
        </div>
      }
      onCancel={handleCancel}
      open={isShow}
      width={480}
      destroyOnClose
      className='modal-delete'
    >
      <p style={{ textAlign: "center" }}>
        Tindakan ini bersifat permanen dan tidak dapat dibatalkan. Apakah Anda
        yakin ingin melanjutkan dan menghapus data ini?
      </p>
    </AntdModal>
  );
};