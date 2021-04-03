import stripJsonTrailingCommas from '~/index';

describe('stripJsonTrailingCommas with stripeWhitespace option', () => {
  it('strip trailing comma after string', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": "1",
      }
    `),
    ).toBe(`
      {
        "a": "1"
      }
    `);
  });

  it('strip trailing comma after number', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": 1,
      }
    `),
    ).toBe(`
      {
        "a": 1
      }
    `);
  });

  it('strip trailing comma after true', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": true,
      }
    `),
    ).toBe(`
      {
        "a": true
      }
    `);
  });

  it('strip trailing comma after false', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": false,
      }
    `),
    ).toBe(`
      {
        "a": false
      }
    `);
  });

  it('strip trailing comma after object', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": {},
      }
    `),
    ).toBe(`
      {
        "a": {}
      }
    `);
  });

  it('strip trailing comma after array', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": [],
      }
    `),
    ).toBe(`
      {
        "a": []
      }
    `);
  });

  it('ignore trailing comma after missing value', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": a,
      }
    `),
    ).toBe(`
      {
        "a": a,
      }
    `);
  });

  it('ignore trailing comma after missing value', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": ,
      }
    `),
    ).toBe(`
      {
        "a": ,
      }
    `);
  });

  it('strip trailing comma at object', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": {
          "b": "1",
          "c": "2",
          "d": true   ,
        },
      }
    `),
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
      stripJsonTrailingCommas(`
      {
        "a": {
          "b": {
            "c": "1",
            "d": false,
            "e": {
              "f": true,
              "g": {
                "h": {
                  false,
                },
              },
            },
            "i": 1,
          }           ,
        },
      }
    `),
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
      stripJsonTrailingCommas(`
      {
        "a": [
          1,
          2,
          3,
        ]      ,
      }
    `),
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
      stripJsonTrailingCommas(`
      {
        "a": [
          [
            [
              [
                1,
                2,
                3  ,
              ],
              1,
              [
                1,
                2,
                3,
                [
                  1,
                  2,
                  3,
                ],
              ]       ,
              2,
              3,
            ],
          ],
          "1",
          "2",
          "3"  ,
        ],
      }
    `),
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
                  2,
                  3
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
      stripJsonTrailingCommas(`
      {
        "a": {
          "b": [
            1,
            2,
            3,
          ],
          "c": {
            "d": {
              "e": {
                "f": [
                ]           ,
              },
            },
          },
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
                  "i": "2"    ,
                },
              ],
              1,
              [
                1,
                {
                  "j": 1,
                },
                3,
                [
                  "1",
                  "2",
                  "3",
                ],
              ]   ,
            ]             ,
          ],
          {
            "k": 1,
          },
        ],
      }
    `),
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
    expect(
      stripJsonTrailingCommas(`
      {},
    `),
    ).toBe(`
      {},
    `);
    expect(
      stripJsonTrailingCommas(`
      {}
            ,
    `),
    ).toBe(`
      {}
            ,
    `);
  });

  it('ignore invalid trailing comma in empty object', () => {
    expect(
      stripJsonTrailingCommas(`
      {,},
      `),
    ).toBe(`
      {,},
      `);
  });

  it('ignore invalid trailing comma in empty object with some spaces', () => {
    expect(
      stripJsonTrailingCommas(`
      {    ,  }
          ,
    `),
    ).toBe(`
      {    ,  }
          ,
    `);
  });

  it('ignore multiple trailing commas in object', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "a": 1,,
      }
    `),
    ).toBe(`
      {
        "a": 1,,
      }
    `);
    expect(
      stripJsonTrailingCommas(`
      {
        "a": 1,     ,  ,
        ,
      }
          ,
    `),
    ).toBe(`
      {
        "a": 1,     ,  ,
        ,
      }
          ,
    `);
  });

  it('ignore invalid trailing comma in empty array', () => {
    expect(
      stripJsonTrailingCommas(`
      [,],
    `),
    ).toBe(`
      [,],
    `);
  });

  it('ignore invalid trailing comma in empty array with some spaces', () => {
    expect(
      stripJsonTrailingCommas(`
      [    ,  ]
          ,
    `),
    ).toBe(`
      [    ,  ]
          ,
    `);
    expect(
      stripJsonTrailingCommas(`
      [  ,  ,  ]
          ,
    `),
    ).toBe(`
      [  ,  ,  ]
          ,
    `);
  });

  it('ignore multiple trailing commas in array', () => {
    expect(
      stripJsonTrailingCommas(`
      [1,,]
    `),
    ).toBe(`
      [1,,]
    `);
    expect(
      stripJsonTrailingCommas(`
      [
        1, ,  ,
        ,
      ]
          ,
    `),
    ).toBe(`
      [
        1, ,  ,
        ,
      ]
          ,
    `);
  });
});
