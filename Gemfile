source "https://rubygems.org"

gem "jekyll", "~> 4.3"

# Pin sass-embedded to a stable line; 1.100.0 crashes when building its
# native extension on Netlify because its Rakefile uses JSON::Fragment
# (added in json 2.8). See Netlify build error 2026-06-01.
# Use an explicit ceiling: `~> 1.78` would still allow 1.100.0 (anything < 2.0).
gem "sass-embedded", ">= 1.78", "< 1.90"

# Ensure a modern json gem is available to the build environment so
# JSON::Fragment is defined when transitive native extensions are compiled.
gem "json", ">= 2.8"

# If you're deploying to Netlify, add these:
group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end
