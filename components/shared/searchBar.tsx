import React, { useState, useRef } from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Input, AutoComplete, Button } from 'antd';

import { ISearchOption } from '../../common/model/searchOption.model';
import { SearchOptionType } from '../../common/model/enums/searchOptionType.enum';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  height: string;
  value: string;
  options: ISearchOption[];
  onValueChange: (value: string) => void;
  onSearch: (query: string) => void;
  onSelect: (option: ISearchOption) => void;
  onFiltersButtonClick?: () => void;
  className?: string;
  hasFilters?: boolean;
  buttonBackgroundColor?: string;
  buttonColor?: string;
  inputPadding?: string;
  theme: DefaultTheme;
};

const StyledAutoComplete = styled(AutoComplete)<{
  height: string;
  buttonBackgroundColor: string;
  buttonColor: string;
  inputPadding: string;
}>`
  .ant-input-affix-wrapper {
    border-color: #d9d9d9;
    &:focus,
    &:hover {
      border-color: #d9d9d9;
      box-shadow: none;
    }
  }

  .ant-input-affix-wrapper-focused {
    box-shadow: none;
  }

  .ant-select-selection-search-input {
    height: ${(props) => props.height};
  }

  .ant-input-group .ant-input-affix-wrapper:not(:last-child) {
    border-top-left-radius: calc(${(props) => props.height} / 2);
    border-bottom-left-radius: calc(${(props) => props.height} / 2);
    padding-left: 11px;
    padding-right: 11px;
    @media ${(props) => props.theme.breakpoints.xs} {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  .ant-input-affix-wrapper > input.ant-input {
    padding-left: ${(props) => props.inputPadding};
    font-size: 15px;
  }

  .ant-input-group-addon:last-child {
    border-top-right-radius: calc(${(props) => props.height} / 2);
    border-bottom-right-radius: calc(${(props) => props.height} / 2);
  }

  .ant-input-search-button {
    height: ${(props) => props.height};
    background-color: white;
    padding: 8px;
    border-color: #d9d9d9;
    border-left-width: 0;
  }

  .ant-input-search-enter-button
    + .ant-input-group-addon
    .ant-input-search-button {
    padding: 0 6px 0 0;
    border-top-right-radius: calc(${(props) => props.height} / 2);
    border-bottom-right-radius: calc(${(props) => props.height} / 2);
  }

  .anticon-search {
    background-color: ${(props) => props.buttonBackgroundColor};
    color: ${(props) => props.buttonColor};

    padding: 10px;
    height: 36px;
    width: 36px;
    border-radius: 24px;
  }
`;

const FiltersSuffix = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.grey};
  padding-left: 11px;
  @media ${(props) => props.theme.breakpoints.xs} {
    padding-left: 8px;
  }
`;

const FiltersButton = styled(Button)`
  @media ${(props) => props.theme.breakpoints.xs} {
    height: 24px;
    padding: 0px 7px;
  }
`;

const FiltersIcon = styled.img`
  height: 16px;
  width: 16px;
  color: ${(props) => props.theme.colors.primary};
`;

const FiltersText = styled.span`
  @media ${(props) => props.theme.breakpoints.xs} {
    display: none !important;
  }
`;

const computeOptionsByType = (searchOptions: ISearchOption[], type: number) => {
  return searchOptions
    .filter((option) => option.type === type)
    .map((option) => renderItem(option.text, option.count));
};

const renderTitle = (title: string) => {
  return <span>{title}</span>;
};

const renderItem = (title: string, count: number) => {
  return {
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>{count}</span>
      </div>
    ),
  };
};

const SearchBar = React.forwardRef<any, Props>(
  (
    {
      height,
      value,
      options,
      onValueChange,
      onSearch,
      onSelect,
      onFiltersButtonClick,
      buttonBackgroundColor,
      buttonColor = 'white',
      inputPadding = '14px',
      className,
      theme,
    },
    ref
  ) => {
    const i18n = useI18n();

    const [open, setOpen] = useState(false);

    const autoCompleteRef =
      (ref as React.MutableRefObject<any>) || useRef(null);

    const citiesOptions = computeOptionsByType(options, SearchOptionType.CITY);
    const zonesOptions = computeOptionsByType(options, SearchOptionType.ZONE);
    const autoCompleteOptions = [];
    if (citiesOptions.length) {
      autoCompleteOptions.push({
        label: renderTitle(i18n.t('search.searchBar.cities')),
        options: citiesOptions,
      });
    }
    if (zonesOptions.length) {
      autoCompleteOptions.push({
        label: renderTitle(i18n.t('search.searchBar.zones')),
        options: zonesOptions,
      });
    }

    return (
      <div className={className}>
        <StyledAutoComplete
          dropdownClassName="search-dropdown"
          buttonBackgroundColor={buttonBackgroundColor || theme.colors.primary}
          buttonColor={buttonColor}
          value={value}
          open={open}
          options={autoCompleteOptions}
          height={height}
          inputPadding={inputPadding}
          style={{ width: '100%' }}
          ref={autoCompleteRef}
          onSearch={(newValue) => {
            setOpen(!!newValue);
            onValueChange(newValue);
          }}
          onSelect={(autoCompleteOption) => {
            const selectedOption = options.find(
              (o) => o.text === autoCompleteOption
            );
            if (selectedOption) {
              onSelect(selectedOption);
            }
            setOpen(false);
            setTimeout(() => {
              if (autoCompleteRef.current) {
                autoCompleteRef.current.blur();
              }
            });
          }}
          onFocus={() => {
            setOpen(!!value);
          }}
          onBlur={() => {
            setOpen(false);
          }}
        >
          <Input.Search
            size="large"
            placeholder={i18n.t('search.searchBar.placeholder')}
            allowClear={true}
            suffix={
              onFiltersButtonClick ? (
                <FiltersSuffix
                  onMouseUp={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (autoCompleteRef.current) {
                      autoCompleteRef.current.blur();
                    }
                    onFiltersButtonClick();
                  }}
                >
                  <FiltersButton
                    type="text"
                    icon={
                      <FiltersIcon
                        className="anticon"
                        src={'/images/filters.svg'}
                      />
                    }
                  >
                    <FiltersText>
                      {i18n.t('search.searchBar.filters')}
                    </FiltersText>
                  </FiltersButton>
                </FiltersSuffix>
              ) : null
            }
            enterButton
            onSearch={(newValue) => {
              setOpen(false);
              onValueChange(newValue);
              onSearch(newValue);
              if (newValue) {
                setTimeout(() => {
                  if (autoCompleteRef.current) {
                    autoCompleteRef.current.blur();
                  }
                });
              }
            }}
          />
        </StyledAutoComplete>
      </div>
    );
  }
);

export default withTheme(SearchBar);
