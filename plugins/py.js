import _0x5cb03a from 'yt-search';
import fetch from 'node-fetch';

const play = async (_0x1b9510, _0xde7a32) => {
    const _0x2c2c73 = _0x1b9510.body.toLowerCase().split(" ");
    const _0x528617 = _0x2c2c73[0]; // First word of the message
    const _0x5809fc = _0x2c2c73.slice(1).join(" ").trim(); // Rest of the message

    if (_0x528617 !== 'play' && _0x528617 !== 'video') {
        return;
    }

    if (!_0x5809fc) {
        return _0x1b9510.reply("❌ Please provide a search query!");
    }

    await _0x1b9510.React('⏳');
    
    try {
        const _0x589357 = await _0x5cb03a(_0x5809fc);
        if (!_0x589357.videos.length) {
            return _0x1b9510.reply("❌ No results found!");
        }

        const _0x24d96b = _0x589357.videos[0];
        const _0xac0071 = _0x24d96b.url;
        let _0x39489e, _0x566599, _0x1744fd, _0x24d9d1;

        if (_0x528617 === 'play') {
            _0x39489e = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${_0xac0071}`;
            _0x566599 = "audio";
            _0x1744fd = "audio/mpeg";
            _0x24d9d1 = "📥 Downloaded in Audio Format";
        } else if (_0x528617 === 'video') {
            _0x39489e = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${_0xac0071}`;
            _0x566599 = "video";
            _0x1744fd = "video/mp4";
            _0x24d9d1 = "📥 Downloaded in Video Format";
        }

        const _0x15ce39 = await fetch(_0x39489e);
        const _0x3e2e40 = await _0x15ce39.json();

        if (!_0x3e2e40.success) {
            return _0x1b9510.reply("❌ Download failed, please try again.");
        }

        const _0x575e0e = _0x3e2e40.result.download_url;
        const _0x485b96 = {
            [_0x566599]: { url: _0x575e0e },
            mimetype: _0x1744fd,
            caption: _0x24d9d1
        };

        await _0xde7a32.sendMessage(_0x1b9510.from, _0x485b96, { quoted: _0x1b9510 });

    } catch (_0x5db9ce) {
        console.error("Error:", _0x5db9ce);
        return _0x1b9510.reply("❌ An error occurred while processing your request.");
    }
};

export default play;
