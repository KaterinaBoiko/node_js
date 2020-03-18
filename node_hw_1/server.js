const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    response.writeHead(200, { status: 'ok' });

    const logs = updateLogs(request);
    fs.writeFileSync('requests.json', JSON.stringify(logs), 'utf8');

    response.end('web server works!');
}).listen(8081);

function updateLogs({ method, url }) {
    let logsArray = [];

    if (fs.existsSync('requests.json')) {
        const fileContent = fs.readFileSync('requests.json', 'utf8');
        logsArray = JSON.parse(fileContent).logs;
    }

    logsArray.push({ method, url, time: Date.now() });
    return { "logs": logsArray };
}