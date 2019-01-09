const { replaceTags, typescript } = require('../constants');
const { start, end } = replaceTags;
const { componentName, props, state } = typescript;

const component = `import * as React from 'react';

export class ${start}${componentName}${end} extends React.Component<${start}${props}${end}, ${start}${state}${end}> {
    public render(): JSX.Element {
        return null;
    }
}
`;

const interfaces = `export interface I${start}${props}${end} {}

export interface I${start}${state}${end} {}
`;

const index = `export * from './${start}${componentName}${end}';
export * from './I${start}${componentName}${end}';`;

module.exports = {
    component,
    interfaces,
    index,
};
