module.exports = `import React from 'react';
import { hydrate } from 'react-dom';
import <%= moduleName %> from '<%= modulePath %>';

const container = document.getElementById('page');
const props = JSON.parse(document.getElementById('props').innerHTML);
const element = React.createElement(<%= moduleName %>, props);
hydrate(element, container);`;
