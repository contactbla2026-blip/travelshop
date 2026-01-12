const net = require('net');

const host = 'db.mlnazbevgyviwzcdqlab.supabase.co';
const ports = [5432, 6543];

console.log(`\n🔍 Diagnosis: Testing network connectivity to Supabase...`);
console.log(`Target Host: ${host}\n`);

async function checkPort(port) {
    return new Promise((resolve) => {
        console.log(`Testing Port ${port}...`);
        const socket = new net.Socket();

        // Timeout after 5 seconds
        socket.setTimeout(5000);

        socket.on('connect', () => {
            console.log(`✅ SUCCESS: Connected to port ${port}`);
            socket.destroy();
            resolve(true);
        });

        socket.on('timeout', () => {
            console.log(`❌ TIMEOUT: Could not reach port ${port} (Firewall/Network Block)`);
            socket.destroy();
            resolve(false);
        });

        socket.on('error', (err) => {
            console.log(`❌ ERROR on port ${port}: ${err.message}`);
            resolve(false);
        });

        socket.connect(port, host);
    });
}

(async () => {
    let success = false;
    for (const port of ports) {
        const result = await checkPort(port);
        if (result) success = true;
    }

    console.log('\n----------------------------------------');
    if (success) {
        console.log('✅ Network seems OK. The issue is likely the password or connection string format.');
    } else {
        console.log('❌ ALL PORTS BLOCKED. This is highly likely a network firewall issue.');
        console.log('👉 Tip: Try connecting via a mobile hotspot or different network.');
    }
    console.log('----------------------------------------\n');
})();
