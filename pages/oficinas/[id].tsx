import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import { IOffice } from '../../common/model/office.model';
import { IFlat } from '../../common/model/flat.model';
import { OfficeDetailTab } from '../../common/model/enums/officeDetailTab.enum';
import useI18n from '../../common/hooks/useI18n';
import { deserializeMultiple } from '../../common/helpers/serialization';
import { getKeyByValue } from '../../common/helpers/enum.utils';
import { getOffices } from '../../backend/offices';
import Flat from '../../backend/salesforce/flat';
import {
  Title,
  TabSelector,
  InformationSection,
  DescriptionSection,
  TeamSection,
  OfficeFlats,
} from '../../components/officeDetail';
import { Header, Footer } from '../../components/shared';

interface StaticProps {
  office: IOffice;
  serializedFlats: string;
}

type Props = StaticProps;

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
  position: relative;
  flex: auto;
  margin-top: ${(props) => props.theme.headerHeight};
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 0;
  }
`;

const SelectedTabBodySection = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xs} {
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;

const OfficeDetailPage: React.FC<Props> = ({ office, serializedFlats }) => {
  const i18n = useI18n();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const informationTabTitle = i18n.t(
    `enums.officeDetailTab.${getKeyByValue(
      OfficeDetailTab,
      OfficeDetailTab.INFORMATION
    )}`
  );
  const descriptionTabTitle = i18n.t(
    `enums.officeDetailTab.${getKeyByValue(
      OfficeDetailTab,
      OfficeDetailTab.DESCRIPTION
    )}`
  );
  const teamTabTitle = i18n.t(
    `enums.officeDetailTab.${getKeyByValue(
      OfficeDetailTab,
      OfficeDetailTab.TEAM
    )}`
  );
  const tabs = [informationTabTitle];
  if (office.description) {
    tabs.push(descriptionTabTitle);
  }
  if (office.employees.length) {
    tabs.push(teamTabTitle);
  }

  const flats = deserializeMultiple<IFlat>(serializedFlats);

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {i18n.t('officeDetail.metaTitle', {
            name: office.name,
          })}
        </title>
        <meta
          name="description"
          content={i18n.t('officeDetail.metaDescription', {
            name: office.name,
          })}
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
        <Title text={office.name} />
        <TabSelector
          tabs={tabs}
          selectedTabIndex={selectedTabIndex}
          setSelectedTabIndex={setSelectedTabIndex}
        />
        <SelectedTabBodySection>
          {tabs[selectedTabIndex] === informationTabTitle && (
            <InformationSection office={office} />
          )}
          {tabs[selectedTabIndex] === descriptionTabTitle && (
            <DescriptionSection office={office} />
          )}
          {tabs[selectedTabIndex] === teamTabTitle && (
            <TeamSection office={office} />
          )}
        </SelectedTabBodySection>
        <OfficeFlats flats={flats} />
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const offices = getOffices();

  const paths = offices.map((office) => ({
    params: { id: office.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const offices = getOffices();
  const office = offices.find((o) => o.id === params.id);

  const flats = await Flat.getFlats();
  const serializedFlats = Flat.serialize(flats);

  return {
    props: {
      office,
      serializedFlats,
    },
  };
};

export default OfficeDetailPage;
