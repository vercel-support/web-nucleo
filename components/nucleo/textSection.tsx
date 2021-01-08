import styled from 'styled-components';

const Divider = styled.hr<{ right: boolean }>`
  width: 44px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};

  margin-top: 14px;
  margin-bottom: 14px;

  margin-left: ${(props) => (props.right ? 'auto' : '2px')};
  margin-right: ${(props) => (props.right ? '2px' : 'auto')};
`;

const Heading = styled.h2<{ right: boolean }>`
  ${(props) => props.theme.font.h2};
  color: ${(props) => props.theme.colors.secondary};

  text-align: ${(props) => (props.right ? 'right' : 'left')};
`;

const TextContent = styled.p<{ right: boolean }>`
  ${(props) => props.theme.font.p1};
  color: ${(props) => props.theme.colors.secondary};
  white-space: pre-wrap;

  text-align: ${(props) => (props.right ? 'right' : 'left')};
`;

type Props = {
  title: string;
  content: string;
  right?: boolean;
  titleStyle?: any;
};

const TextSection = ({
  title,
  content,
  right,
  titleStyle,
}: Props): JSX.Element => {
  return (
    <div>
      <Heading right={!!right} style={titleStyle}>
        {title}
      </Heading>
      <Divider right={!!right} />
      <TextContent
        key={Math.random()}
        right={!!right}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TextSection;
