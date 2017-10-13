/* eslint-env jest, jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import MenuSelect from './MenuSelect';

describe('MenuSelect', () => {
  it('default menu select', () => {
    const tree = renderer
      .create(
        <MenuSelect
          refine={() => {}}
          items={[
            { label: 'white', value: 'white', count: 10, isRefined: false },
            { label: 'black', value: 'black', count: 20, isRefined: false },
            { label: 'blue', value: 'blue', count: 30, isRefined: false },
            { label: 'green', value: 'green', count: 30, isRefined: false },
            { label: 'red', value: 'red', count: 30, isRefined: false },
          ]}
          canRefine={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies translations', () => {
    const tree = renderer
      .create(
        <MenuSelect
          refine={() => {}}
          items={[
            { label: 'white', value: 'white', count: 10, isRefined: false },
            { label: 'black', value: 'black', count: 20, isRefined: false },
            { label: 'blue', value: 'blue', count: 30, isRefined: false },
            { label: 'green', value: 'green', count: 30, isRefined: false },
            { label: 'red', value: 'red', count: 30, isRefined: false },
          ]}
          translations={{
            seeAllOption: 'Everything',
          }}
          canRefine={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('refines its value on change', () => {
    const refine = jest.fn();
    const wrapper = mount(
      <MenuSelect
        refine={refine}
        items={[
          { label: 'white', value: 'white', count: 10, isRefined: false },
          { label: 'black', value: 'black', count: 20, isRefined: false },
          { label: 'blue', value: 'blue', count: 30, isRefined: false },
        ]}
        canRefine={true}
      />
    );

    const items = wrapper.find('.ais-MenuSelect__option');
    expect(items.length).toBe(4); // +1 from "see all option"

    wrapper
      .find('.ais-MenuSelect__select')
      .simulate('change', { target: { value: 'blue' } });

    expect(refine).toHaveBeenCalledTimes(1);
    expect(refine).toHaveBeenCalledWith('blue');

    wrapper.unmount();
  });
});
