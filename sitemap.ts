import fs from 'fs'
import fg from 'fast-glob'

const MEDIA_SUFFIX = [
    // pictures
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.webp',
    '.svg',
    // videos
    '.mp4',
    '.webm',
    // audios
    '.mp3',
    '.acc',
]

async function getAllMedia() {
    const fileList = await fg(MEDIA_SUFFIX.map(s => `./**/*${s}`), { ignore: ['node_modules/**', ] })
    return fileList
}

interface FileTree {
    name: string
    children: FileTree[]
}

function generatePaths(fileList: string[]) {
    const tree: FileTree = { name: '.', children: [] }
    fileList.forEach((path) => {
        const subpaths = path.split('/')
        let current = tree
        for (let i = 0; i < subpaths.length; i++) {
            const found = current.children.find(it => it.name === subpaths[i])
            if (found) {
                current = found
            } else {
                current.children.push({ name: subpaths[i], children: [] })
                current = current.children[current.children.length - 1]
            }
        }
    })
    return tree
}

const stack: string[] = []
let html = ''

function treeToHtml(tree: FileTree) {
    if (tree.children.length === 0) {
        html += `<li><a href="${stack.join('/') + '/' + tree.name}">${tree.name}</a></li>`
        return
    }

    html += `<ul>\n`

    for (const c of tree.children) {
        if (c.children.length >= 1) {
            html += `<li>${c.name}</li>`
        }
        stack.push(tree.name)
        treeToHtml(c)
        stack.pop()
    }

    html += '</ul>\n'
}

const fileList = await getAllMedia()
const tree = generatePaths(fileList)
treeToHtml(tree)

html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDN</title>
</head>

<body>
<h1>CDN</h1>
${html}
</body>

</html>`

fs.writeFile('index.html', html, (err) => {
    if (err)
        console.log(err)
    else
        console.log('OK')
})
