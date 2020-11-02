import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Row, Col, Modal, Form, Slider, Checkbox, Button } from 'antd';

import { IFilter } from '../../common/model/filter.model';
import { FlatType } from '../../common/model/enums/flatType.enum';
import useI18n from '../../common/hooks/useI18n';
import { formatCurrency } from '../../common/helpers';
import { enumToArray } from '../../common/helpers/enum.utils';
import { getFlatTypeLabel } from '../../common/helpers/flatType.utils';

type Props = {
  visible: boolean;
  onOk: (filter: IFilter) => void;
  onCancel: () => void;
};

const modalHeaderHeight = '55px';
const modalFooterHeight = '65px';
const typesDefaultValue = [];
const typesOptions = enumToArray(FlatType, 'string', 'label', 'value');
const priceMin = 30000;
const priceMax = 200000;
const roomsDefaultValue: string[] = [];
const roomsOptions = ['1', '2', '3', '4', '+4'];
const bathroomsDefaultValue: string[] = [];
const bathroomsOptions = ['1', '2', '3', '+3'];

const StyledModal = styled(Modal)`
  .ant-modal-header {
    height: ${modalHeaderHeight};
  }
  .ant-modal-footer {
    height: ${modalFooterHeight};
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: 100vw;
    width: 100vw;
    margin: 0;
    padding: 0;

    .ant-modal-content {
      border-radius: 0;
    }

    .ant-modal-body {
      height: calc(100vh - ${modalHeaderHeight} - ${modalFooterHeight});
      overflow-y: scroll;
    }
  }
`;

const FullWidthCheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
`;

const SliderFormItem = styled(Form.Item)`
  .ant-form-item-control {
    margin-top: 36px;
    padding-left: 36px;
    padding-right: 32px;
  }
`;

const FiltersModal: React.FC<Props> = ({
  visible,
  onOk,
  onCancel,
}): JSX.Element => {
  const router = useRouter();
  const i18n = useI18n();

  const [form] = Form.useForm();

  const computeFormState = () => {
    const rooms = router.query.rooms
      ? Array.isArray(router.query.rooms)
        ? router.query.rooms
        : [router.query.rooms]
      : form.getFieldValue('rooms');
    if (router.query.roomsMin) {
      rooms.push(roomsOptions[roomsOptions.length - 1]);
    }
    const bathrooms = router.query.bathrooms
      ? Array.isArray(router.query.bathrooms)
        ? router.query.bathrooms
        : [router.query.bathrooms]
      : form.getFieldValue('bathrooms');
    if (router.query.bathroomsMin) {
      bathrooms.push(bathroomsOptions[bathroomsOptions.length - 1]);
    }
    const types = router.query.types
      ? Array.isArray(router.query.types)
        ? router.query.types
        : [router.query.types]
      : form.getFieldValue('types');
    return {
      types,
      price: [
        router.query.priceMin
          ? +router.query.priceMin
          : form.getFieldValue('price')[0],
        router.query.priceMax
          ? +router.query.priceMax
          : form.getFieldValue('price')[1],
      ],
      rooms,
      bathrooms,
    };
  };

  const generateFilter = (): IFilter => {
    const filter: IFilter = {};
    if (form.getFieldValue('types')) {
      filter.types = form.getFieldValue('types');
    }
    if (form.getFieldValue('price')) {
      const priceValue: [number, number] = form.getFieldValue('price');
      filter.priceMin = priceValue[0] === priceMin ? undefined : priceValue[0];
      filter.priceMax = priceValue[1] === priceMax ? undefined : priceValue[1];
    }
    if (form.getFieldValue('rooms')) {
      const roomsValue: string[] = form.getFieldValue('rooms');
      filter.rooms = roomsValue.filter((v) => v !== '+4').map((v) => +v);
      filter.rooms = filter.rooms.length === 0 ? undefined : filter.rooms;
      filter.roomsMin =
        roomsValue.filter((v) => v === '+4').length === 0 ? undefined : 5;
    }
    if (form.getFieldValue('bathrooms')) {
      const bathroomsValue: string[] = form.getFieldValue('bathrooms');
      filter.bathrooms = bathroomsValue
        .filter((v) => v !== '+3')
        .map((v) => +v);
      filter.bathrooms =
        filter.bathrooms.length === 0 ? undefined : filter.bathrooms;
      filter.bathroomsMin =
        bathroomsValue.filter((v) => v === '+3').length === 0 ? undefined : 4;
    }
    return filter;
  };

  const clearFilter = (): void => {
    form.resetFields();
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => form.setFieldsValue(computeFormState()));
    }
  }, [visible]);

  return (
    <StyledModal
      title={i18n.t('search.filtersModal.title')}
      visible={visible}
      centered
      footer={
        <Row justify="space-between">
          <Col>
            <Button htmlType="button" type="text" onClick={() => clearFilter()}>
              {i18n.t('search.actions.clearFilters')}
            </Button>
          </Col>
          <Col>
            <Button
              htmlType="button"
              type="primary"
              onClick={() => onOk(generateFilter())}
            >
              {i18n.t('search.actions.applyFilters')}
            </Button>
          </Col>
        </Row>
      }
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="filters"
        initialValues={{
          types: typesDefaultValue,
          price: [priceMin, priceMax],
          rooms: roomsDefaultValue,
          bathrooms: bathroomsDefaultValue,
        }}
      >
        <Form.Item name="types" label={i18n.t('flat.type')}>
          <FullWidthCheckboxGroup>
            <Row>
              {typesOptions
                .map((o) => ({
                  value: o.value,
                  label: i18n.t(getFlatTypeLabel(o.label as string)),
                }))
                .map((o) => (
                  <Col key={o.value} xs={12} sm={8}>
                    <Checkbox value={o.value}>{o.label}</Checkbox>
                  </Col>
                ))}
            </Row>
          </FullWidthCheckboxGroup>
        </Form.Item>
        <SliderFormItem name="price" label={i18n.t('flat.price')}>
          <Slider
            range
            min={priceMin}
            max={priceMax}
            step={10000}
            marks={{
              [priceMin]: formatCurrency(priceMin, i18n.activeLocale),
              [priceMax]: formatCurrency(priceMax, i18n.activeLocale),
            }}
            tooltipVisible={visible}
            tipFormatter={(p) => {
              let tip = formatCurrency(p, i18n.activeLocale);
              if (p === priceMin) {
                tip = `${tip} ${i18n.t('messages.lessThan')}`;
              }
              if (p === priceMax) {
                tip = `${tip} ${i18n.t('messages.greaterThan')}`;
              }
              return tip;
            }}
          />
        </SliderFormItem>
        <Form.Item name="rooms" label={i18n.t('flat.rooms')}>
          <FullWidthCheckboxGroup>
            <Row justify="space-between">
              {roomsOptions.map((o) => (
                <Col key={o} span={4}>
                  <Checkbox value={o}>{o}</Checkbox>
                </Col>
              ))}
            </Row>
          </FullWidthCheckboxGroup>
        </Form.Item>
        <Form.Item name="bathrooms" label={i18n.t('flat.bathrooms')}>
          <FullWidthCheckboxGroup>
            <Row justify="space-between">
              {bathroomsOptions.map((o) => (
                <Col key={o} span={4}>
                  <Checkbox value={o}>{o}</Checkbox>
                </Col>
              ))}
            </Row>
          </FullWidthCheckboxGroup>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default FiltersModal;
