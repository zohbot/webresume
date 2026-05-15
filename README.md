# Zohbot Web Resume

A clean-room, static web resume for `zohbot.net`. It is intentionally small: no framework, no borrowed template dependency, and no build step required.

## Edit Your Resume

Update the content in `src/resume-data.js`. The page renders from that file, so your name, links, roles, projects, education, and skills are all in one place.

## Preview Locally

Open `index.html` directly in a browser, or run a tiny local server from this folder:

```powershell
python -m http.server 5173
```

Then visit `http://127.0.0.1:5173`.

## Publish To zohbot.net

This repo includes `CNAME` with:

```text
zohbot.net
```

For GitHub Pages, push this folder to your own repository, enable Pages for the main branch, and point the `zohbot.net` DNS records at GitHub Pages.

## PDF

Use the print button in the upper-right corner, then choose "Save as PDF". The stylesheet includes print-specific rules for a resume-friendly PDF.

## Asset Credit

The animated character uses Kenney's platformer character sprite sheet, available under Creative Commons CC0 / public domain dedication via Wikimedia Commons:

https://commons.wikimedia.org/wiki/File:Kenney.nl_platformer_characters_-_soldier_vector.svg
