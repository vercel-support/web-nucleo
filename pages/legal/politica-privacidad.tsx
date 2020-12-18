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
  background-color: #e0e0e0;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const TextHeading = styled.h3`
  font-size: 20px;
  line-height: 40px;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 30px;
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  margin-bottom: 8px;
  padding-left: 40px;
`;

const ListItem = styled.li`
  font-size: 14px;
  line-height: 30px;
`;

const PrivacyPolicyPage = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('privacyPolicy.metaTitle')}</title>
        <meta
          name="description"
          content={i18n.t('privacyPolicy.metaDescription')}
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
            <Title>{i18n.t('privacyPolicy.title')}</Title>
            <Divider />
            <Section>
              <TextHeading>
                ¿Quién es el responsable del tratamiento?
              </TextHeading>
              <Text>
                NUCLEO FRANCHISING, S.L. (en adelante, “Núcleo”) es el
                responsable del tratamiento de los datos de carácter personal de
                los usuarios de este Sitio Web. Para cualquier cuestión relativa
                al tratamiento de sus datos, puede contactar con Núcleo a través
                de la siguiente dirección de correo electrónico
                torrevieja@inmobiliarianucleo.com.
              </Text>
            </Section>
            <Section>
              <TextHeading>
                ¿Con qué finalidad tratamos sus datos personales?
              </TextHeading>
              <Text>
                En Núcleo tratamos los datos personales de los usuarios del
                Sitio Web con la única finalidad de atender las peticiones de
                información, consultas o sugerencias que nos puedan ser a través
                del canal de contacto correspondiente del Sitio Web.
              </Text>
            </Section>
            <Section>
              <TextHeading>¿Cómo obtenemos sus datos personales?</TextHeading>
              <Text>
                Únicamente tratamos los datos que el usuario libremente nos
                facilita. En el caso de que el usuario facilite datos de
                terceros, garantiza haberle informado previamente de lo
                establecido en la presente Política de Privacidad, respondiendo
                personalmente frente a Núcleo de cualquier daño o perjuicio,
                directo o indirecto, que pudiera derivarse del incumplimiento de
                tal obligación.
              </Text>
            </Section>
            <Section>
              <TextHeading>¿Qué datos personales tratamos?</TextHeading>
              <Text>
                A través del Sitio Web de Núcleo únicamente recabamos los datos
                indicados en el formulario de contacto que se corresponden con
                nombre, dirección de correo electrónico y aquellos que pudieran
                estar incluidos en su consulta o comentario.
              </Text>
            </Section>
            <Section>
              <TextHeading>
                ¿Cuál es la legitimación para el tratamiento de sus datos?
              </TextHeading>
              <Text>
                La base jurídica que legitima el tratamiento de los datos
                facilitados por el usuario a través del formulario ubicado en el
                Sitio Web es el consentimiento otorgado en el momento de
                facilitar sus datos y sus peticiones de información, consultas o
                sugerencias, consentimiento que podrá ser revocado en cualquier
                momento.
              </Text>
            </Section>
            <Section>
              <TextHeading>
                ¿Durante cuánto tiempo conservamos sus datos?
              </TextHeading>
              <Text>
                Los datos personales se conservarán durante el plazo necesario
                para dar cumplimiento a su solicitud, y una vez concluidas
                estas, durante el plazo necesario para atender las
                responsabilidades del tratamiento que pudieran ser exigidas a
                Núcleo durante el plazo de prescripción de estas. En cualquiera
                de los casos cuando los datos ya no sean necesarios para las
                finalidades iniciales, o cuando se solicite su supresión, Núcleo
                podrá conservarlos bloqueados para dar cumplimiento a sus
                obligaciones legales o bien se destruirán de forma segura.
              </Text>
            </Section>
            <Section>
              <TextHeading>¿Con quién compartimos sus datos?</TextHeading>
              <Text>
                Núcleo, salvo que en su momento solicite su consentimiento para
                ello, no compartirá los datos personales con terceros. En el
                caso de que exista una obligación legal, Núcleo podrá comunicar
                datos a las fuerzas y cuerpos de seguridad del Estado o juzgados
                y tribunales.
              </Text>
            </Section>
            <Section>
              <TextHeading>
                ¿Cuáles son sus derechos cuando nos facilita sus datos?
              </TextHeading>
              <Text>
                En la medida en que sean aplicables, podrá ejercitar ante Núcleo
                los siguientes derechos:
              </Text>
              <UnorderedList>
                <ListItem>
                  Derecho a solicitar el acceso a los datos personales y conocer
                  por tanto si en Núcleo estamos tratando datos personales que
                  le conciernan o no.
                </ListItem>
                <ListItem>
                  Derecho a solicitar la rectificación de cualquier dato que
                  pudiera ser inexacto.
                </ListItem>
                <ListItem>
                  Derecho a solicitar la supresión de sus datos.
                </ListItem>
                <ListItem>
                  Derecho a solicitar la limitación de tratamiento en
                  determinadas circunstancias.
                </ListItem>
                <ListItem>
                  Derecho a oponerse al tratamiento de sus datos, cuando las
                  circunstancias y motivos relacionados con su situación
                  particular, así lo justifiquen.
                </ListItem>
                <ListItem>Derecho a la portabilidad de los datos.</ListItem>
                <ListItem>
                  Derecho a retirar el consentimiento otorgado para cualquier
                  finalidad basada en el mismo en cualquier momento.
                </ListItem>
              </UnorderedList>
              <Text>
                Los derechos indicados se podrán ejercitar a través de la
                dirección de correo electrónico
                torrevieja@inmobiliarianucleo.com indicando el derecho que
                quiere ejercer o bien dirigiéndose por escrito a NUCLEO
                FRANCHISING, S.L. (dirección C/ Pérez Medina nº 23 local de
                Alicante). En ambos casos deberá identificarse debidamente.
              </Text>
              <Text>
                Por último, le indicamos que tiene derecho a interponer una
                reclamación ante la autoridad de protección de datos que
                corresponda, y que en el caso de España se tratará de la Agencia
                Española de Protección de Datos.
              </Text>
            </Section>
            <Section>
              <TextHeading>¿Qué hacemos para proteger sus datos?</TextHeading>
              <Text>
                Núcleo ha adoptado las medidas técnicas y organizativas
                necesarias para salvaguardar la seguridad y confidencialidad de
                Las políticas para el tratamiento de los datos y medidas de
                seguridad implantadas en Núcleo pretenden evitar la alteración,
                pérdida, tratamiento o uso no autorizado de sus datos de
                carácter personal.
              </Text>
            </Section>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
};

export default PrivacyPolicyPage;
