interface TitleWithUnderlineProps {
  text: string;
  underlineWidth?: number;
  textColor?: string;
  underlineColor?: string;
  fontSize?: number;
}

export const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({
  text,
  underlineWidth = 64,
  textColor = "#0B4157",
  underlineColor = "#880002",
  fontSize = 24,
}) => {
  return (
    <div className="relative">
      <svg
        width="574"
        height="46"
        viewBox="0 0 574 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="title"
        style={{ width: "573px", height: "44px" }}
      >
        <text
          fill={textColor}
          xmlSpace="preserve"
          style={{
            whiteSpace: "pre",
            fontFamily: "Poppins",
            fontSize: `${fontSize}px`,
            fontWeight: "bold",
          }}
          letterSpacing="0em"
        >
          <tspan x="1.42188" y="26.4352">
            {text}
          </tspan>
        </text>
        <path
          d={`M1 44.0352H${underlineWidth}`}
          stroke={underlineColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};