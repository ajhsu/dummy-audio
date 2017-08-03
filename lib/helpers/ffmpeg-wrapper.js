import lodash from 'lodash';
import { exec } from 'child_process';
import config from '../config';
import { seconds, minutes } from '../time';

// 使用 FFMPEG 建立靜音檔
export const createSilentAudio = ({ duration }) => {
  if (
    !lodash.isNumber(duration) ||
    !(duration > 0) ||
    duration > 10 * minutes
  ) {
    throw new Error('invalid duration');
  } else {
    const fileName = `silent-${duration}ms.mp3`;
    return {
      fileName,
      command: `ffmpeg -f lavfi -i aevalsrc=0:0::duration=${duration *
        0.001}:sample_rate=44100 -ab 128k ${config.localAudioCacheFolderName}/${fileName} -y`
    };
  }
};

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
