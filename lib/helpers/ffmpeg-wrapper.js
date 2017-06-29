const exec = require('child_process').exec;

export const seconds = 1000;
export const minutes = 60 * seconds;

export const createSilentAudio = (duration, filePath) =>
  `ffmpeg -f lavfi -i aevalsrc=0:0::duration=${duration *
    0.001}:sample_rate=44100 -ab 128k ${filePath} -y`;

export const execute = command =>
  new Promise((y, n) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        n(`exec error: ${error}`);
        return;
      }
      y({ stdout, stderr });
    });
  });

// execute(createSilentAudio(3 * minutes));
