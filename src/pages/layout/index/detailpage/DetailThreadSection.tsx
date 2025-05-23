import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import CountUp from 'react-countup';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid, 
  Legend as RechartsLegend, 
  Cell,   
} from 'recharts';
import userApi from 'src/pages/api/userApi';


const GlobalAnimationStyle = createGlobalStyle`
  @keyframes barGrowUp {
    0%{
      transform: scaleY(0.1);
      opacity: 0.4;
    }
    50% {
      transform: scaleY(1);
      opacity: 1;
    }
    100%{
      transform:scaleY((1));
      opacity: 1;
    }
  }

  .bar-animate {
    transform-origin: bottom;
    animation-name: barGrowUp;
    animation-duration: 5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
  }
`;
interface DetailThreadSectionProps {
  active: boolean;
  count?: number;
}
const fadeText = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
`;
const show75 = keyframes`
  from { stroke-dashoffset: 502; }
  to   { stroke-dashoffset: 50.2; }
`;
const show15 = keyframes`
  from { stroke-dashoffset: 502; }
  to   { stroke-dashoffset: 426.7; }
`;
const blink = keyframes`
  0%, 20% { opacity: 1; }
  21%, 100% { opacity: 0; }
`;
const sdb05 = keyframes`
  0% {
    transform: rotate(-45deg) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(-45deg) translate(-20px, 20px);
    opacity: 0;
  }
`;

const Section05 = styled.section.attrs({ id: 'section05' })`
  a {
    padding-top: 70px;
    position: relative;
    display: inline-block;
    left: 50%;

    span {
      position: absolute;
      top: 0;
      width: 24px;
      height: 24px;
      margin-left: -12px;
      border-left: 5px solid #fff;
      border-bottom: 5px solid #fff;
      transform: rotate(-45deg);
      animation: ${sdb05} 1.5s infinite;
      box-sizing: border-box;
    }
  }
`;


const StyledWrapper = styled.div`
  .count{
    font-size: 20px;
  }

  .title{
    font-size: 40px;
    margin-bottom: 20px;
  }
  .box {
    top: 60%;
    left: 50%;
    width: 500px;
    height: 500px;
    border: none;
    border-radius: 50% 50% 50% 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px 50px;
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    cursor: pointer;
    font:
      16px/24px Arial,
      sans-serif;
    transition:
      box-shadow 0.4s ease,
      background-color 0.4s ease,
      color 0.4s ease;
    box-shadow:
      inset 20px 20px 20px rgba(0, 0, 0, 0.1),
      25px 35px 20px rgba(0, 0, 0, 0.1),
      25px 30px 30px rgba(0, 0, 0, 0.1),
      inset -20px -20px 25px rgba(255, 255, 255, 0.8);
    background-color: #a6bbfd;
  }
  .curve-text {
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translateX(50%,-50%);
    pointer-events: none;
    width: 1000px;
    height: 300px;
    overflow: visible;
    transition: opacity 2s ease;
  }

  .box.active::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    top: 90%;
    left: 50%;
    transform: translate(-50%, 0);
    animation: splash 1s forwards;
    animation-iteration-count: infinite;
  }

  .box span {
    color: #fff;
    letter-spacing: 8px;
  }

  .box i {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 500px;
    background-color: #a6bbfd;
    transition:
      5s transform 0.4s linear,
      top 1s linear;
    overflow: hidden;
  }

  .box i:after {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: 35%;
    left: 50%;
    transition: 2s;
    transform: translate(-50%, -75%);
  }

  .box i:after {
    border-radius: 40%;
    background-color: rgb(255, 255, 255);
    animation: animate 5s linear infinite;
  }

  .box.active i:after {
    top: -45%;
    animation: animate 5s linear infinite;
  }
  
  .box.active .curve-text {
    opacity: 0;
    transition: opacity 1s ease;
  }

  .drop-wrapper {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  a.scroll-down {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: inline-block;
    color: #fff;
    font: normal 400 20px/1 'Josefin Sans', sans-serif;
    letter-spacing: .1em;
    text-decoration: none;
    transition: opacity .3s;
  }
  a.scroll-down:hover { opacity: .5; }
  a.scroll-down span {
    position: absolute;
    top: 0; left: 50%;
    width: 24px; height: 24px;
    margin-left: -12px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-45deg);
    box-sizing: border-box;
    animation: ${blink} 1.5s infinite;
  }
  .ai {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    color: #333;
    font-size: 32px;
    font-weight: bold;
  }

  .small-drop {
    position: absolute;
    width: 300px; height: 300px;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;

    svg {
      width: 100%; height: 100%;
      transform: rotate(-90deg);
      overflow: visible;
    }
    circle.inner {
      stroke: #256F8D;
      fill: none;
      stroke-width: 10;
    }
    &.left circle.outer {
      stroke: #F08418;
      fill: none;
      stroke-width: 10;
      stroke-dasharray: 502;
      stroke-dashoffset: 502;
      animation: ${show75} 1s ease forwards;
      animation-delay: 1s;
    }
    &.right circle.outer {
      stroke: #E34747;
      fill: none;
      stroke-width: 10;
      stroke-dasharray: 502;
      stroke-dashoffset: 502;
      animation: ${show15} 1s ease forwards;
      animation-delay: 1s;
    }
text {
  fill: #333;
  font-size: 1.5em;
  text-anchor: middle;
  transform-origin: 100px 100px;
  transform: rotate(90deg);
  opacity: 0;
  animation: ${fadeText} 2s ease-out forwards;
  animation-delay: 1.5s;
}
    &.left text
    &.right text { transform: rotate(90deg) translate(0, 30px); }
    &.in { animation: ${fadeIn} 1s ease-out forwards; }
    &.out { animation: ${fadeOut} 1s ease-out forwards; }
    &.left { top: 20%; left: 10%; transform: translate(-50%, -50%); }
    &.right { top: 20%; right: 10%; transform: translate(50%, -50%); }
  }
  @keyframes animate {
    0% {
      transform: translate(-50%, -75%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }

  /* Bubble */

  @keyframes splash {
    0% {
      transform: translate(-10%, 0) scale(1);
    }
    100% {
      transform: translate(-50%, -30px) scale(1);
      opacity: 0;
    }
  }`;

interface DataSegment {label: string;value: number; color: string }
interface Segment { path: string; color: string; zIndex: number }

const Parent = styled.div`
  width: 100%;
  height: 100%;
  perspective: 1000px;
  margin-top: 50%;

`;

const Card = styled.div`
  width: 400px;
  max-height: 400px;
  border-radius: 20px;
  background: white;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.1),         /* soft lower shadow */
    0 8px 24px rgba(0, 0, 0, 0.15),        /* deeper shadow */
    0 16px 48px rgba(0, 0, 0, 0.1);        /* distant, diffused */

  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.1),
      0 12px 32px rgba(0, 0, 0, 0.2),
      0 20px 60px rgba(0, 0, 0, 0.12);
  }
`;

const Content = styled.div`
  padding: 10px 0;
`;

const Title = styled.span`
  display: block;
  color: #2f7756;
  font-weight: 900;
  font-size: 20px;
`;

const Text = styled.span`
  display: block;
  color: rgba(0, 137, 78, 0.76);
  font-size: 14px;
  margin-top: 8px;
`;

const GraphContainer = styled.div`
  width: 300px;
  height: 300px;            /* ← 차트 높이를 300px로 고정 */
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 800px;
`;

const CircleGraph = styled.div<{ active: boolean }>`
  pointer-events: auto;

  position: relative;
  width: 180px;
  height: 180px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;

  /* active prop 에 따라 초기 상태를 지정 */
  transform: ${({ active }) =>
    active ? 'rotateX(30deg) rotateY(20deg)' : 'none'};

  /* 마우스 올리면 무조건 회전 */
  &:hover {
    transform: rotateX(30deg) rotateY(20deg);
  }
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  position: relative;
  z-index: 10;
`;

const SegmentPath = styled.path`
  transform-origin: center;
  transition: transform 0.5s ease-in-out;
`;

const CenterCircle = styled.circle`
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
`;

const GraphText = styled.text`
  font-size: 8px;
  font-weight: bold;
  fill: #00894d;
`;

 const OverlayCircle = styled.div<{
  size: number;
  offset: number;
  opacity: number;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  top: ${({ offset }) => -offset}px;
  left: ${({ offset }) => -offset}px;
  border-radius: 50%;
  opacity: ${({ opacity }) => opacity};
  background: linear-gradient(
    135deg,
    rgb(0, 255, 214) 0%,
    rgb(8, 226, 96) 100%
  );
  transition: transform 0.5s ease-in-out;

  ${({ size }) => size === 190 && `z-index: 1;`}
  ${({ size }) => size === 210 && `z-index: 0;`}
  ${({ size }) => size === 230 && `z-index: -1;`}

  /* 부모 CircleGraph가 hover 상태일 때만 transform 적용 */
  ${CircleGraph}:hover & {
    transform: translateZ(-30px);
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 60%;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ColorDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const LegendText = styled.span`
  font-size: 12px;
  color: #333;
`;

const ViewMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Chevron = styled.svg`
  fill: none;
  stroke: #00c37b;
  stroke-width: 3px;
  max-height: 15px;
`;

const GraphRow = styled.div`
  display: flex;
  justify-content: space-between;   
  align-items: center;
  width: 100%;
  padding: 0 20px;  
  width: 95%;    
  margin: 0 auto;  
`;
const FillWrapper = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
`;

const Path = styled.path<{ isHovered: boolean }>`
  transform-origin: center;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  transform: ${({ isHovered }) => (isHovered ? 'scale(1.08)' : 'scale(1)')};
  filter: ${({ isHovered }) => (isHovered ? 'brightness(1.1)' : 'none')};
  cursor: pointer;
`;
const DetailThreadSection: React.FC<DetailThreadSectionProps> = ({ active }) => {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [dropState, setDropState] = useState<'hidden' | 'fadingIn' | 'fadingOut'>('hidden');
  const [dots, setDots] = useState('');
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [count, setCount] = useState(0); // 상태값 선언

  useEffect(() => {
    const fetchCount = async () => {
      const result = await userApi.PenaltyCountAll();
      setCount(result);
    };

    fetchCount();
  }, []);

  // 섹션 active 상태에 따른 자동 실행 로직
  useEffect(() => {
    let autoTriggerTimeout: NodeJS.Timeout;

    if (active) {
      // 섹션이 활성화되면 2초 후 애니메이션 시작
      autoTriggerTimeout = setTimeout(() => {
        setIsActive(true);
        setShow(true);
        setDropState('fadingIn');
        setTimeout(() => setChartVisible(true), 500);
      }, 1000);
    } else {
      // 섹션이 비활성화되면 모든 상태 초기화
      setIsActive(false);
      setShow(false);
      setDropState('hidden');
      setChartVisible(false);
      setLeftActive(false);
      setRightActive(false);
      setIsGraphActive(false);
    }

    return () => {
      if (autoTriggerTimeout) {
        clearTimeout(autoTriggerTimeout);
      }
    };
  }, [active]); // active prop이 변경될 때마다 실행

  // 점 애니메이션 사이클
  useEffect(() => {
    let idx = 0;
    const max = 3;
    const interval = setInterval(() => {
      idx = (idx + 1) % (max + 1);
      setDots('.'.repeat(idx));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 버튼 클릭 시 애니메이션 처리 (이제 토글 기능)
  const handleClick = () => {
    setIsActive(!isActive);
    
    if (!isActive) {
      setShow(true);
      setDropState('fadingIn');
      setTimeout(() => setChartVisible(true), 500);
    } else {
      setChartVisible(false);
      setDropState('fadingOut');
      const timeout = setTimeout(() => {
        setShow(false);
        setDropState('hidden');
      }, 500);
      return () => clearTimeout(timeout);
    }
  };
  
  const [isGraphActive, setIsGraphActive] = useState<boolean>(false);

const data: DataSegment[] = [
  { label: '정확도',  value: 89.48, color: '#00f9cb' },
  { label: '정밀도', value: 89.01, color: '#08e260' },
  { label: '재현율',    value: 92.30, color: '#00c37b' },
  { label: 'F1-score',  value: 90.63, color: '#00894d' }
];
const data2: DataSegment[] = [
  { label: '씨X',  value: 40, color: '#00f9cb' },
  { label: '개XX', value: 33, color: '#08e260' },
  { label: '미X',    value: 20, color: '#00c37b' },
  { label: '그외..',  value: 7, color: '#00894d' }
];
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const total2 = data2.reduce((sum, d) => sum + d.value, 0);

let startAngle = 0;
const segments: Segment[] = data.map((d, i) => {
  const pct = d.value / total;
  const end = startAngle + pct * 2 * Math.PI;
  const x1 = Math.cos(startAngle) * 50;
  const y1 = Math.sin(startAngle) * 50;
  const x2 = Math.cos(end) * 50;
  const y2 = Math.sin(end) * 50;
  const largeArc = pct > 0.5 ? 1 : 0;
  const path = `M 0 0 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
  startAngle = end;
  return { path, color: d.color, zIndex: i };
});

const startAngle2 = 0;
const segments2: Segment[] = data2.map((d, i) => {
  const pct = d.value / total2;
  const end = startAngle + pct * 2 * Math.PI;
  const x1 = Math.cos(startAngle) * 50;
  const y1 = Math.sin(startAngle) * 50;
  const x2 = Math.cos(end) * 50;
  const y2 = Math.sin(end) * 50;
  const largeArc = pct > 0.5 ? 1 : 0;
  const path = `M 0 0 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
  startAngle = end;
  return { path, color: d.color, zIndex: i };
});

  return (
    <div>
      <GlobalAnimationStyle />
      <StyledWrapper>
        <div className="ai">Purogo AI 성능
            <Section05>
      <a href="#next">
        <span />
      </a>
        </Section05>
        </div>
        <button
          className={`box ${isActive ? 'active' : ''}`}
          onClick={handleClick}
        >
        <svg className="curve-text" viewBox="0 0 500 100">
            <text>
                탐지중
              <tspan>{dots}</tspan>
            </text>
          </svg>
           <span>
            <h2 className='title'>탐지된 비속어 수</h2>
              {isActive ? (
              <CountUp className='count' end={count} duration={1} />
            ) : (
              <CountUp className='count' start={count} end={0} duration={1} />
            )}
           </span>
          <i />
          <div className="drop drop1" />
          <div className="drop drop2" />
          <div className="drop drop3" />
        </button>
          <div className="drop-wrapper">
         <GraphRow>
      <FillWrapper show={show}>
        <Parent className='left' onClick={() => setLeftActive(prev => !prev)}>
      <Card>
        <Content>
          <Title>성능지표 기반 분석</Title>
          <Text>성능지표 비교</Text>
        </Content>
        <GraphContainer>
          {/* Recharts BarChart */}
          <ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={data}
    margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
    barSize={50}
    barCategoryGap="20%"
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="label"
      interval={0}
      padding={{ left: 20, right: 20 }}
      tick={{ fontSize: 12 }}
      tickMargin={10}
      angle={-30}
      textAnchor="end"
    />
    <YAxis
      domain={[0, 100]}
      ticks={[0, 50, 80, 100]}
      tickFormatter={v => `${v}%`}
      tick={{ fontSize: 12 }}
    />
    <RechartsLegend verticalAlign="top" height={20} />

<Bar dataKey="value" fill='#00c37b' isAnimationActive={false}>
  {data.map((entry, idx) => (
    <Cell
      key={`bar-${idx}`}
      fill={entry.color}
      className="bar-animate"
      style={{
        animationDelay: `${idx * 0.5}s`,
      }}
    />
  ))}
</Bar>
  </BarChart>
          </ResponsiveContainer>
        </GraphContainer>
        <Bottom>
          <Legend>
            {data.map((d, i) => (
              <LegendItem key={i}>
                <ColorDot color={d.color} />
                <LegendText>{d.label}: {d.value}%</LegendText>
              </LegendItem>
            ))}
          </Legend>
          <ViewMore>
            <Chevron xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="m6 9 6 6 6-6" />
            </Chevron>
          </ViewMore>
        </Bottom>
      </Card>
        </Parent>
      </FillWrapper>
       <FillWrapper show = {show}>
<Parent className='right' onClick={() => setRightActive(!isGraphActive)}>
  <Card>
    <Content>
      <Title>오늘 가장 많이 사용한 비속어</Title>
      <Text>Purgo 게시판에서 탐지된 비속어입니다.</Text>
    </Content>
    <GraphContainer>
      <CircleGraph active={isGraphActive}>
        <Svg viewBox="-60 -60 120 120">
          {segments2.map((seg, idx) => (
            <SegmentPath
              key={idx}
              d={seg.path}
              fill={seg.color}
              style={{
                transform: isGraphActive
                  ? `translateZ(${(segments2.length - seg.zIndex) * 10}px)`
                  : 'translateZ(0)',
                transition: `transform 0.5s ease-in-out ${seg.zIndex * 0.1}s`
              }}
            />
          ))}
          <CenterCircle cx="0" cy="0" r="25" fill="white" />
          <GraphText x="0" y="5" textAnchor="middle">Purgo</GraphText>
        </Svg>
        {[{ size:190, off:5, op:0.2 }, { size:210, off:15, op:0.15 }, { size:230, off:25, op:0.1 }].map((c, i) =>
          <OverlayCircle
            key={i}
            size={c.size}
            offset={c.off}
            opacity={c.op}
            style={isGraphActive ? { transform: 'translateZ(-30px)' } : undefined}
          />
        )}
      </CircleGraph>
    </GraphContainer>
    <Bottom>
      <Legend>
        {data2.map((d, i) => (
          <LegendItem key={i}>
            <ColorDot color={d.color} />
            <LegendText>{d.label}: {d.value}%</LegendText>
          </LegendItem>
        ))}
      </Legend>
      <ViewMore>
        <Chevron xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" />
        </Chevron>
      </ViewMore>
    </Bottom>
  </Card>
</Parent>
       </FillWrapper>
         </GraphRow>
        </div>
      </StyledWrapper>
    </div>
    
  );
};

export default DetailThreadSection;