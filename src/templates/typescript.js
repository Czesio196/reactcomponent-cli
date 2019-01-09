const { replaceTags, typescript } = require('../constants');
const { start, end } = replaceTags;
const { componentName, props, state } = typescript;

const component = `import * as React from 'react';
import { I${start}${props}${end}, I${start}${state}${end} } from './I${start}${componentName}${end}';

export class ${start}${componentName}${end} extends React.Component<I${start}${props}${end}, I${start}${state}${end}> {
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
