import stripJsonTrailingCommas from '~/index';

describe('stripJsonTrailingCommas with stripeWhitespace option', () => {
  it('strip trailing comma at object', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "object": {
          "a": "1",
          "b": "2",
          "c": true   ,
        },
      }
    `),
    ).toBe(`
      {
        "object": {
          "a": "1",
          "b": "2",
          "c": true
        }
      }
    `);
  });

  it('strip trailing comma at nested objects', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "object": {
          "a": {
            "a": "1",
            "b": false,
            "c": {
              "a": true,
              "b": {
                "a": {
                  false,
                },
              },
            },
            "3": 1,
          }           ,
        },
      }
    `),
    ).toBe(`
      {
        "object": {
          "a": {
            "a": "1",
            "b": false,
            "c": {
              "a": true,
              "b": {
                "a": {
                  false
                }
              }
            },
            "3": 1
          }
        }
      }
    `);
  });

  it('strip trailing comma at array', () => {
    expect(
      stripJsonTrailingCommas(`
      {
        "array": [
          1,
          2,
          3,
        ]      ,
      }
    `),
    ).toBe(`
      {
        "array": [
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
        "array": [
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
        "array": [
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
        "object": {
          "a": [
            1,
            2,
            3,
          ],
          "b": {
            "a": {
              "a": {
                "a": [
                ]           ,
              },
            },
          },
        },
        "array": [
          [
            [
              [
                1,
                2,
                3,
                {
                  "a": "1",
                  "b": "2"    ,
                },
              ],
              1,
              [
                1,
                {
                  "a": 1,
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
            a: 1,
          },
        ],
      }
    `),
    ).toBe(`
      {
        "object": {
          "a": [
            1,
            2,
            3
          ],
          "b": {
            "a": {
              "a": {
                "a": [
                ]
              }
            }
          }
        },
        "array": [
          [
            [
              [
                1,
                2,
                3,
                {
                  "a": "1",
                  "b": "2"
                }
              ],
              1,
              [
                1,
                {
                  "a": 1
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
            a: 1
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
});
