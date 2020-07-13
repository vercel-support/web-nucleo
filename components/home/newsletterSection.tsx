import styled from 'styled-components';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';
import { Form, Input } from 'antd';

const { withTranslation } = i18Next;

type Props = WithTranslation;

const Banner = styled.div`
  height: 40vh;
  min-height: 260px;
  background-image: ${(props) =>
    props.theme.loadOptimizedImage('banner_newsletter.png')};

  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  padding: 14px ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding: 14px ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
`;

const SectionTitle = styled.h2`
  max-width: ${(props) => props.theme.grid.getGridColumns(7, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    max-width: ${(props) => props.theme.grid.getGridColumns(15, 1)};
  }

  text-align: right;

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const StyledForm = styled(Form)`
  & .ant-form-item-label {
    position: absolute;
    opacity: 0;
  }

  width: ${(props) => props.theme.grid.getGridColumns(7, 1)};
  @media ${(props) => props.theme.breakpoints.lg} {
    width: ${(props) => props.theme.grid.getGridColumns(9, 1)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: ${(props) => props.theme.grid.getGridColumns(12, 1)};
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    width: ${(props) => props.theme.grid.getGridColumns(14, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    width: ${(props) => props.theme.grid.getGridColumns(18, 1)};
  }
`;

const Divider = styled.hr`
  width: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: var(--gutter);
  margin-right: 14px;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const NewsletterSection = ({ t }: Props): JSX.Element => {
  const validateMessages = {
    types: {
      email: t('modalForm.validateEmail'),
    },
  };

  return (
    <Banner>
      <SectionTitle>{t('newsletter-title')}</SectionTitle>
      <Divider />
      <StyledForm validateMessages={validateMessages}>
        <Form.Item
          name="email"
          label={t('home.newsletter-input-label')}
          rules={[{ required: false, type: 'email' }]}
        >
          <Input.Search enterButton={t('enviar')} placeholder={t('email')} />
        </Form.Item>
      </StyledForm>
    </Banner>
  );
};
export default withTranslation('common')(NewsletterSection);
