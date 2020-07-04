import Flat from '../../backend/salesforce/flat';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Carousel, Tag } from 'antd';

type Props = {
  flat: Flat;
  className?: string;
  theme: DefaultTheme;
};

const FlatImage = styled.img<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-color: red;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  height: 140px;
  width: 100%;
`;

const FlatInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  padding: 8px;
`;

const TopText = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`;

const BottomText = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
`;

const Divider = styled.hr`
  border: 1px solid ${(props) => props.theme.colors.shadow};
  width: 100%;
`;

const StyledTag = styled(Tag)`
  font-weight: 500;
  font-size: 12px;
  line-height: inherit;
  float: right;
`;

const FlatCard = ({ flat, className, theme }: Props): JSX.Element => {
  return (
    <div className={className}>
      <Carousel dots={false} draggable={true}>
        {flat.pictureUrls.map((url) => (
          <FlatImage key={url} url={url} />
        ))}
      </Carousel>
      <FlatInfo>
        <TopText>
          <span>{flat.price}€</span>
          <StyledTag color={theme.colors.secondary}>{flat.zone}</StyledTag>
        </TopText>
        <Divider />
        <BottomText>
          <span
            css={`
              margin-right: 8px;
            `}
          >
            {flat.sqrMeters}m<sup>2</sup>
          </span>
          <span>{flat.rooms} habitaciones</span>
        </BottomText>
      </FlatInfo>
    </div>
  );
};

export default withTheme(styled(FlatCard)<{ width: string; margin: string }>`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 2px 6px;
  }
`);
