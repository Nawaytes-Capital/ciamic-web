import { DownloadOutlined, LeftOutlined } from "@ant-design/icons";
import {
	Button,
	Modal as AntdModal,
} from "antd";
import "./styles.scss"
import { IDataQuestions } from "../..";

interface IModalFilter {
  handleCancel: () => void;
  handleSubmit: () => void;
  isShow: boolean;
  data: IDataQuestions[];
}

export const ModalListQuestion = ({
  handleCancel,
  handleSubmit,
  isShow,
  data,
}: IModalFilter) => {
  return (
    <AntdModal
      title={
        <div className='header-card'>
          <div style={{ display: "flex" }}>
            <LeftOutlined
              className='icon-navigate'
              onClick={handleCancel}
              style={{ marginRight: "14px" }}
            />
            <p className='title-card'>{data[0]?.id!}</p>
          </div>
          <Button className='btn-download' onClick={handleSubmit}>
            Download as CSV <DownloadOutlined style={{ marginLeft: "8px" }} />
          </Button>
        </div>
      }
      footer={<></>}
      onCancel={handleCancel}
      open={isShow}
      width={850}
      destroyOnClose
      className='list-question-dashboard'
    >
      <div className='list-card'>
        <div className='content-detail'>
          {data.map((item, index: any) => (
            <div className='review-wrapper'>
              <div className='question'>
                <p className='number'>{index + 1}</p>
                <p className='text'>{item.question}</p>
              </div>
              {item.answer.map((item, index: any) => (
                <div className='answer'>{item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AntdModal>
  );
};