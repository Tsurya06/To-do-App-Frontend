import '../auth/Login.css';
import { Col, ConfigProvider, Row } from "antd";
import AuthRouter from "../../routes/AuthRouter";

export default function Auth() {
    return (
      
        <div className="login-container">
          <Row>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#095C42',
                },
              }}
            >
              <AuthRouter />
            </ConfigProvider>
          </Row>
        </div>
    );
  }