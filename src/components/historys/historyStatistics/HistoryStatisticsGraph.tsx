import React from 'react';
import styled from 'styled-components';

interface HistoryStatisticsProps {
  percentage1: number;
  percentage2: number;
  percentage3: number;
  strokeColor1?: string;
  strokeColor2?: string;
  strokeColor3?: string;
}

interface ArcProps {
  stroke: string;
  strokeWidth: string | number;
  dasharray: string;
  dashoffset: number;
  transform: string;
}

const HistoryStatisticsGraph: React.FC<HistoryStatisticsProps> = ({
  percentage1,
  percentage2,
  percentage3,
  strokeColor1 = '#3277ED',
  strokeColor2 = '#EAFFBA',
  strokeColor3 = '#FFD0D4',
}) => {
  const svgSize = 203;
  const center = svgSize / 2;
  const strokeWidth = 50;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const seg1 = (percentage1 / 100) * circumference;
  const seg2 = (percentage2 / 100) * circumference;
  const seg3 = (percentage3 / 100) * circumference;

  const angle1 = (percentage1 / 100) * 360;
  const angle2 = (percentage2 / 100) * 360;
  const angle3 = (percentage3 / 100) * 360;

  const midAngle1 = -90 + angle1 / 2;
  const midAngle2 = -90 + angle1 + angle2 / 2;
  const midAngle3 = -90 + angle1 + angle2 + angle3 / 2;

  const labelRadius = 30;
  const effectiveLabelRadius = radius + strokeWidth / 2 - (labelRadius - 35);

  const rad1 = midAngle1 * (Math.PI / 180);
  const rad2 = midAngle2 * (Math.PI / 180);
  const rad3 = midAngle3 * (Math.PI / 180);

  const x1 = center + effectiveLabelRadius * Math.cos(rad1);
  const y1 = center + effectiveLabelRadius * Math.sin(rad1);

  const x2 = center + effectiveLabelRadius * Math.cos(rad2);
  const y2 = center + effectiveLabelRadius * Math.sin(rad2);

  const x3 = center + effectiveLabelRadius * Math.cos(rad3);
  const y3 = center + effectiveLabelRadius * Math.sin(rad3);

  const isAllZero = percentage1 === 0 && percentage2 === 0 && percentage3 === 0;
  const isValidPercentage1 = !isNaN(percentage1) && percentage1 >= 0;
  const isValidPercentage2 = !isNaN(percentage2) && percentage2 >= 0;
  const isValidPercentage3 = !isNaN(percentage3) && percentage3 >= 0;

  return (
    <>
      <SVGWrapper>
        <StyledSVG viewBox={`0 0 ${svgSize} ${svgSize}`}>
          <SvgDefs />
          <BackgroundCircle cx={center} cy={center} r={radius} strokeWidth={strokeWidth} zero={isAllZero} />
          {isValidPercentage1 && (
            <Arc
              stroke={strokeColor1}
              strokeWidth={strokeWidth}
              dasharray={`${seg1} ${circumference - seg1}`}
              dashoffset={seg1}
              transform={`rotate(-90 ${center} ${center})`}
              cx={center}
              cy={center}
              r={radius}
            >
              <animate attributeName="stroke-dashoffset" from={seg1} to="0" dur="1s" fill="freeze" />
            </Arc>
          )}

          {isValidPercentage2 && (
            <Arc
              stroke={strokeColor2}
              strokeWidth={strokeWidth}
              dasharray={`${seg2} ${circumference - seg2}`}
              dashoffset={seg2}
              transform={`rotate(${-90 + angle1} ${center} ${center})`}
              cx={center}
              cy={center}
              r={radius}
            >
              <animate attributeName="stroke-dashoffset" from={seg2} to="0" dur="1s" fill="freeze" />
            </Arc>
          )}
          {isValidPercentage3 && (
            <Arc
              stroke={strokeColor3}
              strokeWidth={strokeWidth}
              dasharray={`${seg3} ${circumference - seg3}`}
              dashoffset={seg3}
              transform={`rotate(${-90 + angle1 + angle2} ${center} ${center})`}
              cx={center}
              cy={center}
              r={radius}
            >
              <animate attributeName="stroke-dashoffset" from={seg3} to="0" dur="1s" fill="freeze" />
            </Arc>
          )}
          {isValidPercentage1 && percentage1 > 0 && (
            <g>
              <LabelCircle cx={x1} cy={y1} r={labelRadius} />
              <LabelText x={x1} y={y1}>
                {Math.round(percentage1)}%
              </LabelText>
            </g>
          )}
          {isValidPercentage2 && percentage2 > 0 && (
            <g>
              <LabelCircle cx={x2} cy={y2} r={labelRadius} />
              <LabelText x={x2} y={y2}>
                {Math.round(percentage2)}%
              </LabelText>
            </g>
          )}
          {isValidPercentage3 && percentage3 > 0 && (
            <g>
              <LabelCircle cx={x3} cy={y3} r={labelRadius} />
              <LabelText x={x3} y={y3}>
                {Math.round(percentage3)}%
              </LabelText>
            </g>
          )}
        </StyledSVG>
      </SVGWrapper>
    </>
  );
};

export default HistoryStatisticsGraph;

const SVGWrapper = styled.div`
  display: flex;
`;

const StyledSVG = styled.svg`
  width: 203px;
  height: 203px;
  overflow: visible;
`;

const SvgDefs = () => (
  <defs>
    <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="1" stdDeviation="5" floodColor="rgba(0,0,0,0.1)" />
    </filter>
  </defs>
);

const BackgroundCircle = styled.circle<{ zero?: boolean }>`
  fill: none;
  stroke: ${({ zero }) => (zero ? '#F5F9FF' : '#F5F9FF')};
`;

const Arc = styled.circle.attrs((props: Partial<ArcProps>) => ({
  fill: 'none',
  stroke: props.stroke,
  strokeWidth: props.strokeWidth,
  strokeDasharray: props.dasharray,
  strokeDashoffset: props.dashoffset,
  transform: props.transform,
}))<ArcProps>``;

const LabelCircle = styled.circle`
  fill: #fff;
  filter: url(#dropShadow);
`;

const LabelText = styled.text.attrs(() => ({
  dx: '0.05em',
  dy: '0.4em',
}))`
  text-anchor: middle;
  fill: #212121;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;
