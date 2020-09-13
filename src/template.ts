import { OpenApi } from './library';

const convertToModelerSpec = (inOutDefs: any, type: string) =>
  Object.entries(inOutDefs).map(([name, def]) => {
    let label = name.replace(/([A-Z])/g, ' $1');
    label = label.charAt(0).toUpperCase() + label.slice(1);

    return {
      label,
      type,
      binding: {
        type: 'property',
        name,
      },
    };
  });

const template = {
  name: OpenApi.name,
  id: `flowed::${OpenApi.name}`,
  appliesTo: ['bpmn:Task'],
  properties: [],
  entriesVisible: {
    _all: true,
  },
  scopes: {
    'flowed:Params': {
      properties: convertToModelerSpec((OpenApi.flowedSpec as any).params, 'Inputs'),
    },
    'flowed:Results': {
      properties: convertToModelerSpec((OpenApi.flowedSpec as any).results, 'Outputs'),
    },
  },
};

const templates = [template];

// tslint:disable-next-line
console.log(JSON.stringify(templates, null, 2));
