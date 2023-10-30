import { ObjectDiff } from '../../src/utils';

describe('ObjectDiff', () => {
  it('should return an empty object for identical objects', () => {
    const obj1 = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        zip: '10001'
      }
    };

    const obj2 = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        zip: '10001'
      }
    };

    const difference = ObjectDiff(obj1, obj2);
    expect(difference).toEqual({});
  });

  it('should return the differences between two objects', () => {
    const obj1 = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        zip: '10001'
      }
    };

    const obj2 = {
      name: 'John',
      age: 31,
      address: {
        city: 'New York',
        zip: '10002'
      },
      hobbies: ['reading', 'traveling']
    };

    const difference = ObjectDiff(obj1, obj2);
    expect(difference).toEqual({
      age: 31,
      address: {
        zip: '10002'
      },
      hobbies: ['reading', 'traveling']
    });
  });

  it('should handle objects with different structures', () => {
    const obj1 = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        zip: '10001'
      }
    };

    const obj2 = {
      person: {
        name: 'John',
        age: 31
      },
      address: {
        city: 'New York',
        zip: '10002'
      },
      hobbies: ['reading', 'traveling']
    };

    const difference = ObjectDiff(obj1, obj2);
    expect(difference).toEqual({
      person: {
        name: 'John',
        age: 31
      },
      name: 'John',
      age: 30,
      address: {
        zip: '10002'
      },
      hobbies: ['reading', 'traveling']
    });
  });
});
