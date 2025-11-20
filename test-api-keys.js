const https = require('https');

const keys = {
  '.env.local': 'AIzaSyDd5ShvwZNldCw0SlNtSMOtAS-Xx_4eLu4',
  '.env': 'AIzaSyDqSwGPb5byiHDH06-g3ftIZnbEHs3ScU8'
};

function testApiKey(keyName, apiKey) {
  return new Promise((resolve) => {
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // Check if the response contains an error
        if (data.includes('RefererNotAllowedMapError') ||
            data.includes('ApiNotActivatedMapError') ||
            data.includes('ApiTargetBlockedMapError')) {
          console.log(`\n❌ ${keyName}: FAILED`);
          console.log(`   Key: ${apiKey}`);
          if (data.includes('RefererNotAllowedMapError')) {
            console.log(`   Error: API key is restricted (referer not allowed)`);
          } else if (data.includes('ApiNotActivatedMapError')) {
            console.log(`   Error: API not activated`);
          } else if (data.includes('ApiTargetBlockedMapError')) {
            console.log(`   Error: API target blocked`);
          }
          resolve(false);
        } else if (res.statusCode === 200 && data.length > 0) {
          console.log(`\n✅ ${keyName}: WORKS`);
          console.log(`   Key: ${apiKey}`);
          resolve(true);
        } else {
          console.log(`\n⚠️  ${keyName}: UNKNOWN (Status: ${res.statusCode})`);
          console.log(`   Key: ${apiKey}`);
          resolve(null);
        }
      });
    }).on('error', (err) => {
      console.log(`\n❌ ${keyName}: ERROR`);
      console.log(`   Key: ${apiKey}`);
      console.log(`   Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function testAllKeys() {
  console.log('Testing Google Maps API Keys...\n');
  console.log('='.repeat(60));

  for (const [keyName, apiKey] of Object.entries(keys)) {
    await testApiKey(keyName, apiKey);
  }

  console.log('\n' + '='.repeat(60));
  console.log('\nNote: Keys may have domain restrictions or IP restrictions.');
  console.log('Check your Google Cloud Console for detailed restrictions.');
}

testAllKeys();
