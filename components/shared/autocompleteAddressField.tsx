import React, { useState } from 'react';
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import { Col, Form, Input, AutoComplete } from 'antd';
import useI18n from '../../common/hooks/useI18n';
import styled from 'styled-components';

const InputContainer = styled.div`
  color: ${(props) => props.theme.colors.secondary};
`;

const AutocompleteAddressField = (): JSX.Element => {
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const i18n = useI18n();

  if (selectedAddress) {  
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));  
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value) => {
        setAddress(value);
      }}
      onSelect={(value) => {
        setAddress(value);
        setSelectedAddress(value);
      }}
      searchOptions={{
        componentRestrictions: {
          country: 'es'
        }
      }}
    >
      {({ getInputProps, suggestions }) => {
        const results = suggestions.map((suggestion) => {
          return {
            label: suggestion.description,
            value: suggestion.description,
          };
        });
        return (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <InputContainer>
              <Form.Item
                labelCol={{ span: 24 }}
                name="address"
                label={i18n.t('contactForm.address')}
                rules={[{ required: true }]}
              >
                <AutoComplete options={results}>
                  <Input {...getInputProps()} />
                </AutoComplete>
              </Form.Item>
            </InputContainer>
          </Col>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default AutocompleteAddressField;
