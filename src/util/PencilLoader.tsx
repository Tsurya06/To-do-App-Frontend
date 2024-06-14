import { Col, Row, theme } from 'antd';
import './PencilLoader.css';

export default function PencilLoader() {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <div
      style={{
        padding: '1rem 1rem',
        minHeight: 'calc(100vh - 3.5rem - 2rem)',
        background: "#ffffff",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{height: '85vh' }}
      >
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="50px"
            width="50px"
            viewBox="0 0 200 200"
            className="pencil"
          >
            <defs>
              <clipPath id="pencil-eraser">
                <rect height="30" width="30" ry="5" rx="5"></rect>
              </clipPath>
            </defs>
            <circle
              transform="rotate(-113,100,100)"
              strokeLinecap="round"
              strokeDashoffset="439.82"
              strokeDasharray="439.82 439.82"
              strokeWidth="2"
              stroke="gray"
              fill="none"
              r="70"
              className="pencil__stroke"
            ></circle>
            <g transform="translate(100,100)" className="pencil__rotate">
              <g fill="none">
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="402"
                  strokeDasharray="402.12 402.12"
                  strokeWidth="30"
                  // stroke=""
                  r="64"
                  className="pencil__body1"
                ></circle>
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="465"
                  strokeDasharray="464.96 464.96"
                  strokeWidth="10"
                  stroke="gray"
                  r="74"
                  className="pencil__body2"
                ></circle>
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="339"
                  strokeDasharray="339.29 339.29"
                  strokeWidth="10"
                  stroke="black"
                  r="54"
                  className="pencil__body3"
                ></circle>
              </g>
              <g
                transform="rotate(-90) translate(49,0)"
                className="pencil__eraser"
              >
                <g className="pencil__eraser-skew">
                  <rect
                    height="30"
                    width="30"
                    ry="5"
                    rx="5"
                    fill="#7b8f7e"
                  ></rect>
                  <rect
                    clipPath="url(#pencil-eraser)"
                    height="30"
                    width="5"
                    fill="#7b8f7e"
                  ></rect>
                  <rect
                    height="20"
                    width="30"
                    fill="#7b8f7e"
                  ></rect>
                  <rect
                    height="20"
                    width="15"
                    fill="#7b8f7e"
                  ></rect>
                  <rect
                    height="20"
                    width="5"
                    fill="#7b8f7e"
                  ></rect>
                  <rect
                    height="2"
                    width="30"
                    y="6"
                    fill="#7b8f7e"
                  ></rect>
                  <rect
                    height="2"
                    width="30"
                    y="13"
                    fill="#7b8f7e"
                  ></rect>
                </g>
              </g>
              <g
                transform="rotate(-90) translate(49,-30)"
                className="pencil__point"
              >
                <polygon
                  points="15 0,30 30,0 30"
                  fill="black"
                ></polygon>
                <polygon
                  points="15 0,6 30,0 30"
                  fill="black"
                ></polygon>
                <polygon
                  points="15 0,20 10,10 10"
                  fill="black"
                ></polygon>
              </g>
            </g>
          </svg>
        </Col>
      </Row>
    </div>
  );
}
