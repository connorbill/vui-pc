<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel='mask-icon' href="">
    <title>VUI</title>
    <style>

    .hljs {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      background: #fff;
    }

    .hljs,
    .hljs-subst {
      color: #000;
    }

    .hljs-string,
    .hljs-meta,
    .hljs-symbol,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-addition {
      color: #756bb1;
    }

    .hljs-comment,
    .hljs-quote {
      color: #636363;
    }

    .hljs-number,
    .hljs-regexp,
    .hljs-literal,
    .hljs-bullet,
    .hljs-link {
      color: #31a354;
    }

    .hljs-deletion,
    .hljs-variable {
      color: #88f;
    }



    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-title,
    .hljs-section,
    .hljs-built_in,
    .hljs-doctag,
    .hljs-type,
    .hljs-tag,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class,
    .hljs-strong {
      color: #3182bd;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-attribute {
      color: #e6550d;
    }
    </style>
  </head>
  <body>
    <script>
      if (!window.Promise) {
        document.write('<script src="//cdn.jsdelivr.net/npm/es6-promise@4.1.1/dist/es6-promise.min.js"><\/script><script>ES6Promise.polyfill()<\/script>')
      }
    </script>
    <div id="app"></div>

    <% if (process.env.NODE_ENV === 'production') { %>
      <script src="//unpkg.com/npm/vue@2.6.10/dist/vue.js"></script>
      <script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
      <script src="//unpkg.com/vue-router@3.0.6/dist/vue-router.js"></script>
      <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.6/build/highlight.min.js"></script>
    <% } %>

  </body>
</html>
