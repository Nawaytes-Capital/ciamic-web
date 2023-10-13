import { Alert as AntdAlert, message} from 'antd';
import React, { useEffect } from 'react';
import "./styles.scss";

interface IRegisterRequest {
	type: "success" | "info" | "warning" | "error",
	title: string,
    description: string,
    isVisible: boolean,
}

const Alert:React.FC<IRegisterRequest> = ({description, title, type, isVisible}) => {
    return (
        <>
            {isVisible && (
                <AntdAlert
                    message={title}
                    description={description}
                    type={type}
                    showIcon
                    className='alert-wp'
                />
            )}
        </>
        
    )
};

export default Alert