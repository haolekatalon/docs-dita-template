import React from 'react';
import { Hit as AlgoliaHit } from '@algolia/client-search';

import { Snippet } from './Snippet';

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    image: string;
    brand: string;
    categories: string[];
  }>;
};

export function Hit({ hit }: HitProps) {
  
  return (
    <div>
      <Snippet hit={hit} attribute="name" />
    </div>
  );
}
