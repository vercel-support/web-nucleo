import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import { formatCurrency } from '../../common/helpers';

type Props = {
  flat: IFlat;
  className?: string;
};

const StyledAnchor = styled.a`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const Image = styled.div<{ imageUrl: string }>`
  border-top-left-radius: ${(props) => props.theme.borderRadius};
  border-bottom-left-radius: ${(props) => props.theme.borderRadius};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${(props) => props.imageUrl});
  height: 100%;
`;

const InfoContainer = styled.div`
  padding: 12px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.secondary};
`;

const FeaturesSection = styled.div`
  margin-top: 8px;
`;

const FeaturesRow = styled(Row)`
  margin-bottom: -8px !important;
`;

const FeatureInfo = styled.div`
  font-size: 12px;
`;

const MiniFlatCard: React.FC<Props> = ({ flat, className }) => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Link href={`/pisos/${flat.id}`} passHref>
        <StyledAnchor>
          <Row>
            <Col span={8}>
              <Image imageUrl={flat.pictureUrls[0]} />
            </Col>
            <Col span={16}>
              <InfoContainer>
                <Title>{flat.address}</Title>
                <PriceText>
                  {formatCurrency(flat.price, i18n.activeLocale)}
                </PriceText>
                <FeaturesSection>
                  <FeaturesRow gutter={[16, 16]}>
                    <Col xs={12} sm={8}>
                      <FeatureInfo>{`${flat.rooms} ${i18n
                        .t('flat.roomsShort')
                        .toLowerCase()}`}</FeatureInfo>
                    </Col>
                    <Col xs={12} sm={8}>
                      <FeatureInfo>{`${flat.bathrooms} ${i18n
                        .t('flat.bathrooms')
                        .toLowerCase()}`}</FeatureInfo>
                    </Col>
                    <Col xs={12} sm={8}>
                      <FeatureInfo>
                        {flat.sqrMeters} m
                        <sup
                          css={`
                            vertical-align: top;
                            font-size: 0.6em;
                          `}
                        >
                          2
                        </sup>
                      </FeatureInfo>
                    </Col>
                  </FeaturesRow>
                </FeaturesSection>
              </InfoContainer>
            </Col>
          </Row>
        </StyledAnchor>
      </Link>
    </div>
  );
};

export default styled(MiniFlatCard)`
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
`;
