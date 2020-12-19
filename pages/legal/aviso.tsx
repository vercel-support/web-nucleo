import Head from 'next/head';
import Link from 'next/link';
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

const AvisoPage = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('legalWarning.metaTitle')}</title>
        <meta
          name="description"
          content={i18n.t('legalWarning.metaDescription')}
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
            <Title>{i18n.t('legalWarning.title')}</Title>
            <Divider />
            <Section>
              <TextHeading>Datos del titular del Sitio Web</TextHeading>
              <Text>
                NUCLEO FRANCHISING, S.L. (en adelante, “Núcleo”) es el titular
                del Sitio Web{' '}
                <Link href="/">
                  <a>www.inmobiliarianucleo.com</a>
                </Link>{' '}
                (en adelante el “Sitio Web”).
              </Text>
            </Section>
            <Section>
              <TextHeading>
                Condiciones generales de utilización del Sitio Web
              </TextHeading>
              <Text>
                Núcleo le informa de que el acceso y utilización del Sitio Web{' '}
                <Link href="/">
                  <a>www.inmobiliarianucleo.com</a>
                </Link>{' '}
                y todas las URLs, subdominios y directorios incluidos bajo el
                mismo, así como los servicios o contenidos que a través de este
                sitio se puedan obtener, están sujetos a los términos recogidos
                y detallados en este Aviso legal, sin perjuicio de que el acceso
                a alguno de dichos servicios o contenidos pueda precisar de la
                aceptación de unas condiciones generales, particulares o
                adicionales.
              </Text>
              <Text>
                Por consiguiente, si las consideraciones detalladas en este
                Aviso legal no son de su conformidad, rogamos que no haga uso de
                este Sitio Web, ya que cualquier utilización que haga de él o de
                los contenidos en él incluidos, implicará la aceptación de los
                términos legales recogidos en el texto de este Aviso legal.
              </Text>
              <Text>
                Núcleo se reserva el derecho a realizar cambios en el Sitio Web
                sin previo aviso, con el objeto de actualizar, corregir,
                modificar, añadir, cancelar o eliminar los contenidos o el
                diseño del mismo. Los servicios y contenidos del Sitio Web son
                susceptibles de actualizarse periódicamente y debido a que la
                actualización de la información no es inmediata, le sugerimos
                que compruebe siempre la vigencia y exactitud de la información,
                servicios y contenidos recogidos aquí.
              </Text>
            </Section>
            <Section>
              <TextHeading>
                Derechos de propiedad intelectual y de propiedad industrial
              </TextHeading>
              <Text>
                Tanto el diseño de este Sitio Web, sus códigos fuente,
                logotipos, imágenes, melodías, marcas y demás signos distintivos
                que aparecen en el mismo, pertenecen a Núcleo o a terceros que
                hayan autorizado su uso y están protegidos por los
                correspondientes derechos de propiedad intelectual o industrial.
              </Text>
              <Text>
                Su utilización, reproducción, distribución, comunicación
                pública, transformación o cualquier otra acción semejante, está
                totalmente prohibida salvo autorización expresa por parte de
                Núcleo.
              </Text>
              <Text>
                En todo caso, Núcleo reconoce los derechos de propiedad
                intelectual e industrial de terceros; por ello, si considera que
                este sitio pudiera estar violando sus derechos, rogamos se ponga
                en contacto con Núcleo cumplimentando el formulario que
                encontrará haciendo click{' '}
                <Link href="/contacto">
                  <a>aquí</a>
                </Link>
                .
              </Text>
            </Section>
            <Section>
              <TextHeading>Links o hiperenlaces</TextHeading>
              <Text>
                Con carácter general se autoriza el enlace de páginas web o de
                direcciones de correo electrónico al Sitio Web, excepción hecha
                de aquellos supuestos en los que, expresamente Núcleo manifieste
                lo contrario. Adicionalmente, y en todo caso para entender
                aplicable esta autorización general, dichos enlaces deberán
                respetar, necesariamente, la siguiente condición: el
                establecimiento del enlace no supondrá, por sí mismo, ningún
                tipo de acuerdo, contrato, patrocinio ni recomendación por parte
                de Núcleo de la página que realiza el enlace.
              </Text>
              <Text>
                No obstante lo anterior, en cualquier momento Núcleo podrá
                retirar la autorización mencionada en el párrafo anterior, sin
                necesidad de alegar causa alguna. En tal caso, la página que
                haya realizado el enlace deberá proceder a su inmediata
                supresión, tan pronto como reciba la notificación de la
                revocación de la autorización por parte de Núcleo.
              </Text>
              <Text>
                Además, en el caso de que el Sitio Web incorpore enlaces a
                sitios de terceros, en ningún caso, esto implicará la existencia
                de relaciones entre Núcleo y el propietario o titular del sitio
                web vinculado o accesible desde este Sitio Web ni implica la
                aprobación de sus contenidos por parte de Núcleo.
              </Text>
            </Section>
            <Section>
              <TextHeading>Frames o marcos</TextHeading>
              <Text>
                Núcleo prohíbe expresamente la realización de “framings” o la
                utilización por parte de terceros de cualesquiera otros
                mecanismos que alteren el diseño, configuración original o
                contenidos web.
              </Text>
            </Section>
            <Section>
              <TextHeading>Política de privacidad</TextHeading>
              <Text>
                La Política de privacidad del Sitio Web es la establecida en el
                siguiente{' '}
                <Link href="/legal/politica-privacidad">
                  <a>enlace</a>
                </Link>
                .
              </Text>
            </Section>
            <Section>
              <TextHeading>Limitación de Responsabilidad</TextHeading>
              <Text>
                Núcleo ha creado el Sitio Web para la promoción de sus
                servicios, pero no puede controlar la utilización del mismo de
                forma distinta a la prevista en el presente Aviso legal; por lo
                tanto, el acceso y uso correcto de la información contenida en
                el Sitio Web son responsabilidad de quien realiza estas
                acciones, no siendo responsable Núcleo por el uso incorrecto,
                ilícito o negligente que del mismo pudiere hacer el usuario.
              </Text>
              <Text>
                Núcleo realiza los máximos esfuerzos para garantizar que la
                navegación a través del Sitio Web se realice en las mejores
                condiciones. No obstante, Núcleo no puede garantizar la
                inexistencia de interferencias, omisiones, interrupciones, virus
                informáticos, averías telefónicas o desconexiones en el
                funcionamiento operativo del sistema electrónico, motivado por
                causas ajenas a Núcleo.
              </Text>
              <Text>
                De igual forma, Núcleo realiza los mejores esfuerzos para que
                los contenidos del Sitio Web estén actualizados, no obstante, no
                garantiza la exactitud, pertinencia o actualidad de los
                contenidos.
              </Text>
            </Section>
            <Section>
              <TextHeading>Ley aplicable y jurisdicción</TextHeading>
              <Text>
                La Ley aplicable en caso de disputa o conflicto de
                interpretación de los términos que conforman este Aviso legal,
                así como cualquier cuestión relacionada con los servicios de la
                presente web, será la española.
              </Text>
              <Text>
                Para la resolución de cualquier conflicto que pueda surgir con
                ocasión de la visita al Sitio Web, Núcleo y el usuario acuerdan
                someterse a los jueces y tribunales de Alicante con renuncia a
                cualquier otro fuero que les pueda ser aplicable.
              </Text>
            </Section>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
};

export default AvisoPage;
