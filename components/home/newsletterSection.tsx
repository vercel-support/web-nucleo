import styled from 'styled-components';
import { Form, Input } from 'antd';

import useI18n from '../../common/hooks/useI18n';

type Props = {
  onSubscribeButtonClicked: (email: string) => void;
};

const Banner = styled.div`
  height: 40vh;
  min-height: 260px;

  background-image: url(${require('../../public/images/tangram_newsletter.png')}),
    url(${require('../../public/images/banner_newsletter.png')});
  background-size: 100% 100%, auto 100%;
  background-position: center center, left center;
  background-repeat: no-repeat;

  @media ${(props) => props.theme.breakpoints.lg} {
    min-height: 0;
    height: 260px;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    min-height: 240px;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    min-height: 0;
    background-image: url(${require('../../public/images/banner_newsletter.png')});
    background-size: auto 100%;
    background-position: left center;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  padding: 14px ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding: 14px ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  @media ${(props) => props.theme.breakpoints.xs} {
    background-color: rgba(242, 242, 242, 0.8);
    border-radius: 25px;
    padding: 30px;
    box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.15);
  }
`;

const SectionTitle = styled.h2`
  max-width: ${(props) => props.theme.grid.getGridColumns(14, 1)};
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    width: 100%;
  }

  text-align: right;

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const StyledForm = styled(Form)`
  width: ${(props) => props.theme.grid.getGridColumns(7, 1)};
  @media ${(props) => props.theme.breakpoints.lg} {
    width: ${(props) => props.theme.grid.getGridColumns(9, 1)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    width: 100%;
  }
  & > .ant-form-item {
    margin-bottom: 0px;
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
  border-radius: ${(props) => props.theme.borderRadius};
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
      <Container>
        <SectionTitle>{i18n.t('home.newsletter-title')}</SectionTitle>
        <Divider />
        <StyledForm
          validateMessages={validateMessages}
          form={form}
          onFinish={(values) => onSubscribeButtonClicked(values.email)}
        >
          <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
            <Input.Search
              enterButton={i18n.t('home.enviar')}
              placeholder={i18n.t('home.email')}
              onClick={() => form.submit()}
            />
          </Form.Item>
        </StyledForm>
      </Container>
    </Banner>
  );
};

export default NewsletterSection;
