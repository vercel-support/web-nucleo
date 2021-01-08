import Head from 'next/head';
import styled from 'styled-components';
import { Row, Col, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { ICookie } from '../../common/model/cookie.model';
import useI18n from '../../common/hooks/useI18n';
import { Header, Footer } from '../../components/shared';

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
  background-color: #e0e0e0;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const TextHeading = styled.h3`
  font-size: 20px;
  line-height: 40px;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 16px;
    line-height: 32px;
  }
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 28px;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
    line-height: 24px;
  }
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  margin-bottom: 8px;
  padding-left: 40px;
`;

const ListItem = styled.li`
  font-size: 14px;
  line-height: 28px;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
    line-height: 24px;
  }
`;

const CookiesPage = (): JSX.Element => {
  const i18n = useI18n();

  const columns: ColumnsType<ICookie> = [
    {
      key: 'name',
      title: 'Cookie',
      dataIndex: 'name',
    },
    {
      key: 'type',
      title: 'Tipo',
      dataIndex: 'type',
    },
    {
      key: 'responsible',
      title: 'Responsable',
      dataIndex: 'responsible',
    },
    {
      key: 'purpose',
      title: 'Propósito',
      dataIndex: 'purpose',
    },
    {
      key: 'duration',
      title: 'Duración',
      dataIndex: 'duration',
    },
  ];

  const data: ICookie[] = [
    {
      name: '_ga, _gat, _gid',
      type: 'De terceros',
      responsible: 'Google Inc.',
      purpose:
        'Cookies analíticas de Google, sirven para recabar información de visitas del usuario, tiempos de acceso a las webs, número de visitas, etc, con la finalidad de establecer un análisis publicitario personal.',
      duration: 'De 1 a 3 años',
    },
  ];

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('cookies.metaTitle')}</title>
        <meta name="description" content={i18n.t('cookies.metaDescription')} />
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
          <Col xs={20} lg={16}>
            <Title>{i18n.t('cookies.title')}</Title>
            <Divider />
            <Section>
              <Text>
                Esta Política de Cookies es parte integrante del Aviso Legal y
                la Política de Privacidad de www.inmobiliarianucleo.com (en
                adelante, el “Sitio Web”). El acceso y la navegación en el Sitio
                Web, o el uso de los servicios de esta, implican la aceptación
                de los términos y condiciones recogidos en el Aviso Legal y en
                la Política de Privacidad.
              </Text>
              <Text>
                Con el fin de facilitar su navegación por el Sitio Web, 2020
                NÚCLEO, S.L. con domicilio social en C/ Pérez Medina nº 23
                local, con CIF B01780717, le comunica que utiliza Cookies u
                otros archivos de funcionalidad similar (en adelante, las
                “Cookies”).
              </Text>
              <Text>
                A continuación encontrarás información sobre qué son las
                Cookies, qué tipo de Cookies utiliza este Sitio Web, cómo puedes
                desactivar las Cookies en tu navegador o cómo desactivar
                específicamente la instalación de Cookies de terceros y qué
                ocurre en caso de deshabilitarlas.
              </Text>
            </Section>
            <Section>
              <TextHeading>¿Qué son las Cookies?</TextHeading>
              <Text>
                Las Cookies son archivos que contienen pequeñas cantidades de
                información que se descargan en tu navegador cuando visitas una
                página web. Sus funciones pueden ser muy variadas: almacenar sus
                preferencias de navegación, recopilar información estadística,
                permitir ciertas funcionalidades técnicas, almacenar y recuperar
                información sobre los hábitos de navegación o preferencias de un
                usuario o de su equipo hasta el punto, en ocasiones, dependiendo
                de la información que contengan y de la forma en que utilice su
                equipo, de poder reconocerlo. Una Cookie se almacena en un
                ordenador para personalizar y facilitar al máximo la navegación
                del usuario. Las Cookies se asocian únicamente a un usuario y su
                ordenador y no proporcionan referencias que permitan deducir
                datos personales del usuario.
              </Text>
            </Section>
            <Section>
              <TextHeading>Cookies de mejora del rendimiento</TextHeading>
              <Text>
                Las Cookies de mejora de rendimiento son esenciales para que te
                puedas mover por una página web y usar sus funciones. De manera
                general, estas Cookies habilitan las diferentes funciones de la
                página web, hacen que tu navegación sea más segura o aportan
                funcionalidades que son previamente solicitadas por ti. Al ser
                necesarias para el funcionamiento del sitio, estas Cookies por
                defecto estarán activadas y no podrán denegarse.
              </Text>
              <Text>Este Sitio Web utiliza Cookies necesarias para:</Text>
              <UnorderedList>
                <ListItem>
                  garantizar una navegación segura y sin interrupciones por
                  nuestro Sitio Web;
                </ListItem>
                <ListItem>
                  guardar las preferencias del usuario con respecto a la
                  configuración, aceptación o rechazo de las Cookies del sitio.
                </ListItem>
              </UnorderedList>
            </Section>
            <Section>
              <TextHeading>Cookies analíticas</TextHeading>
              <Text>
                Estas Cookies permiten realizar un seguimiento y análisis del
                comportamiento de los usuarios que navegan en el Sitio Web. La
                información recogida mediante este tipo de Cookies se utiliza en
                la medición de la actividad de los sitios web, aplicación o
                plataforma, con el fin de introducir mejoras en función del
                análisis de los datos de uso que hacen los usuarios del
                servicio.
              </Text>
              <br />
              <Table<ICookie>
                columns={columns}
                dataSource={data}
                pagination={false}
              />
            </Section>
            <Section>
              <TextHeading>Gestión y borrado de Cookies</TextHeading>
              <Text>
                Con la herramienta de configuración de Cookies, tiene la
                posibilidad de rechazar o aceptar Cookies que requieran de su
                consentimiento. También puede bloquear y eliminar Cookies
                cambiando la configuración de su navegador. Para administrar las
                Cookies, la mayoría de los navegadores permiten rechazar o
                aceptar todas las Cookies o solo aceptar ciertos tipos de
                Cookies. El proceso para la gestión y eliminación de cookies se
                puede encontrar en la función de ayuda integrada en el
                navegador.
              </Text>
              <Text>
                A continuación, podrá encontrar información sobre cómo gestionar
                el uso de Cookies en función del navegador utilizado:
              </Text>
              <UnorderedList>
                <ListItem>
                  <strong>Firefox</strong>:{' '}
                  <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias">
                    https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias
                  </a>
                </ListItem>
                <ListItem>
                  <strong>Chrome</strong>:{' '}
                  <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=es">
                    https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=es
                  </a>
                </ListItem>
                <ListItem>
                  <strong>Safari</strong>:{' '}
                  <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac">
                    https://support.apple.com/es-es/guide/safari/sfri11471/mac
                  </a>
                </ListItem>
                <ListItem>
                  <strong>Internet Explorer</strong>:{' '}
                  <a href="https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d">
                    https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d
                  </a>
                </ListItem>
                <ListItem>
                  <strong>Microsoft Edge</strong>:{' '}
                  <a href="https://support.microsoft.com/es-es/windows/microsoft-edge-datos-de-exploraci%C3%B3n-y-privacidad-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd">
                    https://support.microsoft.com/es-es/windows/microsoft-edge-datos-de-exploraci%C3%B3n-y-privacidad-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd
                  </a>
                </ListItem>
              </UnorderedList>
            </Section>
            <Section>
              <Text>
                <strong>Actualizado a diciembre de 2020</strong>
              </Text>
            </Section>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
};

export default CookiesPage;
