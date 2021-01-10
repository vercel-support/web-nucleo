import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Col, Form, Input, Dropdown, Menu } from 'antd';
import useI18n from '../../common/hooks/useI18n';
import styled from 'styled-components';
import { FormInstance } from 'antd/lib/form/Form';

const InputContainer = styled.div`
  color: ${(props) => props.theme.colors.secondary};
`;

type Props = {
  form: FormInstance;
}

// TODO fix allowing selection with arrow down/up
// TODO add loading indicator??
// TODO fix overflow when text is too long
// TODO start tracking lat/long when storing result (store suggestgion object instead of just address text)
// TODO limitar reultados de españa / alicante
const AutocompleteAddressField = ({ form }: Props): JSX.Element => {
  const [address, setAddress] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const i18n = useI18n();

  form.setFieldsValue({
    address: address
  });

  console.log(selectedSuggestion);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value) => {
        setAddress(value);
      }}
      onSelect={(value, _, suggestion) => {
        setAddress(value);
        setSelectedSuggestion(suggestion);
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        const resultsItems = suggestions.map((suggestion) => (
          <Menu.Item
            key={suggestion.placeId}
            {...getSuggestionItemProps(suggestion)}
          >
            {suggestion.description}
          </Menu.Item>
        ));
        const resultsMenu = resultsItems && resultsItems.length > 0 ? <Menu>{resultsItems}</Menu> : <div></div>;
        return (
          <div>
            <Dropdown overlay={resultsMenu}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <InputContainer>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    name="address"
                    label={i18n.t('contactForm.address')}
                    rules={[{ required: true }]}
                  >
                    <Input {...getInputProps()} />
                  </Form.Item>
                </InputContainer>
              </Col>
            </Dropdown>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default AutocompleteAddressField;
