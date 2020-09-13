import { expect } from 'chai';
import * as plugin from '../src';

describe('flowed openapi library', () => {
  it('check exported fields', () => {
    const library = plugin;
    expect(Object.keys(library)).to.deep.equal(['resolverLibrary']);
  });
});
