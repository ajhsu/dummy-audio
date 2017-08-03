import path from 'path';
import config from '../config';
import { seconds, minutes } from '../time';
import { execute, createSilentAudio } from '../helpers/ffmpeg-wrapper';

const silentProviderMiddleware = (request, response, next) => {
  const { length = 10 * seconds } = request.query;
  const silentAudio = createSilentAudio({
    duration: length * seconds
  });
  execute(silentAudio.command)
    .then((stdout, stderror) => {
      // 回傳音檔
      response.sendFile(
        silentAudio.fileName,
        {
          root: path.resolve(
            __dirname,
            '../../',
            config.localAudioCacheFolderName
          ),
          dotfiles: 'deny',
          maxAge: 24 * 60 * 60 * 1000,
          headers: {
            'X-Last-Cached': new Date().toString()
          }
        },
        err => {
          if (err) throw new Error(err);
        }
      );
    })
    .catch(err => {
      response.status(500).send('Internal Error');
    });
};

export default silentProviderMiddleware;
