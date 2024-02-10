import os
from textwrap import dedent
from urllib import parse
from typing import List

url_prefix = 'https://cdn.widcard.win/'

it = os.walk('./manim')

def insert_html_template(html: str):
    return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDN</title>
</head>
{html}
"""

def build_html(dirpath: str, dirnames: str, filenames: List[str]):
    file_full_url_list = []
    dir_full_url_list = []
    breadcrumb = []
    
    this_url = os.path.join(url_prefix, dirpath).replace('\\', '/').replace('/./', '/')
    for dirname in dirnames:
        dir_full_url_list.append(os.path.join(url_prefix, dirpath, dirname).replace('\\', '/').replace('/./', '/'))
    for filename in filenames:
        file_full_url_list.append(os.path.join(url_prefix, dirpath, parse.quote(filename)).replace('\\', '/').replace('/./', '/'))
    html = dedent("""
        <body>
        <h2>{}</h2>
        <ul>{}{}</ul>
        </body>
        """).format(
            this_url,
            '\n'.join([f'<li><a href="{dirurl}">{dirname}/</a></li>' for (dirname, dirurl) in zip(dirnames, dir_full_url_list)]),
            '\n'.join([f'<li><a href="{fileurl}">{filename}</a></li>' for (filename, fileurl) in zip(filenames, file_full_url_list)]),
        )
    with open(os.path.join(dirpath, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(insert_html_template(html))

def walk_one_path(p: str):
    for it in os.walk(p):
        dirpath, dirnames, filenames = it
        filenames.remove('index.html')
        build_html(dirpath, dirnames, filenames)     

def build_root():
    dirs = list(filter(lambda a: not a.startswith('.') and not a == 'node_modules' and not a.startswith('_'), filter(os.path.isdir, os.listdir('./'))))
    build_html('', dirs, [])


if __name__ == '__main__':
    build_root()
    walk_one_path('./manim')
    walk_one_path('./assets')
    walk_one_path('./fonts')


