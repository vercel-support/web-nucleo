import Head from 'next/head';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import { Header, Footer } from '../../components/shared';
import useI18n from '../../common/hooks/useI18n';

const Layout = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 0;

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;

const Content = styled.main`
  flex: auto;
  margin-top: ${(props) => props.theme.headerHeight};
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 0;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const Divider = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 30px;
`;

const CookiesPage = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('cookies.detail.metaTitle')}</title>
        <meta
          name="description"
          content={i18n.t('cookies.detail.metaDescription')}
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {typeof window === 'undefined' && (
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: `
         *, *::before, *::after {
           transition: none!important;
         }
         `,
            }}
          />
        )}
      </Head>
      <Header />

      <Content>
        <Row justify={'center'}>
          <Col xs={22} md={20} lg={16}>
            <Title>{i18n.t('cookies.detail.title')}</Title>
            <Divider />
            <Text>
              Una cookie es un fichero que se descarga en su ordenador al
              acceder a determinadas páginas web. Las cookies permiten a una
              página web, entre otras cosas, almacenar y recuperar información
              sobre los hábitos de navegación de un usuario o de su equipo y,
              dependiendo de la información que contengan y de la forma en que
              se utilice su equipo, pueden servir para reconocerlo.
            </Text>
            <Text>
              No obstante, estos medios sólo obtienen información relacionada
              con el número de páginas visitas, la ciudad a la que está asignada
              la dirección IP desde la que se accede, el número de nuevos
              usuarios, la frecuencia y reincidencia de las visitas, el tiempo
              de visita, el navegador o el operador o tipo de terminal desde el
              que se realiza la visita. En ningún caso se obtienen datos sobre
              el nombre, apellidos o dirección postal desde la que el usuario se
              ha conectado.
            </Text>
            <Text>
              Puede usted permitir, bloquear o eliminar las cookies instaladas
              en su equipo mediante la configuración de las opciones de su
              navegador.
            </Text>
            <Text>
              Le informamos, no obstante, de la posibilidad de que la
              desactivación de alguna cookie impida o dificulte la navegación o
              la prestación de los servicios ofrecidos en esta web.
            </Text>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
};

export default CookiesPage;
