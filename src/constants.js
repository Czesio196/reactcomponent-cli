module.exports = {
    prompts: {
        path: './src/components',
        javascript: 'javascript',
        typescript: 'typescript',
        none: 'none',
    },
    replaceTags: { start: '<% ', end: ' %>', props: 'Props', state: 'State' },
    typescript: {
        componentName: 'COMPONENTNAME',
        props: 'COMPONENTNAMEPROPS',
        state: 'COMPONENTNAMESTATE',
    },
};
