#!/usr/bin/env node
'use strict';
(() => {
    const { prompts, replaceTags, typescript, javascript } = require('./constants');
    const { logger } = require('./config');
    const inquirer = require('inquirer');
    const makeDir = require('make-dir');
    const filenamify = require('filenamify');
    const fs = require('fs');

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Provide name of new component',
                default: 'MyNewComponent',
            },
            {
                type: 'input',
                name: 'path',
                message: 'Provide path to create new component',
                default: prompts.path,
            },
            {
                type: 'list',
                name: 'language',
                message: 'Choose language of component',
                default: 1,
                choices: [prompts.javascript, prompts.typescript],
            },
            {
                type: 'list',
                name: 'styles',
                message: 'Choose type of styles file',
                choices: [prompts.none, 'css', 'sass', 'less', 'scss', 'module.scss'],
                default: 5,
            },
            {
                type: 'confirm',
                name: 'ok',
                message: 'Everything ok',
            },
        ])
        .then(init);

    const createDir = async path => {
        const createdPath = await makeDir(path);
        logger.info('The folder was created successfully, path: ' + createdPath);
    };

    const getFileName = fileName => {
        return filenamify(fileName)
            .split(' ')
            .map(str => str.capitalize())
            .join('');
    };

    const getExtensionOfFile = extention => {
        let ext = 'txt';
        switch (extention) {
            case prompts.javascript:
                ext = 'js';
                break;
            case prompts.typescript:
                ext = 'ts';
                break;
            default:
                break;
        }
        return ext;
    };

    const getCorrectContent = (language, name) => {
        const template = require(`./templates/${language}`);

        if (language === prompts.typescript) {
            const { start, end, props: replaceProps, state: replaceState } = replaceTags;
            const { componentName, props, state } = typescript;

            let { component, interfaces, index } = template;
            component = component.replaceAll(`${start}${componentName}${end}`, name);
            component = component.replaceAll(`${start}${props}${end}`, `${name}${replaceProps}`);
            component = component.replaceAll(`${start}${state}${end}`, `${name}${replaceState}`);
            template.component = component;

            interfaces = interfaces.replaceAll(`${start}${props}${end}`, `${name}${replaceProps}`);
            interfaces = interfaces.replaceAll(`${start}${state}${end}`, `${name}${replaceState}`);
            template.interfaces = interfaces;

            index = index.replaceAll(`${start}${componentName}${end}`, name);
            index = index.replaceAll(`${start}${componentName}${end}`, name);
            template.index = index;
        } else if (language === prompts.javascript) {
        }

        return template;
    };

    const createFile = async (path, fileName, content, extension) => {
        await fs.writeFile(`${path}/${fileName}.${extension}`, content, function(err) {
            if (err) {
                logger.error(err);
            }
        });
    };

    async function init(answer) {
        if (!answer.ok) {
            return;
        }

        console.log(answer);

        let { name, path, styles, language } = answer;
        const ext = getExtensionOfFile(language);
        name = getFileName(name);
        path = path + '/' + name;
        await createDir(path);

        const template = getCorrectContent(language, name);
        await createFile(path, name, template.component, `${ext}x`);

        if (styles !== prompts.none) {
            await createFile(path, name, '', `.${styles}`);
        }

        if (language === prompts.typescript) {
            await createFile(path, `I${name}`, template.interfaces, ext);
            await createFile(path, `index`, template.index, ext);
        }
    }

    // logger.error('error');
    // logger.info('info');
})();
