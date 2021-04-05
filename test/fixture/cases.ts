export default Object.freeze({
  'strip-trailing-comma-after-string': `
{
  "a": "1",
}
`,

  'strip-trailing-comma-after-number': `
{
  "a": 1,
}
`,

  'strip-trailing-comma-after-true': `
{
  "a": true,
}
`,

  'strip-trailing-comma-after-false': `
{
  "a": false,
}
`,

  'strip-trailing-comma-after-null': `
{
  "a": null,
}
`,

  'strip-trailing-comma-after-object': `
{
  "a": {},
}
`,

  'strip-trailing-comma-after-array': `
{
  "a": [],
}
`,

  'ignore-trailing-comma-after-invalid-value': `
{
  "a": a,
}
`,

  'ignore-trailing-comma-after-missing-value': `
{
  "a": ,
}
`,

  'strip-trailing-comma-at-object': `
{
  "a": {
    "b": "1",
    "c": "2",
    "d": true   ,
  },
}
`,

  'strip-trailing-comma-at-nested-objects': `
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
`,

  'strip-trailing-comma-at-array': `
{
  "a": [
    1,
    2,
    3,
  ]      ,
}
`,

  'strip-trailing-comma-at-nested-arrays': `
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
            2   ,
            null   ,
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
`,

  'strip-trailing-comma-in-objects-and-arrays': `
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
`,

  'ignore-invalid-trailing-comma-at-end-of-the-content': [
    `
{},
`,
    `
{}
      ,
`,
  ],

  'ignore-invalid-trailing-comma-in-empty-object': `
{,},
`,

  'ignore-invalid-trailing-comma-in-empty-object-with-some-spaces': `
{    ,  }
    ,
`,

  'ignore-multiple-trailing-commas-in-object': [
    `
{
  "a": 1,,
}
`,
    `
{
  "a": 1,     ,  ,
  ,
}
    ,
`,
  ],

  'ignore-invalid-trailing-comma-in-empty-array': `
[,],
`,

  'ignore-invalid-trailing-comma-in-empty-array-with-some-spaces': [
    `
[    ,  ]
    ,
`,
    `
[  ,  ,  ]
    ,
`,
  ],

  'ignore-multiple-trailing-commas-in-array': [
    `
[1,,]
`,
    `
[
  1, ,  ,
  ,
]
    ,
`,
  ],
});
