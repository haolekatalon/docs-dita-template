import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';

export default function NotFound() {

  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    const origin = window.location.origin;
    const href = window.location.href;
    if (href.includes('/javadoc/')) {
      window.location.href = href.replace(origin + "/javadoc", 'https://api-docs.katalon.com');
    } else {
      setLoaded(true);
      analytics.track('Page 404');
      setTimeout(function() {
        window.location.href = 'https://docs.katalon.com';
      }, 5000);
    }
  }, []);

  const SvgNotFound = require('@site/static/img/ic_404.svg').default;

  return (
    <>{loaded ? (<>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row" style={{ display: "block", textAlign: "center" }}>
            <h3 className="hero__title" style={{ fontSize: "36px", textAlign: "center", fontWeight: "500", lineHeight: "50px" }}>
              <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page">
                Oops! That page can’t be found.
              </Translate>
            </h3>
            <SvgNotFound />
            <p style={{ fontSize: "24px", textAlign: "center", fontWeight: "400", lineHeight: "30px", marginTop: "30px" }}>
              Redirecting you to the home page...
            </p>
          </div>
        </main>
      </Layout>
    </>) : (<></>)}
    </>
  );
}
