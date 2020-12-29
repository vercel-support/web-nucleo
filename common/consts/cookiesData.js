export default {
  // if true, shows cookie-consent modal as soon as initialized
  cc_autorun: true,

  // shows cookie-consent modal after 0 milliseconds
  cc_delay: 0,

  // if url is specified, the cookie-consent policy will not be generated
  // and the learn more button will instead be linked to the specified url
  cc_policy_url: null,

  // if set to true, prints all config/info/error messages on console
  cc_enable_verbose: true,

  // set default language (from those defined in cc_languages)
  cc_current_lang: process.browser
    ? document.documentElement.getAttribute('lang') || 'es'
    : 'es',

  // if set to true, sets cookie-consent language to that of the browser in use
  // (if that language is defined in cc_languages)
  cc_auto_language: false,

  // if set to true, autoloads css based on cc_theme_css path [NEW IN VERSION 1.2]
  cc_autoload_css: true,

  // path to cookieconsent.css
  cc_theme_css: 'lib/cookieconsent.css',

  // number of DAYS before cc_cookie expires [NEW IN VERSION 1.2]
  cc_cookie_expiration: 182,

  // if true, erase unused cookies (based on selected preferences inside cookiepolicy modal) [NEW IN VERSION 1.2]
  cc_autoclear_cookies: true,

  // optional callback function to call when the visitor accepts the cookie consent
  cc_accept_callback: function (cookies) {
    // print accepted cookie settings
    if (process.browser) {
      const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;
      const ANALYTICS_ID_SOCIALMEDIA =
        process.env.NEXT_PUBLIC_ANALYTICS_ID_SOCIALMEDIA;

      if (ANALYTICS_ID) {
        window[`ga-disable-${ANALYTICS_ID}`] = true;
      }
      if (ANALYTICS_ID_SOCIALMEDIA) {
        window[`ga-disable-${ANALYTICS_ID_SOCIALMEDIA}`] = true;
      }

      if (
        cookies.status == 'accepted' &&
        cookies.level.includes('analytical_cookies')
      ) {
        if (ANALYTICS_ID || ANALYTICS_ID_SOCIALMEDIA) {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          gtag('js', new Date());
          if (ANALYTICS_ID) {
            window[`ga-disable-${ANALYTICS_ID}`] = false;
            gtag('config', ANALYTICS_ID, {
              page_path: window.location.pathname,
            });
          }
          if (ANALYTICS_ID_SOCIALMEDIA) {
            window[`ga-disable-${ANALYTICS_ID_SOCIALMEDIA}`] = false;
            gtag('config', ANALYTICS_ID_SOCIALMEDIA, {
              page_path: window.location.pathname,
            });
          }
        }
      }
    }
  },

  // define your own cookie-consent and cookie-policy
  // it's up to you to make it gdpr compliant
  cc_languages: [
    {
      lang: 'en',
      modal: {
        cc_title: 'Seleccione sus preferencias de cookies',
        cc_more_text: 'Personalizar cookies',
        cc_accept_text: 'Aceptar cookies',

        cc_title: 'Select your cookie preferences',
        cc_more_text: 'Customize cookies',
        cc_accept_text: 'Accept cookies',
        cc_description:
          'This website uses essential cookies necessary for its functioning and analytical cookies that help improving your browsing experience.',
      },
      policy: {
        ccp_title: 'Cookie Policy',
        ccp_save_text: 'Save preferences',
        ccp_blocks: [
          {
            ccb_title: 'What are cookies',
            ccb_description:
              'Cookies are very small text files that are stored on your computer when you visit a website. We use cookies to assure the basic functionalities of the website and to enhance your online experience. We use two different types of cookies which you can check on the sections below.',
          },
          {
            ccb_title: 'Strictly necessary cookies',
            ccb_description:
              'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
            ccb_switch: {
              value: 'necessary_cookies',
              enabled: true,
              readonly: true,
            },
          },
          {
            ccb_title: 'Analytical cookies',
            ccb_description:
              'We use these cookies to provide statistical information about our website - they are used for performance measurement and improvement.',
            ccb_switch: {
              value: 'analytical_cookies',
              enabled: true,
              readonly: false,
            },
          },
          {
            ccb_title: 'More information',
            ccb_description:
              'For any queries in relation to the policy on cookies and your choices, please go to <a target="_blank" rel="noopener noreferrer" href="https://www.inmobiliarianucleo.com/legal/cookies">https://www.inmobiliarianucleo.com/legal/cookies</a>.',
          },
        ],
      },
    },
    {
      lang: 'es',
      modal: {
        cc_title: 'Seleccione sus preferencias de cookies',
        cc_more_text: 'Personalizar cookies',
        cc_accept_text: 'Aceptar cookies',
        cc_description:
          'Esta página web utiliza cookies necesarias para su funcionamiento, además de cookies analíticas que ayudan a mejorar su experiencia navegando.',
      },
      policy: {
        ccp_title: 'Política de cookies',
        ccp_save_text: 'Guardar preferencias',
        ccp_blocks: [
          {
            ccb_title: 'Qué son las cookies',
            ccb_description:
              'Las cookies son pequeños archivos de texto que se guardan en su ordenador cuando visita una página web. Utilizamos cookies para asegurar las funcionalidades básicas de la página web y para mejorar su experiencia en línea. Utilizamos dos tipos diferentes de cookies que puede comprobar en las secciones siguientes.',
          },
          {
            ccb_title: 'Cookies estrictamente necesarias',
            ccb_description:
              'Estas cookies son esenciales para el correcto funcionamiento de la página web. Sin estas cookies, la página web no funcionaría correctamente.',
            ccb_switch: {
              value: 'necessary_cookies',
              enabled: true,
              readonly: true,
            },
          },
          {
            ccb_title: 'Cookies analíticas',
            ccb_description:
              'Utilizamos estas cookies para obtener información estadística de nuestra página web - se utilizan para medir el rendimiento de la página y mejorarla.',
            ccb_switch: {
              value: 'analytical_cookies',
              enabled: true,
              readonly: false,
            },
          },
          {
            ccb_title: 'Más información',
            ccb_description:
              'Para cualquier duda en relación a la política de cookies, por favor vaya a <a target="_blank" rel="noopener noreferrer" href="https://www.inmobiliarianucleo.com/legal/cookies">https://www.inmobiliarianucleo.com/legal/cookies</a>.',
          },
        ],
      },
    },
  ],
};
