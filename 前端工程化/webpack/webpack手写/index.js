import fs from'fs';
import parser from '@babel/parser'
import tarverse from '@babel/traverse'
import path from 'path'
import ejs from 'ejs'
import { transformFromAst } from 'babel-core'
//  1.获取文件内容和依赖关系
let id = 0
function createAsset(filePath) {
    // 1. 获取文件内容
    const source = fs.readFileSync(filePath, {
        encoding: 'utf-8'
    })
    // console.log(source);

    // 2. 转换为 ast 获取依赖关系
    const ast =  parser.parse(source, {
        sourceType: 'module'
    })
    // console.log(ast);
    const deps = []
    tarverse.default(ast, {
        ImportDeclaration({ node }) {
            // console.log('-------------------');
            // console.log(node.source);
            deps.push(node.source.value)
        }
    })
    const { code } = transformFromAst(ast, null, {
        presets: ['env']
    })
    // console.log(code);
    return {
        filePath, 
        code,
        deps,
        id: id++,
        mapping: {}
    }
}

// const asset = createAsset()
// console.log(asset); 

// 2. 由依赖关系创建图对象
function createGrap() {
    const mainAsset = createAsset('./src/main.js')

    const queue = [mainAsset]

    for(const asset of queue) {
        asset.deps.forEach((relativePath) => {
            const child = createAsset(path.resolve('./src', relativePath))
            asset.mapping[relativePath] = child.id
            queue.push(child)
        })
    }
    return queue
}

const grap = createGrap()
// console.log(grap)
// 3.构建bundle.js
function build(graph) {
    const template = fs.readFileSync('./bundle.ejs', { encoding: 'utf-8' })
    const data = graph.map((asset) => {
        return {
            id: asset.id,
            code: asset.code,
            mapping: asset.mapping
        }
    })
    const code = ejs.render(template, {
        data
    })
    console.log(data);
    fs.writeFileSync('./dist/bundle.js', code)
}

build(grap)