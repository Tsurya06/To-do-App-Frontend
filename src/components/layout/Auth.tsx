import { Col, ConfigProvider, Row } from "antd";
import AuthRouter from "../../routes/AuthRouter";

export default function Auth() {
    return (
      
        <div className="login-container">
          <Row>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: 'white',
                },
              }}
            >
              <AuthRouter />
            </ConfigProvider>
          </Row>
        </div>
    );
  }