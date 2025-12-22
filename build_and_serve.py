#!/usr/bin/env python3
"""
Simple static site builder to view the website locally without Jekyll.
Processes Jekyll templates manually so you can view the site.
"""

import os
import re
from pathlib import Path

# Base directory - use the script's directory as base
BASE_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = BASE_DIR / '_site'

# Read include files
def read_include(name, frontmatter=None):
    """Read an include file and process basic Liquid tags."""
    include_path = BASE_DIR / '_includes' / name
    if not include_path.exists():
        return ''
    
    content = include_path.read_text(encoding='utf-8')
    
    # Replace site.baseurl with empty string for local viewing
    content = content.replace('{{ site.baseurl }}', '')
    
    # Process page title and description if frontmatter provided
    if frontmatter:
        title = frontmatter.get('title', '')
        description = frontmatter.get('description', '')
        use_typed = frontmatter.get('use_typed', '').lower() in ['true', 'yes']
        
        # Handle {% if page.title %}...{% endif %} conditionals
        if title:
            content = re.sub(r'{% if page\.title %}(.*?){% endif %}', r'\1', content, flags=re.DOTALL)
            content = content.replace('{{ page.title }}', title)
        else:
            content = re.sub(r'{% if page\.title %}.*?{% endif %}', '', content, flags=re.DOTALL)
        
        # Handle {% if page.description %}...{% else %}...{% endif %}
        if description:
            content = re.sub(r'{% if page\.description %}(.*?){% else %}.*?{% endif %}', r'\1', content, flags=re.DOTALL)
            content = content.replace('{{ page.description }}', description)
        else:
            content = re.sub(r'{% if page\.description %}.*?{% else %}(.*?){% endif %}', r'\1', content, flags=re.DOTALL)
        
        # Handle Typed.js conditional
        if use_typed:
            # Remove only the liquid tags, keeping everything between them
            # Use non-greedy match and replace with captured group
            content = re.sub(r'{% if page\.use_typed %}\n', '', content)
            content = re.sub(r'\n[ ]*{% endif %}', '', content)
        else:
            # Remove the entire Typed.js section including the script
            content = re.sub(r'{% if page\.use_typed %}.*?{% endif %}', '', content, flags=re.DOTALL)
        
        content = content.replace('{{ site.description }}', 'Graduate student in Mathematical Sciences')
        content = content.replace('{{ site.url }}', '')
        content = content.replace('{{ page.url }}', '/')
    
    return content

def read_layout(name):
    """Read a layout file."""
    layout_path = BASE_DIR / '_layouts' / f'{name}.html'
    if not layout_path.exists():
        return None
    return layout_path.read_text(encoding='utf-8')

def process_page(file_path):
    """Process a Jekyll page and return HTML."""
    content = file_path.read_text(encoding='utf-8')
    
    # Extract frontmatter
    frontmatter = {}
    page_content = content
    
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter_text = parts[1]
            page_content = parts[2].strip()
            
            # Parse frontmatter
            for line in frontmatter_text.strip().split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    frontmatter[key.strip()] = value.strip()
    
    # Check if this is a home layout page
    layout_name = frontmatter.get('layout', 'default')
    
    # If layout is 'home', we need to get the parent layout and merge frontmatter
    if layout_name == 'home':
        home_layout_path = BASE_DIR / '_layouts' / 'home.html'
        if home_layout_path.exists():
            home_layout = home_layout_path.read_text(encoding='utf-8')
            # Extract frontmatter from home layout
            if home_layout.startswith('---'):
                parts = home_layout.split('---', 2)
                if len(parts) >= 3:
                    home_frontmatter_text = parts[1]
                    home_content = parts[2].strip()  # This is the content WITHOUT frontmatter
                    # Parse home layout frontmatter
                    for line in home_frontmatter_text.strip().split('\n'):
                        if ':' in line:
                            key, value = line.split(':', 1)
                            # Add use_typed to page frontmatter
                            frontmatter[key.strip()] = value.strip()
                    # The home layout content wraps our page content
                    page_content = home_content.replace('{{ content }}', page_content)
                    # Update layout_name from home layout's frontmatter
                    layout_name = 'default'  # home layout uses default
    
    layout = read_layout(layout_name)
    
    if not layout:
        return page_content
    
    # Process includes in layout with frontmatter
    layout = layout.replace('{% include nav.html %}', read_include('nav.html', frontmatter))
    layout = layout.replace('{% include head.html %}', read_include('head.html', frontmatter))
    layout = layout.replace('{% include footer.html %}', read_include('footer.html', frontmatter))
    
    # Replace page variables
    layout = layout.replace('{{ page.title }}', frontmatter.get('title', 'Olusola Timothy Ogundepo'))
    layout = layout.replace('{{ page.description }}', frontmatter.get('description', ''))
    layout = layout.replace('{{ site.baseurl }}', '')
    layout = layout.replace('{{ site.title }}', 'Olusola Timothy Ogundepo')
    layout = layout.replace('{{ site.time | date: \'%Y\' }}', '2025')
    
    # Handle active nav states based on page title
    page_title = frontmatter.get('title', '')
    
    # Replace conditional active classes with actual class if title matches
    layout = re.sub(
        r'\{% if page\.title == \'Home\' or page\.url == \'/\' %\}class="active"\{% endif %\}',
        'class="active"' if page_title == 'Home' else '',
        layout
    )
    layout = re.sub(
        r'\{% if page\.title == \'About\' %\}class="active"\{% endif %\}',
        'class="active"' if page_title == 'About' else '',
        layout
    )
    layout = re.sub(
        r'\{% if page\.title == \'News & Updates\' or page\.title == \'News\' %\}class="active"\{% endif %\}',
        'class="active"' if page_title in ['News & Updates', 'News'] else '',
        layout
    )
    layout = re.sub(
        r'\{% if page\.title == \'Skills\' %\}class="active"\{% endif %\}',
        'class="active"' if page_title == 'Skills' else '',
        layout
    )
    layout = re.sub(
        r'\{% if page\.title == \'Projects\' %\}class="active"\{% endif %\}',
        'class="active"' if page_title == 'Projects' else '',
        layout
    )
    layout = re.sub(
        r'\{% if page\.title == \'CV\' %\}class="active"\{% endif %\}',
        'class="active"' if page_title == 'CV' else '',
        layout
    )
    layout = re.sub(
        r'\{% if page\.title == \'Contact\' %\}class="active"\{% endif %\}',
        'class="active"' if page_title == 'Contact' else '',
        layout
    )
    
    # Insert content
    layout = layout.replace('{{ content }}', page_content)
    
    return layout

def build_site():
    """Build the entire site."""
    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)
    
    # Copy assets FIRST before processing pages
    import shutil
    assets_src = BASE_DIR / 'assets'
    assets_dst = OUTPUT_DIR / 'assets'
    
    if assets_src.exists():
        if assets_dst.exists():
            shutil.rmtree(assets_dst)
        shutil.copytree(assets_src, assets_dst)
        print('Copied assets/')
    
    # Process all HTML files
    html_files = [
        'index.html',
        'about/index.html',
        'skills/index.html',
        'projects/index.html',
        'news/index.html',
        'contact/index.html',
        'assets/cv/index.html',
        '404.html'
    ]
    
    for html_file in html_files:
        source = BASE_DIR / html_file
        if not source.exists():
            continue
        
        print(f'Processing {html_file}...')
        
        # Process the page
        output_html = process_page(source)
        
        # Write to output directory
        output_path = OUTPUT_DIR / html_file
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(output_html, encoding='utf-8')
    
    print(f'\n✅ Site built in {OUTPUT_DIR}')

if __name__ == '__main__':
    import sys
    
    build_site()
    
    # Check if build-only mode
    if '--build-only' in sys.argv:
        print('\nBuild complete. Exiting (build-only mode).')
        sys.exit(0)
    
    # Start HTTP server for local development
    print(f'\nStarting server at http://localhost:8080')
    os.chdir(OUTPUT_DIR)
    import http.server
    import socketserver
    
    PORT = 8080
    Handler = http.server.SimpleHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop")
        httpd.serve_forever()
