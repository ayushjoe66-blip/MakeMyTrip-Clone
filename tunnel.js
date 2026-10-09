import localtunnel from 'localtunnel';
import https from 'https';

// Keep event loop active
setInterval(() => {}, 1000 * 60 * 60);

async function startTunnel() {
  https.get('https://loca.lt/mytunnelpassword', (res) => {
    let passwordIp = '';
    res.on('data', chunk => { passwordIp += chunk; });
    res.on('end', async () => {
      try {
        const tunnel = await localtunnel({ 
          port: 3000,
          subdomain: 'makemytrip-showcase'
        });

        console.log('====================================================');
        console.log(`🚀 PUBLIC SHAREABLE LINK: ${tunnel.url}`);
        console.log(`🔑 TUNNEL PASSWORD (if asked on first click): ${passwordIp.trim()}`);
        console.log('====================================================');

        tunnel.on('close', () => {
          console.log('Tunnel closed. Reconnecting in 3s...');
          setTimeout(startTunnel, 3000);
        });

        tunnel.on('error', (err) => {
          console.error('Tunnel error:', err);
          setTimeout(startTunnel, 3000);
        });
      } catch (err) {
        console.error('Failed to establish tunnel:', err);
        setTimeout(startTunnel, 4000);
      }
    });
  }).on('error', () => {
    setTimeout(startTunnel, 4000);
  });
}

startTunnel();
