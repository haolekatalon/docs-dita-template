import type { SearchClient } from 'algoliasearch/lite';
import type { BaseItem } from '@algolia/autocomplete-core';
import type { AutocompleteOptions } from '@algolia/autocomplete-js';
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import { Snippet } from './Snippet';
import { PoweredBy } from './PoweredBy';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';

import React, {
  createElement,
  ReactElement,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { render } from 'react-dom';

import {
  useSearchBox,
} from 'react-instantsearch-hooks';
import { autocomplete } from '@algolia/autocomplete-js';
import { debounce } from '@algolia/autocomplete-shared';
import { cx } from "../utils";
import '@algolia/autocomplete-theme-classic';
import styles from './styles.module.scss';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  searchClient: SearchClient;
  algoliaInsightsPlugin: any,
  className?: string;
  indexName: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

export function Autocomplete({
  searchClient,
  algoliaInsightsPlugin,
  className,
  indexName,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  const { query, refine: setQuery } = useSearchBox();

  const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'RECENT_SEARCH',
    limit: 5,
    transformSource({ source }) {
      return {
        ...source,
        onSelect({ item }) {
          // Assuming the refine function updates the search page state.
          console.log(item);
          setQuery(item.label);
        },
      };
    },
  });

  const [
    instantSearchUiState,
    setInstantSearchUiState,
  ] = useState<SetInstantSearchUiStateOptions>({ query });
  const debouncedSetInstantSearchUiState = debounce(
    setInstantSearchUiState,
    0
  );

  useEffect(() => {
    if (instantSearchUiState.query !== "") {
      setQuery(instantSearchUiState.query);
    }
  }, [instantSearchUiState]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      classNames: {
        form: cx(styles.formContainer),
        input: cx(styles.inputSearch),
        panel: cx(styles.searchResult),
        item: cx(styles.item),
      },
      container: autocompleteContainer.current,
      // initialState: { query },
      onReset() {
        setInstantSearchUiState({ query: '' });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          debouncedSetInstantSearchUiState({
            query: state.query,
          });
        }
      },
      renderer: {
        createElement,
        Fragment,
      },
      render({ children }, root) {
        const view = ( <div className={styles.searchResult} style={{ height: "25em", paddingBottom: "50px" }}>
          <div className={styles.headerSearch}>
            <p className={styles.titleSearch}>Documentation</p>
            <PoweredBy />
          </div>
          <div style={{ height: "1px", background: "#D9E2EC", marginRight: "26px", marginLeft: "26px" }}/>
          {children}
        </div>)
        render(view as ReactElement, root);
      },
      plugins: [recentSearchesPlugin, algoliaInsightsPlugin],
      getSources({ query }) {
        return [
          {
            sourceId: 'docItems',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: indexName,
                    query,
                    params: {
                      hitsPerPage: 20,
                      clickAnalytics: true,
                    },
                  },
                ],
              });
            },
            getItemInputValue({ item }) {
              return item.query;
            },
            templates: {
              item({ item }) {
                return (
                  <div>
                    <Snippet hit={item} attribute="name" />
                  </div>
                );
              },
              noResults() {
                const view = viewNoResult(query)
                return view;
              },
            },
          }
        ];
      },
    });

    return () => autocompleteInstance.destroy();
  }, []);

  return <div className={className} ref={autocompleteContainer} />;
}

function viewNoResult(query) {
  return (
    <div>
      <svg style={{ margin: 'auto', display: 'flex', marginTop: '2rem' }}width="40" height="40" viewBox="0 0 20 20" fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"></path></svg>
      <p className={styles.noResult}>No results for "<span style={{ fontWeight: '500' }}>{query}</span>"</p>
    </div>
  )
}