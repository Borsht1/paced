#!/bin/sh
# Builds index.html (the GitHub Pages website) from paced.html.
# paced.html is written for claude.ai, which adds the page's outer HTML itself,
# so this wraps it in the same outer HTML for regular web hosting.
# Run it after changing paced.html:  sh build-pages.sh
cd "$(dirname "$0")" || exit 1
{
  printf '%s' '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>'
  printf '%s\n' '<script src="firebase-config.js"></script>'
  cat paced.html
  printf '%s\n' '</body></html>'
} > index.html
echo "Built index.html"
