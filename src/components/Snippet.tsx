import React from 'react';
import { Hit as AlgoliaHit } from '@algolia/client-search';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

export type HighlightProps<THit> = {
  hit: THit;
  attribute: keyof THit | string[];
  highlightedTagName?: React.ElementType;
  nonHighlightedTagName?: React.ElementType;
  className?: string;
  separator?: string;
};

export function Snippet<THit extends AlgoliaHit<Record<string, unknown>>>({
  hit
}: HighlightProps<THit>) {
  const type = hit.type;

  var textArray;
  if (type === "content") {
    textArray = hit._highlightResult.content.value.split(/__aa-highlight__(.*?)__\/aa-highlight__/g);
  } else {
    textArray = hit._highlightResult.hierarchy[type].value.split(/__aa-highlight__(.*?)__\/aa-highlight__/g);
  }
  const idxDocs = hit.url.indexOf("docs/") != -1 ? hit.url.indexOf("docs/") : hit.url.indexOf("docs#");
  const urlParent = hit.url.slice(idxDocs + 5);
  const idxSplash = urlParent.indexOf("/") != -1 ? urlParent.indexOf("/") : urlParent.length;
  const parentDoc = urlParent.slice(0, idxSplash).split("-").join(" ");

  return textArray != null && (
    <div className={styles.resultLinkContainer}>
      <p className={styles.parentDocText}>{parentDoc}</p>
      <Link
        className={[styles.resultLink]}
        to={hit.url}
        target="_self">
        {textArray.map((item, index) => (
          <span key={index}>
            {index % 2 == 1 ? (
              <span className={styles.highlineText}>{item}</span>
            ): item}
          </span>
        ))}
    </Link>
    </div>
  );
}
