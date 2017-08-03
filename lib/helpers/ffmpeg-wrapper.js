const exec = require('child_process').exec;

export const seconds = 1000;
export const minutes = 60 * seconds;

// 使用 FFMPEG 建立靜音檔
export const createSilentAudio = ({ duration, filePath }) =>
  `ffmpeg -f lavfi -i aevalsrc=0:0::duration=${duration *
    0.001}:sample_rate=44100 -ab 128k ${filePath} -y`;

// 用以執行外部指令
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
