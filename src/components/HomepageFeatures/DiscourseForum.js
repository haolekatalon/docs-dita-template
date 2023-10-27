import React from 'react';
import { useEffect } from 'react';

export default function DiscourseForum() {
  useEffect(() => {
    window.DiscourseEmbed = {
        discourseUrl: 'https://forum.katalon.com/',
        discourseEmbedUrl: 'https://docs.katalon.com/katalon-studio/new/version-8x.html'
    };

    console.log('https://{{ page.url | prepend:site.baseurl | prepend:site.site_domain }}');

    const d = document.createElement('script');
    d.type = 'text/javascript';
    d.async = true;
    d.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
  }, []);

  return (
    <div>
      <div id="discourse-comments"></div>
    </div>
  );
}