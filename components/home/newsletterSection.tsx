import styled from 'styled-components';
import { Form, Input } from 'antd';

import useI18n from '../../common/hooks/useI18n';

type Props = {
  onSubscribeButtonClicked: (email: string) => void;
};

const Banner = styled.div`
  height: 40vh;
  min-height: 260px;

  @media ${(props) => props.theme.breakpoints.lg} {
    min-height: 0;
    height: 260px;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    min-height: 240px;
  }

  @media ${(props) => props.theme.breakpoints.smd} {
    min-height: 0;
    height: 220px;
  }

  background-image: url(${require('../../public/images/tangram_newsletter.png')}),
    url(${require('../../public/images/banner_newsletter.png')});

  background-size: 100% 100%, auto 100%;

  background-position: center center, left center;
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
  max-width: ${(props) => props.theme.grid.getGridColumns(14, 1)};
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
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
    width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    width: ${(props) => props.theme.grid.getGridColumns(12, 1)};
  }
`;

const Divider = styled.hr`
  width: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: var(--gutter);
  margin-right: 14px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
`;

const NewsletterSection = ({
  onSubscribeButtonClicked,
}: Props): JSX.Element => {
  const i18n = useI18n();

  const [form] = Form.useForm();
  const validateMessages = {
    required: i18n.t('contactForm.validateRequired'),
    types: {
      email: i18n.t('contactForm.validateEmail'),
    },
  };

  return (
    <Banner>
      <SectionTitle>{i18n.t('newsletter-title')}</SectionTitle>
      <Divider />
      <StyledForm
        validateMessages={validateMessages}
        form={form}
        onFinish={(values) => onSubscribeButtonClicked(values.email)}
      >
        <Form.Item
          name="email"
          label={i18n.t('home.newsletter-input-label')}
          rules={[{ required: true, type: 'email' }]}
        >
          <Input.Search
            enterButton={i18n.t('enviar')}
            placeholder={i18n.t('email')}
            onClick={() => form.submit()}
          />
        </Form.Item>
      </StyledForm>
    </Banner>
  );
};
export default NewsletterSection;
