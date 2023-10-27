import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { isMobile } from 'react-device-detect';
import styles from './styles.module.scss';

function leftView() {
  return (
  <div className={styles.leftView}>
    <div className={styles.centerView}>
      <p className={styles.headerText}>
        A modern, comprehensive<br></br>
        quality management platform
      </p>
      <p className={styles.normalText}>
        Katalon Platform gives users across<br></br>
        organizations, platforms, and environments the<br></br>
        capabilities to more efficiently and confidently<br></br>
        launch high-quality digital experiences.
      </p>
      <button className={styles.learnMore} onClick={() => window.location.href = 'http://docs.katalon.com/docs'}>
        Learn more
      </button>
    </div>
  </div>);
}

function rightView() {
  const SvgProduct = require('@site/static/img/product.svg').default;
  return (<div className={styles.rightView}>
      <SvgProduct/>
    </div>);
}

function renderMainView() {
  if (isMobile) {
    return (
    <div className={clsx("container", styles.container)}>
        {rightView()}
        {leftView()}
      </div>
    );
  }
  return (<div className={clsx("container", styles.container)}>
      {leftView()}
      {rightView()}
    </div>);
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
     {renderMainView()}
    </section>
  );
}
