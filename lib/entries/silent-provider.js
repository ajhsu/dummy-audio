import path from 'path';
import config from '../config';
import { execute, seconds, createSilentAudio } from '../helpers/ffmpeg-wrapper';

const silentProviderMiddleware = (request, response, next) => {
  const { length = 10 * seconds } = request.query;

  const fileName = `silent-${length * seconds}ms.mp3`;
  execute(
    createSilentAudio(
      length * seconds,
      `${config.localAudioCacheFolderName}/${fileName}`
    )
  )
    .then((stdout, stderror) => {
      // Response with audio file
      response.sendFile(
        fileName,
        {
          root: path.resolve(
            __dirname,
            '../../',
            config.localAudioCacheFolderName
          ),
          dotfiles: 'deny',
          maxAge: 24 * 60 * 60 * 1000,
          headers: {
            'X-Last-Cached': (new Date()).toString()
          }
        },
        err => {
          if (err) console.error(err);
        }
      );
    })
    .catch(err => {
      response.status(500).json({
        error: err
      });
    });
};

export default silentProviderMiddleware;
