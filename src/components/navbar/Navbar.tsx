import { Button, Col, Popover, Row, Tooltip } from "antd";
import "./Navbar.css";
import {
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../../store/features/auth/authThunk";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const popoverContent = (
    <div>
      <Tooltip title="profile">
        <Button
          icon={<UserOutlined />}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "none",
            marginBottom: "0.5rem", 
          }}
        >
          Profile
        </Button>
      </Tooltip>
      <br />
      <Tooltip title="logout">
        <Button
          onClick={() => {
            dispatch(logoutUserThunk()).then((data) => {
              if (data.payload) {
                navigate("/login");
              }
            });
          }}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "none",
          }}
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </Tooltip>
    </div>
  );
  return (
    <>
      <Row className="navbar-laybout" justify={"center"}>
        <Row justify={"start"} style={{ width: "100%" }}>
          <Col xs={13} style={{ textAlign: "end" }}>
            <img
              src="public/to-do-list-svgrepo-com.svg"
              style={{ height: "36px", width: "100" }}
            />
          </Col>
          <Col xs={11} style={{ textAlign: "end" }}>
            <Popover
              content={popoverContent}
              title="Settings"
              trigger="hover"
              overlayStyle={{ width: 130 }} 
              placement="left"
              >
              <Button
                icon={<SettingOutlined />}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid gray",
                  marginTop: "0.2rem",
                  marginRight: "1rem",
                }}
              />
            </Popover>
          </Col>
        </Row>
      </Row>
    </>
  );
}
