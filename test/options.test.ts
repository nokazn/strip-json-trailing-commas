import stripJsonTrailingCommas from '~/index';
import cases from './fixture/cases';

describe('stripJsonTrailingCommas with stripeWhitespace option', () => {
  it('strip trailing comma after string', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-after-string'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": "1"
}
`);
  });

  it('strip trailing comma after number', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-after-number'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": 1
}
`);
  });

  it('strip trailing comma after true', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-after-true'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": true
}
`);
  });

  it('strip trailing comma after false', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-after-false'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": false
}
`);
  });

  it('strip trailing comma after null', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-after-null'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": null
}
`);
  });

  it('strip trailing comma after object', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-after-object'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": {}
}
`);
  });

  it('strip trailing comma after array', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-after-array'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": []
}
`);
  });

  it('ignore trailing comma after invalid value', () => {
    expect(
      stripJsonTrailingCommas(cases['ignore-trailing-comma-after-invalid-value'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": a,
}
`);
  });

  it('ignore trailing comma after missing value', () => {
    expect(
      stripJsonTrailingCommas(cases['ignore-trailing-comma-after-missing-value'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": ,
}
`);
  });

  it('strip trailing comma at object', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-at-object'], { stripeWhitespace: false }),
    ).toBe(`
{
  "a": {
    "b": "1",
    "c": "2",
    "d": true   
  }
}
`);
  });

  it('strip trailing comma at nested objects', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-at-nested-objects'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": {
    "b": {
      "c": "1",
      "d": false,
      "e": {
        "f": true,
        "g": {
          "h": {
            false
          }
        }
      },
      "i": 1
    }           
  }
}
`);
  });

  it('strip trailing comma at array', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-at-array'], { stripeWhitespace: false }),
    ).toBe(`
{
  "a": [
    1,
    2,
    3
  ]      
}
`);
  });

  it('strip trailing comma at nested arrays', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-at-nested-arrays'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": [
    [
      [
        [
          1,
          2,
          3  
        ],
        1,
        [
          1,
          2,
          3,
          [
            1,
            2   ,
            null   
          ]
        ]       ,
        2,
        3
      ]
    ],
    "1",
    "2",
    "3"  
  ]
}
`);
  });

  it('strip trailing comma in objects and arrays', () => {
    expect(
      stripJsonTrailingCommas(cases['strip-trailing-comma-in-objects-and-arrays'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{
  "a": {
    "b": [
      1,
      2,
      3
    ],
    "c": {
      "d": {
        "e": {
          "f": [
          ]           
        }
      }
    }
  },
  "g": [
    [
      [
        [
          1,
          2,
          3,
          {
            "h": "1",
            "i": "2"    
          }
        ],
        1,
        [
          1,
          {
            "j": 1
          },
          3,
          [
            "1",
            "2",
            "3"
          ]
        ]   
      ]             
    ],
    {
      "k": 1
    }
  ]
}
`);
  });

  it('ignore invalid trailing comma at end of the content', () => {
    expect(stripJsonTrailingCommas(cases['ignore-invalid-trailing-comma-at-end-of-the-content'][0]))
      .toBe(`
{},
`);
    expect(stripJsonTrailingCommas(cases['ignore-invalid-trailing-comma-at-end-of-the-content'][1]))
      .toBe(`
{}
      ,
`);
  });

  it('ignore invalid trailing comma in empty object', () => {
    expect(
      stripJsonTrailingCommas(cases['ignore-invalid-trailing-comma-in-empty-object'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
{,},
`);
  });

  it('ignore invalid trailing comma in empty object with some spaces', () => {
    expect(
      stripJsonTrailingCommas(
        cases['ignore-invalid-trailing-comma-in-empty-object-with-some-spaces'],
        { stripeWhitespace: false },
      ),
    ).toBe(`
{    ,  }
    ,
`);
  });

  it('ignore multiple trailing commas in object', () => {
    expect(stripJsonTrailingCommas(cases['ignore-multiple-trailing-commas-in-object'][0])).toBe(`
{
  "a": 1,,
}
`);
    expect(stripJsonTrailingCommas(cases['ignore-multiple-trailing-commas-in-object'][1])).toBe(`
{
  "a": 1,     ,  ,
  ,
}
    ,
`);
  });

  it('ignore invalid trailing comma in empty array', () => {
    expect(
      stripJsonTrailingCommas(cases['ignore-invalid-trailing-comma-in-empty-array'], {
        stripeWhitespace: false,
      }),
    ).toBe(`
[,],
`);
  });

  it('ignore invalid trailing comma in empty array with some spaces', () => {
    expect(
      stripJsonTrailingCommas(
        cases['ignore-invalid-trailing-comma-in-empty-array-with-some-spaces'][0],
        { stripeWhitespace: false },
      ),
    ).toBe(`
[    ,  ]
    ,
`);
    expect(
      stripJsonTrailingCommas(
        cases['ignore-invalid-trailing-comma-in-empty-array-with-some-spaces'][1],
        { stripeWhitespace: false },
      ),
    ).toBe(`
[  ,  ,  ]
    ,
`);
  });

  it('ignore multiple trailing commas in array', () => {
    expect(stripJsonTrailingCommas(cases['ignore-multiple-trailing-commas-in-array'][0])).toBe(`
[1,,]
`);
    expect(stripJsonTrailingCommas(cases['ignore-multiple-trailing-commas-in-array'][1])).toBe(`
[
  1, ,  ,
  ,
]
    ,
`);
  });
});
