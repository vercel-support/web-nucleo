import { useState, useRef } from 'react';
import styled from 'styled-components';
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
};

const StyledAutoComplete = styled(AutoComplete)<{ height: string }>`
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
    padding: 0 8px 0 0;
    border-top-right-radius: calc(${(props) => props.height} / 2);
    border-bottom-right-radius: calc(${(props) => props.height} / 2);
  }

  .anticon-search {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    padding: 10px;
    height: 36px;
    width: 36px;
    border-radius: 24px;
  }
`;

const FiltersSuffix = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.grey};
  padding-left: 8px;
`;

const FiltersIcon = styled.img`
  height: 16px;
  width: 16px;
  color: ${(props) => props.theme.colors.primary};
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

const SearchBar = ({
  height,
  value,
  options,
  onValueChange,
  onSearch,
  onSelect,
  onFiltersButtonClick,
  className,
}: Props): JSX.Element => {
  const i18n = useI18n();

  const [open, setOpen] = useState(false);

  const autoCompleteRef = useRef(null);

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
        value={value}
        open={open}
        options={autoCompleteOptions}
        placeholder={'search.searchBar.placeholder'}
        height={height}
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
          setTimeout(() => autoCompleteRef.current.blur());
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
          allowClear={true}
          suffix={
            onFiltersButtonClick ? (
              <FiltersSuffix
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => {
                  onFiltersButtonClick();
                }}
              >
                <Button
                  type="text"
                  icon={
                    <FiltersIcon
                      className="anticon"
                      src={'/images/filters.svg'}
                    />
                  }
                >
                  {i18n.t('search.searchBar.filters')}
                </Button>
              </FiltersSuffix>
            ) : null
          }
          enterButton
          onSearch={(newValue) => {
            setOpen(false);
            onValueChange(newValue);
            onSearch(newValue);
            if (newValue) {
              setTimeout(() => autoCompleteRef.current.blur());
            }
          }}
        />
      </StyledAutoComplete>
    </div>
  );
};

export default SearchBar;
