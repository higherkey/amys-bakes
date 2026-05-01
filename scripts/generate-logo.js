import { readFileSync, writeFileSync } from 'node:fs';
import satori from 'satori';

async function generate() {
  const fontData = readFileSync('assets/PinyonScript-Regular.ttf');
  
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          border: '3px solid #a07b28',
          background: '#1a2540',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '5px',
                left: '5px',
                width: '144px',
                height: '144px',
                borderRadius: '50%',
                border: '1px solid #c9a843',
                opacity: 0.6,
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'baseline',
                marginTop: '10px',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontFamily: 'Pinyon Script',
                      fontSize: '56px',
                      color: '#c9a843',
                      lineHeight: '0.8',
                    },
                    children: 'A',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontFamily: 'Pinyon Script',
                      fontSize: '48px',
                      color: '#c9a843',
                      lineHeight: '0.8',
                    },
                    children: "my's",
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'baseline',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontFamily: 'Pinyon Script',
                      fontSize: '56px',
                      color: '#c9a843',
                      lineHeight: '0.8',
                    },
                    children: 'B',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontFamily: 'Pinyon Script',
                      fontSize: '48px',
                      color: '#c9a843',
                      lineHeight: '0.8',
                    },
                    children: 'akes',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 160,
      height: 160,
      fonts: [
        {
          name: 'Pinyon Script',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  writeFileSync('assets/logo.svg', svg);
  console.log('Logo generated at assets/logo.svg');
}

generate().catch(console.error);
