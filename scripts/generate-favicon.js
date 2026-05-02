const fs = require('node:fs');
const satori = require('satori').default;

async function generate() {
  const fontData = fs.readFileSync('assets/PinyonScript-Regular.ttf');
  
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '2px solid #a07b28',
          background: '#1a2540',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        children: [
          {
            type: 'span',
            props: {
              style: {
                fontFamily: 'Pinyon Script',
                fontSize: '60px',
                color: '#c9a843',
                lineHeight: '1',
                fontWeight: 900,
                marginLeft: '-10px', // Pull left to center the main body of the 'A'
                marginTop: '2px',
              },
              children: 'A',
            },
          },
        ],
      },
    },
    {
      width: 64,
      height: 64,
      fonts: [
        {
          name: 'Pinyon Script',
          data: fontData,
          weight: 900,
          style: 'normal',
        },
      ],
    }
  );

  fs.writeFileSync('assets/favicon.svg', svg);
  console.log('Favicon generated at assets/favicon.svg');
}

generate().catch(console.error);
