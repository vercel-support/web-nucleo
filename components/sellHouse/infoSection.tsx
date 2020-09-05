import styled from 'styled-components';
import { Row, Col } from 'antd';

type Props = {
  imageUrl: string;
  left: boolean;
  title: string;
  subtitle: string;
  description: string;
};

const Background = styled.div<{ imageUrl: string; left: boolean }>`
  background-image: ${(props) =>
    props.theme.loadOptimizedImage(props.imageUrl)};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: ${(props) => `center ${props.left ? 'right' : 'left'}`};
  @media ${(props) => props.theme.breakpoints.smd} {
    background-size: cover;
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;

const Content = styled.div<{ left: boolean }>`
  min-height: calc((((100vw / 4) - 32px) * 3) * 0.6622);
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  text-align: ${(props) => (props.left ? 'left' : 'right')};
  @media ${(props) => props.theme.breakpoints.smd} {
    min-height: unset;
    text-align: left;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: #ffffff;
    opacity: 0.9;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
    padding: 40px;
  }
`;

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
`;

const Divider = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
`;

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 22px;
  @media ${(props) => props.theme.breakpoints.smd} {
    font-size: 18px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  margin-top: 24px;
  @media ${(props) => props.theme.breakpoints.smd} {
    font-size: 16px;
    line-height: 20px;
  }
`;

const InfoSection = ({
  imageUrl,
  left,
  title,
  subtitle,
  description,
}: Props): JSX.Element => {
  return (
    <Background imageUrl={imageUrl} left={left}>
      <Content left={left}>
        <Row justify={left ? 'start' : 'end'}>
          <Col xs={24} md={12}>
            <Title>{title}</Title>
            <Divider />
            <Row justify={left ? 'start' : 'end'}>
              <Col xs={24} xxl={16}>
                <Subtitle>{subtitle}</Subtitle>
                <Description
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Background>
  );
};

export default InfoSection;
