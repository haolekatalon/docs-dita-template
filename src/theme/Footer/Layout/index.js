import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

function FooterLeftView(copyright) {
  const SvgLogo = require('@site/static/img/logo.svg').default;
  return (
    <div className={styles.footerContainerLeft}>
      <button className={styles.logoContainer} style={{ background: 'transparent', border: '0px' }} onClick={() => window.open('https://katalon.com/', '_blank')}>
         {/* <SvgLogo className={styles.logo}/> */}
         <ThemedImage
            className={styles.logo}
            sources={{
              light: useBaseUrl('/img/logo.svg'),
              dark: useBaseUrl('/img/white_logo.svg'),
            }}
          />
         <p className={styles.logoText}>Katalon</p>
      </button>
    </div>
  )
}

export default function FooterLayout({style, links, logo, copyright}) {
  const SvgFacebook = require('@site/static/img/ic_facebook.svg').default;
  const SvgTwitter = require('@site/static/img/ic_twitter.svg').default;
  const SvgLinkedin = require('@site/static/img/ic_in.svg').default;
  const SvgYoutube = require('@site/static/img/ic_youtube.svg').default;

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      }, styles.footerContainer)}>

      {FooterLeftView(copyright)}

      <div className={clsx("container container-fluid", styles.footerContainerRight)}>
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
          </div>
        )}
        <div style={{ height: "1px", width: "100%", backgroundColor: "#E5E5E5" }}/>
        <div className={styles.contentBottom}>
          <div className={styles.contentBottomLeft}>
            <p className={styles.footerCompanyText}>
              1776 Peachtree Street NW, Suite 200N, Atlanta, GA 30309<br/>
              General & Legal inquiries: <a className={styles.linkBussiness} href="mailto:business@katalon.com">business@katalon.com</a><br/>
              License & Purchase inquiries: <a className={styles.linkBussiness} href="mailto:business@katalon.com">business@katalon.com</a><br/>
              Partnership inquiries: <a className={styles.linkBussiness} href="mailto:partner@katalon.com">partner@katalon.com</a><br/>
            </p>
          </div>
          <div className={styles.contentBottomRight}>

            {/* Icon social */}
            <div className={styles.footerSocialView}>
              <a className={styles.footerLinkSocial} href="https://www.facebook.com/KatalonPlatform" target="_blank"><SvgFacebook className={styles.footerSocialFBImg}/></a>
              <a className={styles.footerLinkSocial} href="https://twitter.com/KatalonPlatform" target="_blank"><SvgTwitter className={styles.footerSocialImg}/></a>
              <a className={styles.footerLinkSocial} href="https://www.linkedin.com/company/katalon/" target="_blank"><SvgLinkedin className={styles.footerSocialImg}/></a>
              <a className={styles.footerLinkSocial} href="https://www.youtube.com/c/KatalonStudio/" target="_blank"><SvgYoutube className={styles.footerSocialImg} style={{ marginTop: "8px" }}/></a>
            </div>

            {/* Privacy */}
            <div className={styles.footerContainerPrivacy}>
              <a href="https://katalon.com/terms" target="_blank" style={{ textDecoration: "none" }}><p className={styles.footerTermText}>Terms</p></a>
              <a href="https://katalon.com/terms#privacy-policy" target="_blank" style={{ textDecoration: "none" }}><p className={styles.footerPrivacyText}>Privacy Policy</p></a>
              <a href="https://katalon.com/terms#license-agreement" target="_blank" style={{ textDecoration: "none" }}><p className={styles.footerPrivacyText}>License Agreement</p></a>
              <a href="https://katalon.com/security/" target="_blank" style={{ textDecoration: "none" }}><p className={styles.footerPrivacyText}>Security</p></a>
            </div>
            
            {/* Copy right */}
            {copyright ? (
                  <div
                    className={clsx("footer__copyright", styles.footerCopyRight)}
                  >
                    {copyright}
                  </div>
                ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
